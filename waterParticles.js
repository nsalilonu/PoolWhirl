function Constraint(p1, p2, distance) {
    this.p1 = p1; // Particle 1
    this.p2 = p2; // Particle 2
    this.distance = distance; // Desired distance
  }
  
  Constraint.prototype.enforce = function() {
    // ----------- STUDENT CODE BEGIN ------------
    // Enforce this constraint by applying a correction to the two particles'
    // positions based on their current distance relative to their desired rest
    // distance.
    // ----------- Our reference solution uses 10 lines of code.
    let v_ab = new THREE.Vector3();
    v_ab.subVectors(this.p2.position, this.p1.position); // A vector that points from p1 to p2.
    let dist_ab = this.p1.position.distanceTo(this.p2.position);
    let v_corr_scalar = (dist_ab - this.distance) / dist_ab;
    let v_corr = new THREE.Vector3();
    v_corr.copy(v_ab);
    v_corr.multiplyScalar(v_corr_scalar);
    v_corr.divideScalar(2); // Divide by 2 so that correction can be distributed equally.
    this.p1.position.add(v_corr);
    this.p2.position.sub(v_corr);
    // ----------- STUDENT CODE END ------------
  };

  // Internal helper function for computing the 2D index from particles list
  // 1D index.
    function indexReverse(i, w) {
      const xy = [];
      xy.push (i % (w + 1));
      xy.push (Math.floor(i / (w + 1)));
      return xy;
  }
  function indexParticles(u, v, w) {
    return u + v * (w + 1);
  }


// Initialize a list of water particles with constraints like that of a cloth.
function waterParticles(w, h) {
    // Internal helper function for computing 1D index into particles list
    // from a particle's 2D index
    function index(u, v) {
      return u + v * (w + 1);
    }
  
  this.w = w;
  this.h = h;
  this.fabricLength = 500;
  this.mass = 0.1;

    // Resting distances
    this.restDistance = this.fabricLength/ this.w; // for adjacent particles
    this.restDistanceB = 2; // multiplier for 2-away particles
    this.restDistanceS = Math.sqrt(2);
  
    // Empty initial lists
    let particles = [];
    let constraints = [];
  
    // Create particles
    for (let v = 0; v <= h; v++) {
      for (let u = 0; u <= w; u++) {
        particles.push(new Particle(u / w, v / h, 0, this.mass));
      }
    }

    // Edge constraints 
    for (let v = 0; v <= h; v++) {
      for (let u = 0; u <= w; u++) {
        if (v < h && (u == 0 || u == w)) {
          constraints.push(
            new Constraint(particles[index(u, v)], particles[index(u, v + 1)], this.restDistance)
          );
        }
  
        if (u < w && (v == 0 || v == h)) {
          constraints.push(
            new Constraint(particles[index(u, v)], particles[index(u + 1, v)], this.restDistance)
          );
        }
      }
    }
  
    // Structural constraints
      for (let v = 1; v < h; v++) {
        for (let u = 1; u < w; u++) {
          // Structural constraints for a particle to the right.
          constraints.push(
            new Constraint(particles[index(u,v)], particles[index(u + 1,v)], this.restDistance)
          );
          // Structural constraints for a particle below.
          constraints.push(
            new Constraint(particles[index(u,v)], particles[index(u,v + 1)], this.restDistance)
          );      
        }
      }    
  
    // Shear constraints
      for (let v = 0; v < h; v++) {
        for (let u = 0; u <= w; u++) {
          // Structural constraints for shear diagonal right.
          if (u > 0 && u < w) {
            constraints.push(
              new Constraint(particles[index(u,v)], particles[index(u + 1,v + 1)], this.restDistance * this.restDistanceS)
            );  
            // Structural constraints for shear diagonal left.
            constraints.push(
              new Constraint(particles[index(u,v)], particles[index(u - 1,v + 1)], this.restDistance * this.restDistanceS)
            );
          }
          // Edge cases.
          if (u == 0) {
            constraints.push(
              new Constraint(particles[index(u,v)], particles[index(u + 1,v + 1)], this.restDistance * this.restDistanceS)
            );
          }
          if (u == w) {
            constraints.push(
              new Constraint(particles[index(u,v)], particles[index(u - 1,v + 1)], this.restDistance * this.restDistanceS)
            );
          } 
        }
      }
  
    // Bending constraints
      for (let v = 0; v <= h; v++) {
        for (let u = 0; u <= w; u++) {
          if ((u == w || u == w - 1) && v < h - 1) {
             // Bending constraints for a particle below.
            constraints.push(
              new Constraint(particles[index(u,v)], particles[index(u,v + 2)], this.restDistance * this.restDistanceB)
            );
          }
          else if ((v == h || v == h - 1) && u < w - 1) {
            // Bending constraints for a particle to the right.
            constraints.push(
              new Constraint(particles[index(u,v)], particles[index(u + 2,v)], this.restDistance * this.restDistanceB)
            );
          }
          else if (v >= h - 1 && u >= w - 1) { continue; }
  
          else {
            // Bending constraints for a particle to the right.
            constraints.push(
              new Constraint(particles[index(u,v)], particles[index(u + 2,v)], this.restDistance * this.restDistanceB)
            );
            // Bending constraints for a particle below.
            constraints.push(
              new Constraint(particles[index(u,v)], particles[index(u,v + 2)], this.restDistance * this.restDistanceB)
            );  
          }    
        }
      }

      
    // Constrain the corners of the water
    particles[index(0, 0)].lockToOriginal();
    particles[index(w, 0)].lockToOriginal();
    particles[index(0, h)].lockToOriginal();
    particles[index(w, h)].lockToOriginal();
  
    // Store the particles and constraints lists into the waterParticles object
    this.particles = particles;
    this.constraints = constraints;

}

