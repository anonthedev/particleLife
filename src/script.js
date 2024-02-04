import {
  appliedConstraints,
  particles,
} from "./constraints/simple-newtonian-constraint.js";

const canvas = document.getElementById("canvas");
const fpsEl = document.getElementById("fps");
const ctx = canvas.getContext("2d");

const times = [];
let fps;

function draw(x, y, color, size) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function update() {
  const now = performance.now();

  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }

  times.push(now);
  fps = times.length;
  fpsEl.textContent = "FPS: " + fps;
  
  appliedConstraints();
  ctx.clearRect(0, 0, 500, 500);
  draw(0, 0, "black", 500);
  for (let i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  requestAnimationFrame(update);
}

update();
