class ScratchCard {
  constructor(canvas, scratchImageSrc, noScratchImgSrc, brushImageSrc, succCallback, scratchable, unscratchCallback) {
        this.scratchImageSrc = scratchImageSrc;
        this.noScratchImgSrc = noScratchImgSrc;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.succCallback = succCallback;
        this.brush = new Image();
        this.brush.src = 'data:image/png;base64,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';
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
            image.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf8AAACICAMAAADefxJBAAACEFBMVEVHcEz//wCajHyZjX6ZjH2ZjX6fk4WjmYuek4WekoSjmIubj4GZjX+ckYKjmIqil4majn+flIaglYedkYOil4qajoCbkIGckIKhlYibj4CdkoShlomjmIuimIqhmIuqqqqYjX2hloijmYqZjX2imIuYjX6jmIuhk4aim42ZkH+kmY2hkIihmYiek4iZjXyek4LSzsng3tvf3Nre3Nnf3drOysWyqqDy8vLJxL64sKezq6GupprX08/p5+bl4+HNycOpn5OmnI+5sqizrKGflIft7ezp6Ofu7e22rqW1rKPDvbbW08/KxcDb2dXMx8K9t6+4sKjk4uDf3dvp6ObU0czU0MzKxb+so5i/ubHo5+bNyMPV0c25saizqqHIw723r6bZ1tLj4uDDvbfPy8aqoJS2rqTMx8HV0s7QzMfLx8HKxsClm46kmo2zqqC3sKbJxL/X1M/LxsCjmYypn5Tf3NnNyMLZ1tPLxsGtpZq9ta2sopekmYi+uK/g3du1raS6s6qtpJmvppu0rKKuppu+uLDk4+HBurOglYnSzcnAurKso5nHwbuglYizrKKZkIjU0c2il4vDvbWwqJ6ZjYKwp52kmYy/uLGhl4qtpJjCvLWpoJTAurOmnJC5sqmnnZDu7ezEvrelmYyilI2jmIqimYqimYujmYr///+jmIqglYeajH+ajX+hl4iYjX2YjX6Yjn0FM9maAAAAsHRSTlMAAWDI9f//////////////////////////////98xoA6T/smx83uoTJB4tHh4tLS3///////////////////////////////////////////////////////////////////////////////////////////////////8t////////////////////////Hv////8t/////////////////xQk3utsfQGks2DI9vfMaA80QTMAADt7SURBVHgBnJaJcpwwDIa3x1qs2DW2uaFtSu+m7/9+jZx/dpwIm5loTsFIWP6lT5xOp3fvP3w8n8+GYNVZ7EJiXJ9zdr0lTm0R3DhxHUfHn7N2uyZOIFgbXU9iXZ8N7ofEGRnBU0w5U7TlnLU2LWJCMI/Rf3ZXlw2u5zQTwUJ0R4p2K1SdFtEg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";
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
        this.unscratchCallback();
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
            this.succCallback();
            this.reset();
        }
    }
}

export default ScratchCard;
