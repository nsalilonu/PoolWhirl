window.onload = function() {
const clothSize = 300;
// Camera controls:
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.y = 450; //150;
  camera.position.z =  -150; //clothSize/2;
  
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
sun.translateZ(-clothSize/2);
scene.add(sun);


// Clouds:
// Randomly generates clouds sort of?
let boxGeometry = new THREE.BoxGeometry(40, 10, 10);
let boxMaterial = new THREE.MeshBasicMaterial();
let cloudBase = new THREE.Mesh(boxGeometry, boxMaterial);
cloudBase.castShadow = true;
cloudBase.translateY(30);
cloudBase.translateZ(-clothSize/2);
scene.add(cloudBase);

for (let i = 0; i < 5; i++) {
  let box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.translateY(cloudBase.position.y + Math.random() * 10);
  box.translateZ(cloudBase.position.z + Math.random() * 10);
  box.translateX(cloudBase.position.x + Math.random() * 10);
  box.castShadow = true;
  cloudBase.add(box);
}

for (let i = 0; i < 5; i++) {
  let box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.translateY(cloudBase.position.y - Math.random() * 50);
  box.translateZ(cloudBase.position.z - Math.random() * 50);
  box.translateX(cloudBase.position.x - Math.random() * 50);
  box.castShadow = true;
  cloudBase.add(box);
}


// Water texture:
const material =  new THREE.MeshPhongMaterial({color: 0x44aa88});
material.shininess = 15;


// Meshes:

// Water
 const waterGeometry = new THREE.ParametricGeometry(initParameterizedPosition, clothSize, clothSize);
const water = new waterParticles(clothSize, clothSize);
var texture = new THREE.TextureLoader().load( "water.png" ); // Just a water texture I thought was nice, we can change it.
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
material.map = texture;
const waterMaterial = material;
const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
waterMesh.geometry.dynamic = true;
waterMesh.rotation.x = Math.PI;
waterMesh.castShadow = true;

scene.add(waterMesh);

// Lighting:
const color = 0xFFFFFF;
const sunColor = 0xffa51b;
const light = new THREE.DirectionalLight(color, 1);
light.position.set(-clothSize/2, 0, -clothSize/2);
const sunLight = new THREE.PointLight(sunColor, 1, 0, 2);
sunLight.position.set(0, 30, 0);
const light2 = new THREE.DirectionalLight(color, 1);
light2.position.set(clothSize/2, 0, clothSize/2);
const ambient = new this.THREE.AmbientLight(0x404040, 1);
scene.add(light);
scene.add(sunLight);
scene.add(light2);
scene.add(ambient);


// Animation:
var time = 0;

// Get a number random particle coordinates to move to model water noise. 
// Length is the number of values to choose between [0, length]. Will be index of particles list.
// ParticleNum is the number of random numbers you want.
function getRandomParticles(length, particleNum) {
  let randomParticles = [];
  for (i = 0; i < particleNum; i++) {
  let random = Math.round(length * Math.random());
    randomParticles.push(random);
  }
    return randomParticles;
}
let particleNum = 1000; // Number of moving particles.
const randomParticles = getRandomParticles(water.particles.length, particleNum);

animate();


function animate(){
  time +=30;
  requestAnimationFrame(animate);
  render();
}


function render() { 
  let timer = time * 0.0002 * 0.8; // Hack given in Cloth Assignment

  // Move cloud?
  let cloudSpeed = 1;
  cloudBase.translateX(cloudSpeed);
  if (cloudBase.position.x >= 100) {cloudBase.translateX(-100 - Math.random() * 50);}

  // Apply all relevant forces to the water's particles
   water.applyWaterForce(randomParticles, timer);
   water.applyFakeCentripetalForce(timer);

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




