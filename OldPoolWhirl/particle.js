"use strict";

const clothSize = 300;
function plane(width, height) {
  return function(u, v, vec) {
    let x = u * width - width / 2;
    let y = 0;
    let z = v * height - height / 2;
    vec.set(x, y, z);
  };
}

let initParameterizedPosition = plane(clothSize, clothSize);

// Particle constructor
function Particle(x, y, z, mass) {
  this.position = new THREE.Vector3(); // position
  this.previous = new THREE.Vector3(); // previous
  this.original = new THREE.Vector3(); // original
  initParameterizedPosition(x, y, this.position);
  initParameterizedPosition(x, y, this.previous);
  initParameterizedPosition(x, y, this.original);

  this.netForce = new THREE.Vector3(); // net force acting on particle
  this.mass = mass; // mass of the particle
  this.correction = new THREE.Vector3(); // offset to apply to enforce constraints
}

// Snap a particle back to its original position
Particle.prototype.lockToOriginal = function() {
  this.position.copy(this.original);
  this.previous.copy(this.original);
};

// Snap a particle back to its previous position
Particle.prototype.lock = function() {
  this.position.copy(this.previous);
  this.previous.copy(this.previous);
};

// Add the given force to a particle's total netForce.
// Params:
// * force: THREE.Vector3 - the force to add
Particle.prototype.addForce = function(force) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 1 lines of code.
  this.netForce.add(force);
  // ----------- STUDENT CODE END ------------
};

// Perform Verlet integration on this particle with the provided
// timestep deltaT.
// Params:
// * deltaT: Number - the length of time dt over which to integrate
Particle.prototype.integrate = function(deltaT) {
  const DAMPING = 0.03;

  // ----------- STUDENT CODE BEGIN ------------
  // You need to:
  // (1) Save the old (i.e. current) position into this.previous.
  
  // (2) Compute the new position of this particle using Verlet integration,
  //     and store it into this.position.
 
  // (3) Reset the net force acting on the particle (i.e. make it (0, 0, 0) again).
  // ----------- Our reference solution uses 13 lines of code.
  let accelerationTerm = new THREE.Vector3();
  accelerationTerm.copy(this.netForce);
  accelerationTerm.divideScalar(this.mass);
  accelerationTerm.multiplyScalar(Math.pow(deltaT, 2));
  let newPos = new THREE.Vector3();
  newPos.subVectors(this.position, this.previous);
  newPos.multiplyScalar((1-DAMPING));
  newPos.add(this.position);
  newPos.add(accelerationTerm);
  this.previous = this.position;
  this.position = newPos;
  this.netForce = new THREE.Vector3(0,0,0);
  // ----------- STUDENT CODE END ------------
};

// Handle collisions between this Particle and the provided sphere.
// Note: the fields of sphere are documented for completeness, but you
//       *WILL NOT* need to use all of them.
// Params:
// * sphere: An object representing a sphere in the scene, with properties:
//    - mesh: THREE.Mesh - the physical representation in the scene
//    - geometry: THREE.SphereGeometry - the abstract geometric representation
//    - material: THREE.MeshPhongMaterial - material information for lighting
//    - radius: number - the radius of the sphere
//    - position: THREE.Vector3 - the sphere's position in this frame
//    - prevPosition: THREE.Vector3 - the sphere's position in the previous frame
Particle.prototype.handleSphereCollision = function(sphere) {
  if (sphere.mesh.visible) {
    const friction = SceneParams.friction;
    let spherePosition = sphere.position.clone();
    let prevSpherePosition = sphere.prevPosition.clone();
    let EPS = 5; // empirically determined
    // ----------- STUDENT CODE BEGIN ------------
    // Handle collision of this particle with the sphere.
    // As with the floor, use EPS to prevent clipping.
    let posFriction = new THREE.Vector3();
    let posNoFriction = new THREE.Vector3();
    // ----------- Our reference solution uses 28 lines of code.
    // Check if the particle is within the sphere.
    function insideSphere(position, sphere) {
      let distVector = new THREE.Vector3();
      distVector.subVectors(position, sphere.position);
      let distFromCenter = distVector.length();
      if (distFromCenter > sphere.radius + EPS) { return false; }
      return true;
    }

    if (!insideSphere(this.position, sphere)) { return; }

    // Project particle inside sphere to closest point on sphere's surface
    // as a projection of the vector between the sphere center and particle position.
    let centerToSurface = new THREE.Vector3();
    centerToSurface.subVectors(this.position, spherePosition);
    centerToSurface.normalize();
    centerToSurface.multiplyScalar(sphere.radius + EPS);
    posNoFriction.addVectors(spherePosition, centerToSurface);

    // Check to see if particle was outside the sphere in the last time step.
    // If so, move it by the same motion that the sphere made in the last timestep.
    if (!insideSphere(this.previous, sphere)) {
      posFriction.subVectors(spherePosition, prevSpherePosition);
      posFriction.add(this.previous);
      this.previous = posFriction.clone();
      let newPos = new THREE.Vector3();
      newPos.addScaledVector(posFriction, friction);
      newPos.addScaledVector(posNoFriction, (1-friction));
      this.position = newPos.clone();
    }
    // If not, then project the particle position to the surface of the sphere.
    else {
      this.position = posNoFriction.clone();
    }
    // ----------- STUDENT CODE END ------------
  }
};

