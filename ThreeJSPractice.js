window.onload = function() {

// Camera controls:
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.y = 450;
  camera.position.z = 1500;
//const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//camera.position.y = 5;
//camera.position.z = 2;

// Orbit Controls:
const controls = new THREE.OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.update();  


// Scene Creation:
function plane(width, height) {
    return function(u, v, vec) {
      let x = u * width - width / 2;
      let y = 0;
      let z = v * height - height / 2;
      vec.set(x, y, z);
    };
  }
  let initParameterizedPosition = plane(500,500);

const scene = new THREE.Scene();

// Water texture:
const material =  new THREE.MeshPhongMaterial({color: 0x44aa88});
material.shininess = 15;


// Meshes:

// Water
 const waterGeometry = new THREE.ParametricGeometry(initParameterizedPosition, 500, 500);
const water = new waterParticles(500, 500);
const waterMaterial = material;
const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
waterMesh.geometry.dynamic = true;
waterMesh.rotation.x = Math.PI;
waterMesh.castShadow = true;

scene.add(waterMesh);
scene.add(camera);

// Lighting:
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 1, 3);
// const light2 = new THREE.DirectionalLight(color, intensity);
// light.position.set(2, 1, 3);
// scene.add(light2);
const ambient = new this.THREE.AmbientLight(color, intensity);
scene.add(light);
scene.add(ambient);


// Animation:
// ----------- STUDENT CODE END ------------
renderer.render(scene, camera);


function render(time) {
    time +=30; 


  // Apply all relevant forces to the water's particles
   water.applyWaterForce(time);

  // For each particle, perform Verlet integration to compute its new position
  water.update();

  // // Handle collisions with other objects in the scene
  // water.handleCollisions();

  // Apply cloth constraints
  water.enforceConstraints();

  // Apply the positions of the water particles to the mesh.
   let p = water.particles;
   for (let i = 0, il = p.length; i < il; i++) {
    waterMesh.geometry.vertices[i].copy(p[i].position);
  }

   // recalculate normals
   waterMesh.geometry.computeFaceNormals();
   waterMesh.geometry.computeVertexNormals();
 
   waterMesh.geometry.normalsNeedUpdate = true;
   waterMesh.geometry.verticesNeedUpdate = true;

   // Render! (by golly I hope this works!)
  renderer.render(scene, camera);
   
  requestAnimationFrame(render);
  }

requestAnimationFrame(render);
}




