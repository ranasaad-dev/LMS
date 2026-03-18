function canvasController() {
    const canvas = document.getElementById("bubbleCanvas");
    const ctx = canvas.getContext("2d");
  
    // Resize canvas to parent
    function resizeCanvas() {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  
    // Track mouse position
    const mouse = {
      x: null,
      y: null,
      radius: 100 // repulsion distance
    };
  
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
  
    canvas.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });
  
    // Bubble class
    class Bubble {
      constructor() {
        this.radius = Math.random() * 20 + 10; // 10-30px
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.stroke();
      }
  
      update() {
        // Only repel if mouse exists and is close to this bubble
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
  
          if (dist < mouse.radius + this.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius + this.radius - dist) / mouse.radius;
            const maxForce = 3; // prevent runaway
            this.speedX += Math.cos(angle) * Math.min(force, maxForce);
            this.speedY += Math.sin(angle) * Math.min(force, maxForce);
          }
        }
  
        // Move bubble
        this.x += this.speedX;
        this.y += this.speedY;
        const speedThreshold = 0.5; // adjust as needed
        if (Math.abs(this.speedX) > speedThreshold) {
            this.speedX *= 0.90; // gentle slowdown
        }
        if (Math.abs(this.speedY) > speedThreshold) {
            this.speedY *= 0.90;
        }
        // Bounce off edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.speedX *= -1;
          this.x = Math.max(this.radius, Math.min(this.x, canvas.width - this.radius));
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.speedY *= -1;
          this.y = Math.max(this.radius, Math.min(this.y, canvas.height - this.radius));
        }
  
        this.draw();
      }
    }
  
    // Create bubbles
    const bubbles = [];
    const NUM_BUBBLES = 50;
    for (let i = 0; i < NUM_BUBBLES; i++) {
      bubbles.push(new Bubble());
    }
  
    // Animation loop
    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let bubble of bubbles) {
        bubble.update();
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
  
    // Cleanup function for React useEffect
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", () => {});
      canvas.removeEventListener("mouseleave", () => {});
    };
  }
  
  export default canvasController;