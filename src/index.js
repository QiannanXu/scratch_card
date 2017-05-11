class ScratchCard {
  constructor(canvas, scratchImageSrc, noScratchImgSrc, brushSrc, scratchable, succCallback, unscratchCallback) {
        this.scratchImageSrc = scratchImageSrc;
        this.noScratchImgSrc = noScratchImgSrc;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.succCallback = succCallback;
        this.brush = new Image();
        this.brush.src = brushSrc;
        this.unscratchCallback = unscratchCallback;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.redirectToInviteLink = this.redirectToInviteLink.bind(this);

        this.drawCanvas(scratchable);
    }

    drawCanvas(scratchable) {
        let image = new Image();

        if(scratchable) {
            this.bindScratchEvents();
            image.src= this.scratchImageSrc;
        } else {
            this.bindUnscratchEvents();
            image.src = this.noScratchImgSrc;
        }

        image.onload = () => {
            this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.canvas.width, this.canvas.height);
        };

    }

    bindScratchEvents() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown, false);
        this.canvas.addEventListener('mousemove', this.handleMouseMove, false);
        this.canvas.addEventListener('mouseup', this.handleMouseUp, false);

        this.canvas.addEventListener('touchstart', this.handleMouseDown, false);
        this.canvas.addEventListener('touchmove', this.handleMouseMove, false);
        this.canvas.addEventListener('touchend', this.handleMouseUp, false);
    }

    bindUnscratchEvents() {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown, false);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove, false);

        this.canvas.removeEventListener('touchstart', this.handleMouseDown, false);
        this.canvas.removeEventListener('touchmove', this.handleMouseMove, false);

        this.canvas.addEventListener('mouseup', this.redirectToInviteLink, false);
        this.canvas.addEventListener('touchend', this.redirectToInviteLink, false);
    }

    redirectToInviteLink(e) {
        e.preventDefault();
        e.stopPropagation();
        this.unscratchCallback || this.unscratchCallback();
    }

    reset() {
        this.canvas.width = this.canvas.width;
    }

    handleMouseDown(e) {
        this.isDrawing = true;
        this.lastPoint = this.getMouse(e, this.canvas);
    }

    handleMouseMove(e) {
        if (!this.isDrawing) {
            return;
        }
        e.preventDefault();

        let currentPoint = this.getMouse(e, this.canvas),
            dist = this.distanceBetween(this.lastPoint, currentPoint),
            angle = this.angleBetween(this.lastPoint, currentPoint),
            x, y;

        for (let i = 0; i < dist; i++) {
            x = this.lastPoint.x + (Math.sin(angle) * i) - 25;
            y = this.lastPoint.y + (Math.cos(angle) * i) - 25;
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.drawImage(this.brush, x, y);
        }

        this.lastPoint = currentPoint;
    }

    handleMouseUp() {
        this.isDrawing = false;
        this.handlePercentage(this.getFilledInPixels());
    }

    getMouse(e, canvas) {
        let offsetX = 0, offsetY = 0, mx, my;

        if (canvas.offsetParent !== undefined) {
            do {
                offsetX += canvas.offsetLeft;
                offsetY += canvas.offsetTop;
            } while ((canvas = canvas.offsetParent));
        }

        mx = (e.touches[0].clientX || e.pageX) - offsetX;
        my = (e.touches[0].clientY || e.pageY) - offsetY + document.body.scrollTop;

        return {x: mx, y: my};
    }

    distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }

    getFilledInPixels() {
        let stride = 32,
            pixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
            pdata = pixels.data,
            l = pdata.length,
            total = (l / stride),
            count;

        for (let i = count = 0; i < l; i += stride) {
            if (parseInt(pdata[i]) === 0) {
                count++;
            }
        }

        return Math.round((count / total) * 100);
    }

    handlePercentage(filledInPixels) {
        filledInPixels = filledInPixels || 0;

        if (filledInPixels > 30) {
            this.succCallback || this.succCallback();
            this.reset();
        }
    }
}

export default ScratchCard;
