/**
 * Click Spark Animation
 * Creates spark effect on click
 */

class ClickSpark {
    constructor(options = {}) {
        this.sparkColor = options.sparkColor || '#fff';
        this.sparkSize = options.sparkSize || 10;
        this.sparkRadius = options.sparkRadius || 15;
        this.sparkCount = options.sparkCount || 8;
        this.duration = options.duration || 400;
        this.easing = options.easing || 'ease-out';
        this.extraScale = options.extraScale || 1.0;

        this.canvas = null;
        this.ctx = null;
        this.sparks = [];
        this.animationId = null;
        this.resizeObserver = null;
        this.resizeTimeout = null;
    }

    init(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error('Container not found:', containerSelector);
            return;
        }

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'click-spark-canvas';
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            user-select: none;
            z-index: 9999;
        `;

        container.style.position = 'relative';
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        // Setup resize observer
        this.setupResizeObserver(container);

        // Initial resize
        this.resizeCanvas(container);

        // Setup click handler
        container.addEventListener('click', this.handleClick.bind(this));

        // Start animation loop
        this.animate();
    }

    setupResizeObserver(container) {
        this.resizeObserver = new ResizeObserver(() => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resizeCanvas(container);
            }, 100);
        });

        this.resizeObserver.observe(container);
    }

    resizeCanvas(container) {
        const { width, height } = container.getBoundingClientRect();
        if (this.canvas.width !== width || this.canvas.height !== height) {
            this.canvas.width = width;
            this.canvas.height = height;
        }
    }

    easeFunc(t) {
        switch (this.easing) {
            case 'linear':
                return t;
            case 'ease-in':
                return t * t;
            case 'ease-in-out':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default: // ease-out
                return t * (2 - t);
        }
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const now = performance.now();
        const newSparks = Array.from({ length: this.sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / this.sparkCount,
            startTime: now
        }));

        this.sparks.push(...newSparks);
    }

    animate(timestamp) {
        if (!this.ctx || !this.canvas) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sparks = this.sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= this.duration) {
                return false;
            }

            const progress = elapsed / this.duration;
            const eased = this.easeFunc(progress);

            const distance = eased * this.sparkRadius * this.extraScale;
            const lineLength = this.sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            this.ctx.strokeStyle = this.sparkColor;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();

            return true;
        });

        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }
}

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize click spark on body (global)
    const globalSpark = new ClickSpark({
        sparkColor: '#3b82f6',
        sparkSize: 12,
        sparkRadius: 20,
        sparkCount: 8,
        duration: 500,
        easing: 'ease-out',
        extraScale: 1.2
    });
    globalSpark.init('body');

    // You can also initialize on specific elements
    // Example: Service buttons with different colors
    const serviceButtons = document.querySelectorAll('.service-toggle-btn');
    serviceButtons.forEach((btn, index) => {
        const colors = ['#3b82f6', '#a855f7', '#fbbf24'];
        const spark = new ClickSpark({
            sparkColor: colors[index % colors.length],
            sparkSize: 10,
            sparkRadius: 15,
            sparkCount: 6,
            duration: 400
        });
        // Note: This would create multiple canvases, might want to use global instead
    });
});
