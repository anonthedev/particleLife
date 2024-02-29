export function particle(x, y, color, vx = 0, vy = 0) {
  return { x: x, y: y, vx: vx, vy: vy, color: color };
}

// Random number from -1 to 1
export function randomPN() {
  return Math.random() - 0.5;
}

export function random() {
  return Math.random() * 400 + 50;
}

export function create(number, color, particles, vx = 0, vy = 0) {
  let group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color, vx, vy));
    particles.push(group[i]);
  }
  return group;
}
export function createParticle(x, y, vx, vy, mass, color) {
  return {
    x: x,          // X coordinate
    y: y,          // Y coordinate
    vx: vx,        // Velocity in the X direction
    vy: vy,        // Velocity in the Y direction
    mass: mass,    // Mass of the particle
    color: color   // Color of the particle
  };
}