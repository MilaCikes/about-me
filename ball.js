const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

// Handle window resize
window.addEventListener("resize", resizeCanvas);

class Ball {
  constructor() {
    this.radius = 25;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.dx = 6;
    this.dy = 4;
    this.color = "#fff";
  }

  draw() {
    // Outer glow
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * 2
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
    ctx.fill();

    // Main ball
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Inner highlight
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.beginPath();
    ctx.arc(
      this.x - this.radius * 0.3,
      this.y - this.radius * 0.3,
      this.radius * 0.4,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  update() {
    // Update position first
    this.x += this.dx;
    this.y += this.dy;

    // Bounce off walls and correct position
    if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius;
      this.dx = -this.dx;
    }
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.dy = -this.dy;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.dy = -this.dy;
    }
  }
}

const ball = new Ball();

function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw ball
  ball.update();
  ball.draw();

  requestAnimationFrame(animate);
}

// Start animation
animate();
