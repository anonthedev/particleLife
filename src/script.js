import {
  boidParticles,
  boidConstraints,
} from "./constraints/boid-constraint.js";
import {
  appliedSimpleNewtonianConstraints,
  simpleNewtonianParticles,
} from "./constraints/simple-newtonian-constraint.js";
//import your constraint's applied function and particles.

const constraints = [
  {
    name: "Simple Newtonian Constraint",
    func: appliedSimpleNewtonianConstraints,
    particles: simpleNewtonianParticles,
  },
  {
    name: "Boids",
    func: boidConstraints,
    particles: boidParticles,
  },
]; //add your constraint to this array in the same format as the "Simple Newtonian Constraint" is added. Don't change anything else in script.js if you're adding new constraints.

let selectedConstraint = constraints[0]

const constraintSelectorEl = document.getElementById("list-of-sims");
const canvas = document.getElementById("canvas");
const fpsEl = document.getElementById("fps");
const ctx = canvas.getContext("2d");

constraints.forEach((constraint, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.text = constraint.name;
  constraintSelectorEl.add(option);
});

constraintSelectorEl.addEventListener("change", (e)=>{
  selectedConstraint = constraints[constraintSelectorEl.value]
})

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
  selectedConstraint.func()
  ctx.clearRect(0, 0, 500, 500);
  draw(0, 0, "black", 500);
  for (let i = 0; i < selectedConstraint.particles.length; i++) {
    draw(
      selectedConstraint.particles[i].x,
      selectedConstraint.particles[i].y,
      selectedConstraint.particles[i].color,
      5
    );
  }
    requestAnimationFrame(update);
}

update()