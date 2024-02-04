const canvas = document.getElementById("canvas");
const fpsEl = document.getElementById("fps");
const ctx = canvas.getContext("2d");

const times = [];
let fps;
let particles = [];

function draw(x, y, color, size) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function particle(x, y, color) {
  return { x: x, y: y, vx: 0, vy: 0, color: color };
}

function random() {
  return Math.random() * 400 + 50;
}

function create(number, color) {
  let group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
}

let red = create(100, "red");
let yellow = create(60, "yellow");
let green = create(70, "green");
let blue = create(100, "cyan");

function constraints(p1, p2, g) {
  for (let i = 0; i < p1.length; i++) {
    let fx = 0;
    let fy = 0;
    let a = p1[i];
    let maxSpeed = 5;

    for (let j = 0; j < p2.length; j++) {
      let b = p2[j];
      let dx = a.x - b.x;
      let dy = a.y - b.y;
      let d = Math.sqrt(dx * dx + dy * dy);

      if (d > 0) {
        let F = (g * 1) / d;
        fx += F * dx;
        fy += F * dy;
      }
    }

    a.vx += (a.vx + fx) * 0.01;
    a.vy += (a.vy + fy) * 0.01;

    a.x += a.vx;
    a.y += a.vy;

    let speed = Math.sqrt(a.vx * a.vx + a.vy * a.vy);

    if (speed > maxSpeed) {
      let ratio = maxSpeed / speed;
      a.vx *= ratio;
      a.vy *= ratio;
    }

    if (a.x <= 0 || a.x >= 500) {
      a.vx *= -1;
      a.x = Math.max(0, Math.min(a.x, 500));
    }

    if (a.y <= 0 || a.y >= 500) {
      a.vy *= -1;
      a.y = Math.max(0, Math.min(a.y, 500));
    }
  }
}

function update() {
  constraints(red, red, -1);
  constraints(yellow, red, -0.3)
  constraints(yellow, green, -0.8)
  constraints(green, green, 1)
  constraints(green, red, 0.08)
  constraints(blue, green, -0.5)
  constraints(red, blue, -0.05)
  constraints(blue, yellow, -0.5)
  constraints(blue, blue, -0.08)

  ctx.clearRect(0, 0, 500, 500);
  draw(0, 0, "black", 500);
  for (let i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  const now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;
  fpsEl.textContent ="FPS: " + fps
  requestAnimationFrame(update);
}

update();
