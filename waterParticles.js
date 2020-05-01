function Constraint(p1, p2, distance) {
    this.p1 = p1; // Particle 1
    this.p2 = p2; // Particle 2
    this.distance = distance; // Desired distance
  }
  
  Constraint.prototype.enforce = function() {
    // Enforce this constraint by applying a correction to the two particles'
    // positions based on their current distance relative to their desired rest
    // distance.
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
  // this.cone = cone;
  this.w = w;
  this.h = h;
  this.fabricLength = this.w;
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
  
    // Store the particles and constraints lists into the waterParticles object
    this.particles = particles;
    this.constraints = constraints;

}


// Applies an impulse force in the y direction to the given random water particles.
waterParticles.prototype.applyWaterForce = function(randomParticles, timer) {
  let particles = this.particles;
  let scale = 2; // "Experimentally" determined to be the best scale for water motion.

  for (let i = 0; i < randomParticles.length; i++) {
    let force = scale * Math.sin(timer * 100);
   particles[randomParticles[i]].position.setY(force);
  }
};


waterParticles.prototype.applyFakeCentripetalForce = function(timer) {
  let particles = this.particles;
  for (let i = 0; i < particles.length; i++) {
    let radius = particles[i].position.length(); // Distance of particle from the center.
    radius = Math.max(radius, 0.5); // Don't let the radius go to 0 to avoid infinite time.
    let x = particles[i].position.x * Math.cos(timer/radius) - particles[i].position.z * Math.sin(timer/radius);
    let z = particles[i].position.x * Math.sin(timer/radius) + particles[i].position.z * Math.cos(timer/radius);
    particles[i].addForce(new THREE.Vector3(x - particles[i].position.x, 0, 0));
    particles[i].addForce(new THREE.Vector3(0, 0, z - particles[i].position.z));
  }
}



waterParticles.prototype.enforceConstraints = function() {
    let constraints = this.constraints;
    for (let i = 0; i < constraints.length; i++) {
      constraints[i].enforce();
    }
  };

// Update position of particles.
waterParticles.prototype.update = function() {
    const TIMESTEP = 18/1000;
    let particles = this.particles;

    for (let i = 0; i < particles.length; i++) {
      particles[i].integrate(TIMESTEP);
    }
};