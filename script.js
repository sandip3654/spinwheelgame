const canvas = document.getElementById("wheelcanvas");
const ctx = canvas.getContext("2d");

let angle = 0;
let spinning = false;

function drawWheel() {
    const segments = 8;
    const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#888", "#000"];
    const radius = canvas.width / 2;
    const step = (2 * Math.PI) / segments;

    for (let i = 0; i < segments; i++) {
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, i * step, (i + 1) * step);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();
    }
}

function spin() {
    if (spinning) return;
    spinning = true;
    let spinAngle = Math.random() * 360 + 720;

    const interval = setInterval(() => {
        angle += 10;
        if (angle >= spinAngle) {
            clearInterval(interval);
            spinning = false;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel();
        ctx.restore();
    }, 30);
}

drawWheel();
