export function particle(x, y, vx = 0, vy = 0, mass = 0, color) {
  return { x: x, y: y, vx: vx, vy: vy, mass: mass, color: color };
}

// Random number from -1 to 1
export function randomPN() {
  return Math.random() - 0.5;
}

export function random() {
  return Math.random() * 400 + 50;
}

export function create(number, color, particles, vx = 0, vy = 0, mass=0) {
  let group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), vx, vy, mass, color));
    particles.push(group[i]);
  }
  return group;
}
