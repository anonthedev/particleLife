import { createParticle } from "../utils.js";

export let gravityParticles = [];

// Apply constraints for gravity-like particle movement
export function applyGravityConstraints() {
  const G = 0.1; // Gravitational constant

  for (let i = 0; i < gravityParticles.length; i++) {
    let particle = gravityParticles[i];
    let totalForceX = 0;
    let totalForceY = 0;

    for (let j = 0; j < gravityParticles.length; j++) {
      if (i !== j) {
        const otherParticle = gravityParticles[j];
        const dx = otherParticle.x - particle.x;
        const dy = otherParticle.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;
        const distance = Math.sqrt(distanceSquared);

        const forceMagnitude = (G * particle.mass * otherParticle.mass) / distanceSquared;
        const forceX = forceMagnitude * (dx / distance);
        const forceY = forceMagnitude * (dy / distance);

        totalForceX += forceX;
        totalForceY += forceY;
      }
    }

    // Update velocity
    particle.vx += totalForceX / particle.mass;
    particle.vy += totalForceY / particle.mass;

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Keep particles within canvas bounds
    if (particle.x < 0 || particle.x > 500) {
      particle.vx *= -1;
    }

    if (particle.y < 0 || particle.y > 500) {
      particle.vy *= -1;
    }
  }
}

// Initialize particles with random positions, velocities, and masses
export function initializeGravityParticles(numParticles) {
  for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * 500;
    const y = Math.random() * 500;
    const vx = Math.random() * 2 - 1;
    const vy = Math.random() * 2 - 1;
    const mass = Math.random() * 5 + 1; // Random mass between 1 and 6
    const color = getRandomColor();

    gravityParticles.push(createParticle(x, y, vx, vy, mass, color));
  }
}
initializeGravityParticles(100)
// Function to generate a random color
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
