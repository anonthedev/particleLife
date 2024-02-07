import { createWithVelocity } from "../utils.js";

export const boidParticles = [];
let boids = createWithVelocity(400, "white", boidParticles);

function normalize(vector) {
  let [x, y] = vector;
  let length = Math.sqrt(x * x + y * y);
  if (length === 0) return [x, y];
  return [x / length, y / length];
} // normalize the vector.

const separation = (i) => {
  let count = 0;
  let x = 0;
  let y = 0;
  for (let j = 0; j < boidParticles.length; j++) {
    if (i !== j) {
      let dx = boidParticles[j].x - boidParticles[i].x;
      let dy = boidParticles[j].y - boidParticles[i].y;
      let d = Math.sqrt(dx * dx + dy * dy);
      if (d < 15) {
        count++;
        x -= dx;
        y -= dy;
      }
    }
  }

  if (count === 0) return [0, 0];
  x /= count;
  y /= count;

  [x, y] = normalize([x, y]);
  x *= 10;
  y *= 10;

  return [x, y];
}; // keep particles from getting too close to each other.
// This makes the particles avoid crashing into each other.

const alignment = (i) => {
  let count = 0;
  let x = 0;
  let y = 0;
  for (let j = 0; j < boidParticles.length; j++) {
    if (i !== j) {
      let dx = boidParticles[j].x - boidParticles[i].x;
      let dy = boidParticles[j].y - boidParticles[i].y;
      let d = Math.sqrt(dx * dx + dy * dy);
      if (d < 25) {
        count++;
        x += boidParticles[j].vx;
        y += boidParticles[j].vy;
      }
    }
  }

  if (count === 0) return [0, 0];
  x /= count;
  y /= count;

  [x, y] = normalize([x, y]);
  x *= 15;
  y *= 15;

  return [x, y];
}; // align the particles using the average velocity of the particles.
// This makes the particles move in the same direction.

const cohesion = (i) => {
  let count = 0;
  let x = 0;
  let y = 0;
  for (let j = 0; j < boidParticles.length; j++) {
    if (i !== j) {
      let dx = boidParticles[j].x - boidParticles[i].x;
      let dy = boidParticles[j].y - boidParticles[i].y;
      let d = Math.sqrt(dx * dx + dy * dy);
      if (d < 30) {
        count++;
        x += boidParticles[j].x;
        y += boidParticles[j].y;
      }
    }
  }

  if (count === 0) return [0, 0];
  x /= count;
  y /= count;

  return [x, y];
}; // return the average position of the particles.

export function boidConstraints() {
  for (let i = 0; i < boidParticles.length; i++) {
    let a = boidParticles[i];
    let maxSpeed = 5;
    let separationVector = separation(i);
    let alignmentVector = alignment(i);

    let cohesionVector = cohesion(i);
    {
      cohesionVector[0] -= a.x;
      cohesionVector[1] -= a.y;
      cohesionVector[0] *= 0.5;
      cohesionVector[1] *= 0.5;
      cohesionVector[0] -= a.vx;
      cohesionVector[1] -= a.vy;
    } // steer towards the average position of the particles.

    // desired velocity
    let dvx = 0;
    let dvy = 0;

    dvx += (separationVector[0] + alignmentVector[0] + cohesionVector[0]) / 3;
    dvy += (separationVector[1] + alignmentVector[1] + cohesionVector[1]) / 3;

    // add random movement
    dvx += Math.random() - 0.5;
    dvy += Math.random() - 0.5;

    [dvx, dvy] = normalize([dvx, dvy]);
    dvx *= 2;
    dvy *= 2;

    // alter the velocity to steer the particles in the desired direction
    a.vx += (dvx - a.vx) * 0.1;
    a.vy += (dvy - a.vy) * 0.1;

    // update the position
    a.x += a.vx;
    a.y += a.vy;

    // keep the particles within the canvas
    if (a.x > 500) {
      a.x = 0;
    } else if (a.x < 0) {
      a.x = 500;
    } else if (a.y > 500) {
      a.y = 0;
    }
    if (a.y < 0) {
      a.y = 500;
    }
  }
}

