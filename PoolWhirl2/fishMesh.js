
// https://codepen.io/Yakudoo/pen/BNNGBq
// influenced by above

// TO DO: make fish scales; fix the lips and irises  

// A group that will contain each part of the fish
let fish = new THREE.Group();
// each part needs a geometry, a material, and a mesh

// Body 

// code from http://darrendev.blogspot.com/2016/03/gradients-in-threejs.html
function makeGradientCube(c1, c2, w, d, h, opacity){
    if(typeof opacity === 'undefined')opacity = 1.0;
    if(typeof c1 === 'number')c1 = new THREE.Color( c1 );
    if(typeof c2 === 'number')c2 = new THREE.Color( c2 );
    
    var cubeGeometry = new THREE.BoxGeometry(w, h, d);
    
    var cubeMaterial = new THREE.MeshPhongMaterial({
        vertexColors:THREE.VertexColors
        });
    
    if(opacity < 1.0){
        cubeMaterial.opacity = opacity;
        cubeMaterial.transparent = true;
        }
    
    for(var ix=0;ix<12;++ix){
        if(ix==4 || ix==5){ //Top edge, all c2
            cubeGeometry.faces[ix].vertexColors = [c2,c2,c2];
            }
        else if(ix==6 || ix==7){ //Bottom edge, all c1
            cubeGeometry.faces[ix].vertexColors = [c1,c1,c1];
            }
        else if(ix%2 ==0){ //First triangle on each side edge
            cubeGeometry.faces[ix].vertexColors = [c2,c1,c2];
            }
        else{ //Second triangle on each side edge
            cubeGeometry.faces[ix].vertexColors = [c1,c1,c2];
            }
        }
    
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
    }

let bodyFish = makeGradientCube(0xFFFF00, 0xFF0000, 120, 120, 120, 0.98);
console.log(bodyFish);

// Tail
var tailGeom = new THREE.CylinderGeometry(0, 60, 60, 4, false);
var tailMat = new THREE.MeshPhongMaterial({
    color: 0xb19cd9,
    flatShading: true
});

let tailFish = new THREE.Mesh(tailGeom, tailMat);
tailFish.scale.set(.8, 1, .1);
tailFish.position.x = -60;
tailFish.rotation.z = -Math.PI / 2;

// Lips
var lipsGeom = new THREE.BoxGeometry(25, 10, 120);
var lipsMat = new THREE.MeshPhongMaterial({
    color: 0x80f5fe,
    flatShading: true
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
var eyeGeom = new THREE.SphereBufferGeometry(20);
var eyeMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: false
});

let rightEye = new THREE.Mesh(eyeGeom, eyeMat);
rightEye.position.z = -60;
rightEye.position.x = 25;
rightEye.position.y = -10;

var irisGeom = new THREE.SphereGeometry(5);
var irisMat = new THREE.MeshPhongMaterial({
    color: 0x330000,
    flatShading: true,
    depthTest: false,
});


let rightIris = new THREE.Mesh(irisGeom, irisMat);
rightIris.position.z = -55;
rightIris.position.x = 30;
rightIris.position.y = -10;

let leftEye = new THREE.Mesh(eyeGeom, eyeMat);
leftEye.position.z = 60;
leftEye.position.x = 25;
leftEye.position.y = -10;

let leftIris = new THREE.Mesh(irisGeom, irisMat);
leftIris.position.z = 55;
leftIris.position.x = 30;
leftIris.position.y = -10;



var toothGeom = new THREE.BoxGeometry(20, 4, 20);
var toothMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true
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

export { fish };