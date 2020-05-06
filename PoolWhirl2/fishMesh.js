
// https://codepen.io/Yakudoo/pen/BNNGBq
// influenced by above

// A group that will contain each part of the fish
let fish = new THREE.Group();
// each part needs a geometry, a material, and a mesh

// Body 
var bodyGeom = new THREE.BoxGeometry(120, 120, 120);
var bodyMat = new THREE.MeshLambertMaterial({
    color: 0x80f5fe,
    shading: THREE.FlatShading
});
let bodyFish = new THREE.Mesh(bodyGeom, bodyMat);

// Tail
var tailGeom = new THREE.CylinderGeometry(0, 60, 60, 4, false);
var tailMat = new THREE.MeshLambertMaterial({
    color: 0xff00dc,
    shading: THREE.FlatShading
});

let tailFish = new THREE.Mesh(tailGeom, tailMat);
tailFish.scale.set(.8, 1, .1);
tailFish.position.x = -60;
tailFish.rotation.z = -Math.PI / 2;

// Lips
var lipsGeom = new THREE.BoxGeometry(25, 10, 120);
var lipsMat = new THREE.MeshLambertMaterial({
    color: 0x80f5fe,
    shading: THREE.FlatShading
});
let lipsFish = new THREE.Mesh(lipsGeom, lipsMat);
lipsFish.position.x = 65;
lipsFish.position.y = -47;
lipsFish.rotation.z = Math.PI / 2;

// Fins
let topFish = new THREE.Mesh(tailGeom, tailMat);
topFish.scale.set(.8, 1, .1);
topFish.position.x = -20;
topFish.position.y = 60;
topFish.rotation.z = -Math.PI / 2;

let sideRightFish = new THREE.Mesh(tailGeom, tailMat);
sideRightFish.scale.set(.8, 1, .1);
sideRightFish.rotation.x = Math.PI / 2;
sideRightFish.rotation.z = -Math.PI / 2;
sideRightFish.position.x = 0;
sideRightFish.position.y = -50;
sideRightFish.position.z = -60;

let sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
sideLeftFish.scale.set(.8, 1, .1);
sideLeftFish.rotation.x = Math.PI / 2;
sideLeftFish.rotation.z = -Math.PI / 2;
sideLeftFish.position.x = 0;
sideLeftFish.position.y = -50;
sideLeftFish.position.z = 60;

// Eyes
var eyeGeom = new THREE.BoxGeometry(40, 40, 5);
var eyeMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
});

let rightEye = new THREE.Mesh(eyeGeom, eyeMat);
rightEye.position.z = -60;
rightEye.position.x = 25;
rightEye.position.y = -10;

var irisGeom = new THREE.BoxGeometry(10, 10, 3);
var irisMat = new THREE.MeshLambertMaterial({
    color: 0x330000,
    shading: THREE.FlatShading
});

let rightIris = new THREE.Mesh(irisGeom, irisMat);
rightIris.position.z = -65;
rightIris.position.x = 35;
rightIris.position.y = -10;

let leftEye = new THREE.Mesh(eyeGeom, eyeMat);
leftEye.position.z = 60;
leftEye.position.x = 25;
leftEye.position.y = -10;

let leftIris = new THREE.Mesh(irisGeom, irisMat);
leftIris.position.z = 65;
leftIris.position.x = 35;
leftIris.position.y = -10;

var toothGeom = new THREE.BoxGeometry(20, 4, 20);
var toothMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
});

// Teeth
let tooth1 = new THREE.Mesh(toothGeom, toothMat);
tooth1.position.x = 65;
tooth1.position.y = -35;
tooth1.position.z = -50;
tooth1.rotation.z = Math.PI / 2;
tooth1.rotation.x = -Math.PI / 2;

let tooth2 = new THREE.Mesh(toothGeom, toothMat);
tooth2.position.x = 65;
tooth2.position.y = -30;
tooth2.position.z = -25;
tooth2.rotation.z = Math.PI / 2;
tooth2.rotation.x = -Math.PI / 12;

let tooth3 = new THREE.Mesh(toothGeom, toothMat);
tooth3.position.x = 65;
tooth3.position.y = -25;
tooth3.position.z = 0;
tooth3.rotation.z = Math.PI / 2;

let tooth4 = new THREE.Mesh(toothGeom, toothMat);
tooth4.position.x = 65;
tooth4.position.y = -30;
tooth4.position.z = 25;
tooth4.rotation.z = Math.PI / 2;
tooth4.rotation.x = Math.PI / 12;

let tooth5 = new THREE.Mesh(toothGeom, toothMat);
tooth5.position.x = 65;
tooth5.position.y = -35;
tooth5.position.z = 50;
tooth5.rotation.z = Math.PI / 2;
tooth5.rotation.x = Math.PI / 8;


fish.add(bodyFish);
fish.add(tailFish);
fish.add(topFish);
fish.add(sideRightFish);
fish.add(sideLeftFish);
fish.add(rightEye);
fish.add(rightIris);
fish.add(leftEye);
fish.add(leftIris);
fish.add(tooth1);
fish.add(tooth2);
fish.add(tooth3);
fish.add(tooth4);
fish.add(tooth5);
fish.add(lipsFish);

fish.rotation.y = -Math.PI / 4;

export {fish};