// A handler for the custom event listener. Will model the center of the mouse
// as the center of a sphere and move the particle corresponding to this model.
Particle.prototype.handleMousePush = function(radius, center) {
    const friction = SceneParams.friction;
    let spherePosition = center.position.clone();
    let EPS = 5; // empirically determined

    // Handle collision of this particle with the mouse sphere.
    // As with the floor, use EPS to prevent clipping.
    let posFriction = new THREE.Vector3();
    let posNoFriction = new THREE.Vector3();
    // ----------- Our reference solution uses 28 lines of code.
    // Check if the particle is within the sphere.
    function insideSphere(position, spherePosition, radius) {
      let distVector = new THREE.Vector3();
      distVector.subVectors(position, spherePosition);
      let distFromCenter = distVector.length();
      if (distFromCenter > radius + EPS) { return false; }
      return true;
    }

    if (!insideSphere(this.position, spherePosition, radius)) { return; }

    // Project particle inside sphere to closest point on sphere's surface
    // as a projection of the vector between the sphere center and particle position.
    let centerToSurface = new THREE.Vector3();
    centerToSurface.subVectors(this.position, spherePosition);
    centerToSurface.normalize();
    centerToSurface.multiplyScalar(radius + EPS);
    posNoFriction.addVectors(spherePosition, centerToSurface);

    // Position with friction is equal to the previous position of the particle
    // as the sphere isn't moving. Interpolates the new position between posFriction
    // and posNoFriction according to the friction.
    if (!insideSphere(this.previous, spherePosition, radius)) {
      posFriction.add(this.previous);
      let newPos = new THREE.Vector3();
      newPos.addScaledVector(posFriction, friction);
      newPos.addScaledVector(posNoFriction, (1-friction));
      this.position = newPos.clone();
    }
    // If not, then project the particle position to the surface of the sphere.
    else {
      this.position = posNoFriction.clone();
    }
};

// Handle collisions between this Particle and the provided axis-aligned box.
// Note: the fields of box are documented for completeness, but you
//       *WILL NOT* need to use all of them.
// Params:
// * box: An object representing an axis-aligned box in the scene, with properties:
//    - mesh: THREE.Mesh - the physical representation in the scene
//    - geometry: THREE.BoxGeometry - the abstract geometric representation
//    - material: THREE.MeshPhongMaterial - material information for lighting
//    - boundingBox: THREE.Box3 - the bounding box of the box in the scene
Particle.prototype.handleBoxCollision = function(box) {
  if (box.mesh.visible) {
    const friction = SceneParams.friction;
    let boundingBox = box.boundingBox.clone();
    const EPS = 10; // empirically determined
    // ----------- STUDENT CODE BEGIN ------------
    // Handle collision of this particle with the axis-aligned box.
    // As before, use EPS to prevent clipping
    let posFriction = new THREE.Vector3();
    let posNoFriction = new THREE.Vector3();
    // ----------- Our reference solution uses 66 lines of code.

    // Check if the point is within EPS of the box. If not, skip.
    let boundingBoxEPS = boundingBox.clone();
    boundingBoxEPS.expandByScalar(EPS);
    if (!boundingBoxEPS.containsPoint(this.position)) { return; }
    
    // If it is, project the point to the nearest point on the box's surface.
    // Get vectors from plane to position.
    let vectors = [];
    vectors.push(new THREE.Vector3(boundingBoxEPS.min.x - this.position.x, 0, 0));
    vectors.push(new THREE.Vector3(boundingBoxEPS.max.x - this.position.x, 0, 0));
    vectors.push(new THREE.Vector3(0, boundingBoxEPS.min.y - this.position.y, 0));
    vectors.push(new THREE.Vector3(0, boundingBoxEPS.max.y - this.position.y, 0));
    vectors.push(new THREE.Vector3(0, 0, boundingBoxEPS.min.z - this.position.z));
    vectors.push(new THREE.Vector3(0, 0, boundingBoxEPS.max.z - this.position.z));

    // Find the smallest and add it to the position.
    let minDistVector = new THREE.Vector3();
    boundingBoxEPS.getSize(minDistVector);
    for (let i = 0; i < vectors.length; i++) {
      if (minDistVector.length() > vectors[i].length()) {
        minDistVector = vectors[i];
      }
    }
    posNoFriction.addVectors(this.position, minDistVector);

    // If the previous position was not in the box, then move it with the box.
    // Since the box is not moving, the position with friction is the previous position.
    // Further, interpolate between the position with and without friction to calculate the
    // new position of the particle.
    if (!boundingBoxEPS.containsPoint(this.previous)) {
      posFriction = this.previous.clone();
      let newPos = new THREE.Vector3();
      newPos.addScaledVector(posFriction, friction);
      newPos.addScaledVector(posNoFriction, (1-friction));
      this.position = newPos.clone(); 
    }

    // If the previous position was in the box, set the new position to the position without friction.
    this.position = posNoFriction.clone();
    }
    // ----------- STUDENT CODE END ------------
};
