import { create } from "../utils.js"; //import create function to create particles from utils file.

export let simpleNewtonianParticles = [];

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
} // the constraint.


//making particles.
let red = create(100, "red", simpleNewtonianParticles);
let yellow = create(60, "yellow", simpleNewtonianParticles);
let green = create(70, "green", simpleNewtonianParticles);
let cyan = create(100, "cyan", simpleNewtonianParticles);

export function appliedSimpleNewtonianConstraints() {
  constraints(red, red, -1);
  constraints(yellow, red, -0.3);
  constraints(yellow, green, -0.8);
  constraints(green, green, 1);
  constraints(green, red, 0.08);
  constraints(cyan, green, -0.5);
  constraints(red, cyan, -0.05);
  constraints(cyan, yellow, -0.5);
  constraints(cyan, cyan, -0.08);
} //applying the constraint to the particles
