window.onload = function() {
const clothSize = 300;
// Camera controls:
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 400);
  camera.position.y = 50;
  camera.position.z =  clothSize/2;

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
  let initParameterizedPosition = plane(clothSize,clothSize);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcce0ff, clothSize, clothSize);
scene.add(camera);

// Background scene:
var sceneColor = new THREE.Color(0xff6666);
scene.background = sceneColor;
let sunGeometry = new THREE.SphereGeometry(20);
let sunMaterial = new THREE.MeshBasicMaterial({color: 0xffa51b});
let sun = new THREE.Mesh(sunGeometry, sunMaterial);

// Water texture:
const material =  new THREE.MeshPhongMaterial({color: 0x44aa88});
material.shininess = 15;


// Meshes:

// Water
 const waterGeometry = new THREE.ParametricGeometry(initParameterizedPosition, clothSize, clothSize);
const water = new waterParticles(clothSize, clothSize);
const waterMaterial = material;
const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
waterMesh.geometry.dynamic = true;
waterMesh.rotation.x = Math.PI;
waterMesh.castShadow = true;

scene.add(waterMesh);

// Lighting:
const color = 0xFFFFFF;
const intensity = 1;
const sunColor = 0xffa51b;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(camera.position.x, camera.position.y, camera.position.z);
const sunLight = new THREE.PointLight(sunColor, 1, 400, 2);
sunLight.position.set(0, 100, -100);
// const sunLightHelper = new THREE.PointLightHelper(sunLight, 20, sunColor);
const ambient = new this.THREE.AmbientLight(color, intensity);
scene.add(light);
scene.add(sunLight);
scene.add(ambient);


// Animation:
var time = 0;

function getRandomParticles(length, particleNum) {
  let randomParticles = [];
  for (i = 0; i < particleNum; i++) {
  let random = Math.round(length * Math.random());
    randomParticles.push(random);
  }
    return randomParticles;
}
let particleNum = 800; // Number of moving particles.
const randomParticles = getRandomParticles(water.particles.length, particleNum);
animate();

function animate(){
  time +=30;
  requestAnimationFrame(animate);
  render();
}

function render() { 
  let timer = time * 0.0002 * 0.8; // Hack given in Cloth Assignment
  let speed = 50; // Speed of the whirlpool.
  waterMesh.rotation.y = timer * speed;

  // Apply all relevant forces to the water's particles
   water.applyWaterForce(randomParticles, timer);

  // For each particle, perform Verlet integration to compute its new position
   water.update();

  // Apply water constraints
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
  }
}




