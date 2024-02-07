export function particle(x, y, color) {
  return { x: x, y: y, vx: 0, vy: 0, color: color };
}

// -1 to 1
export function randomPN() {
  return Math.random() - 0.5;
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

export function createWithVelocity(number, color, particles) {
  let group = [];
  for (let i = 0; i < number; i++) {
    let p = particle(random(), random(), color);
    p.vx = randomPN();
    p.vy = randomPN();
    group.push(p);
    particles.push(group[i]);
  }
  return group;
}