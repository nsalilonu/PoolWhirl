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

// Sun:
let sunGeometry = new THREE.SphereGeometry(20);
let sunMaterial = new THREE.MeshPhongMaterial({color: 0xffa51b});
let sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.translateY(30);
sun.translateZ(clothSize/2);
scene.add(sun);

// Clouds:
let boxGeometry = new THREE.BoxGeometry(40, 10, 10);
let boxMaterial = new THREE.MeshBasicMaterial();
let cloudBase = new THREE.Mesh(boxGeometry, boxMaterial);
cloudBase.translateY(30);
cloudBase.translateZ(clothSize/2 - 30);
scene.add(cloudBase);

for (let i = 0; i < 5; i++) {
  let box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.translateY(cloudBase.position.y + Math.random() * 50);
  box.translateZ(cloudBase.position.z + Math.random() * 50);
  box.translateX(cloudBase.position.x + Math.random() * 50);
  cloudBase.add(box);
}

for (let i = 0; i < 5; i++) {
  let box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.translateY(cloudBase.position.y - Math.random() * 50);
  box.translateZ(cloudBase.position.z - Math.random() * 50);
  box.translateX(cloudBase.position.x - Math.random() * 50);
  cloudBase.add(box);
}


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
const intensity = 0.25;
const sunColor = 0xffa51b;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(camera.position.x, camera.position.y, camera.position.z);
const sunLight = new THREE.PointLight(sunColor, 1, 400, 2);
sunLight.position.set(0, 30, clothSize/2);
const ambient = new this.THREE.AmbientLight(color, 1);
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

  // Move cloud?
  let cloudVector = sun.position.clone().sub(cloudBase.position).normalize();
  let cloudSpeed = 1;
  cloudBase.translateX(cloudSpeed);
  if (cloudBase.position.x >= 100) {cloudBase.translateX(-100 - Math.random() * 50);}

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