// Helper function for applyWaterForce. Will move a given number of particles surrounding the given particle together.
function moveParticles (particles, i, offset, yVal, w, h) {
let particle_xy = indexReverse(i, w); // Find x and y coordinate for this particle in the list of particles.
let pos_x = particle_xy[0];
let pos_y = particle_xy[1];

// Get bounding box for the pixels.
let minx = Math.max(pos_x - offset, 0);
let miny = Math.max(pos_y - offset, 0);
let maxx = Math.min(pos_x + offset, w);
let maxy = Math.min(pos_y + offset, h);

// Move the bounding box by the given y value.
for (let x = minx; x <= maxx; x++) {
  for (let y = miny; y <= maxy; y++) {
    particles[indexParticles(x, y, w)].position.setY(yVal);
  }
}
}

// Helper to Move Water:
// Find a certain number of random particles.
function findRandomParticles (length, number) {
  let randomNumbers = [];
  for (i = 0; i < number; i++) {
  let random = Math.round(length * Math.random());
  randomNumbers.push(random);
  }

  return randomNumbers;
}


// Applies an impulse force in the y direction to a given number of particles evenly distributed throughout the mesh.
waterParticles.prototype.applyWaterForce = function(time) {
time *= 0.001; // Converts time to seconds
let particles = this.particles;
let speed = 0.5; // Will go through a full oscillation every two seconds.
let offset = 3; // Will move offset number of particles together, where offset is the radius of the box.

let alpha = Math.sin (Math.PI * (time % speed)/2);
let scale = 7;

// Interpolate between the max force and the min force over time.
let y = alpha * scale + (1-alpha) * -scale;

const choppiness = 10;
const randomNumbers = findRandomParticles(particles.length, choppiness);

// Move them and some of the particles surrounding them.
for (let i = 0; i < randomNumbers.length; i++) {
    moveParticles(particles, randomNumbers[i], offset, y, this.w, this.h);
}

};

// Apply a uniform force due to gravity to all particles in the cloth
waterParticles.prototype.applyGravity = function() {
    let particles = this.particles;
    const GRAVITY = 9.8 * 140;
    // ----------- STUDENT CODE BEGIN ------------
    // For each particle in the cloth, apply force due to gravity.
    // ----------- Our reference solution uses 4 lines of code.
    for (let i = 0; i < particles.length; i++) {
      let offsetY = particles[i].mass * GRAVITY;
      let force = new THREE.Vector3();
      force.setY(offsetY);
      particles[i].addForce(force);
    }
    // ----------- STUDENT CODE END ------------
  };

  // Don't let the particle fall out of the window. Floor is the -scale - 3 of the water force (because EPS is 3).
waterParticles.prototype.handleCollisions = function() {
let particles = this.particles;
let floorPosition = (0,-8,0);
let ceilingPosition = (0,8,0);
for (let i = 0; i < particles.length; i++) {
    particles[i].handleFloorCollision(floorPosition);
    particles[i].handleCeilingCollision(ceilingPosition);
}
};

// waterParticles.prototype.applyForces = function() {
//     let choppiness = 20;
//     // this.applyGravity();
//     this.applyWaterForce(choppiness);
// }

waterParticles.prototype.enforceConstraints = function() {
    let constraints = this.constraints;
    // ----------- STUDENT CODE BEGIN ------------
    // Enforce all constraints in the cloth.
    // ----------- Our reference solution uses 3 lines of code.
    for (let i = 0; i < constraints.length; i++) {
      constraints[i].enforce();
    }

    
    // ----------- STUDENT CODE END ------------
  };

// Update position of particles.
waterParticles.prototype.update = function() {
    const TIMESTEP = 18/1000;
    let particles = this.particles;

    for (let i = 0; i < particles.length; i++) {
      particles[i].integrate(TIMESTEP);
    }
};