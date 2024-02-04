export function particle(x, y, color) {
  return { x: x, y: y, vx: 0, vy: 0, color: color };
}

export function random() {
  return Math.random() * 400 + 50;
}

export function create(number, color, particles) {
  let group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
}