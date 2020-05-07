let teddyHeadGeometry = new THREE.BoxGeometry(14,12,12);
let teddyMaterial = new THREE.MeshPhongMaterial({color: 0xBF8975});

let teddyMesh = new THREE.Mesh(teddyHeadGeometry, teddyMaterial);
let teddyEyeGeometry = new THREE.BoxGeometry(2.5,2.5,1);
let teddyEyeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
let teddyRightEyeMesh = new THREE.Mesh(teddyEyeGeometry, teddyEyeMaterial);
teddyRightEyeMesh.translateX(-4);
teddyRightEyeMesh.translateZ(-6);
teddyMesh.add(teddyRightEyeMesh);

let teddyLeftEyeMesh = teddyRightEyeMesh.clone();
teddyLeftEyeMesh.translateX(8);
teddyMesh.add(teddyLeftEyeMesh);

let teddyRightPupilMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
let teddyRightPupilGeometry = new THREE.BoxGeometry(1.5,1.5, 0.5);
let teddyRightPupil = new THREE.Mesh(teddyRightPupilGeometry, teddyRightPupilMaterial);
// teddyRightPupil.translateX(-4);
 teddyRightPupil.translateZ(-0.5);
teddyRightEyeMesh.add(teddyRightPupil);

let teddyLeftPupil = teddyRightPupil.clone();
// teddyLeftPupil.translateX(8);
teddyLeftEyeMesh.add(teddyLeftPupil);

let teddySnoutGeometry = new THREE.BoxGeometry(6,6,2);
let teddySnoutMaterial = new THREE.MeshPhongMaterial({color: 0xffdfd3});
let teddySnout = new THREE.Mesh(teddySnoutGeometry, teddySnoutMaterial);
teddySnout.translateY(-4);
teddySnout.translateZ(-7);
teddyMesh.add(teddySnout);

let teddyNoseGeometry = new THREE.BoxGeometry(3,3,1);
let teddyNose = new THREE.Mesh(teddyNoseGeometry, teddyRightPupilMaterial);
teddyNose.translateY(1.5);
teddyNose.translateZ(-1.5);
teddySnout.add(teddyNose);

let teddyRightEarGeometry = new THREE.BoxGeometry(4, 4, 1);
let teddyRightEarMesh = new THREE.Mesh(teddyRightEarGeometry, teddyMaterial);
teddyRightEarMesh.translateZ(-5.5);
teddyRightEarMesh.translateY(9);
teddyRightEarMesh.translateX(-8);
teddyMesh.add(teddyRightEarMesh);

let teddyLeftEarMesh = teddyRightEarMesh.clone();
teddyRightEarMesh.translateX(16);
teddyMesh.add(teddyLeftEarMesh);

let teddyLeftEarPatchGeometry = new THREE.BoxGeometry(3, 3, 0.5);
let teddyLeftEarPatch = new THREE.Mesh(teddyLeftEarPatchGeometry, teddySnoutMaterial);
teddyLeftEarPatch.translateZ(-0.75);
teddyLeftEarMesh.add(teddyLeftEarPatch);

let teddyRightEarPatch = new THREE.Mesh(teddyLeftEarPatchGeometry, teddySnoutMaterial);
teddyRightEarPatch.translateZ(-0.75);
teddyRightEarMesh.add(teddyRightEarPatch);

let teddyBodyGeometry = new THREE.BoxGeometry(10, 12, 12);
let teddyBody = new THREE.Mesh(teddyBodyGeometry, teddyMaterial);
teddyBody.translateY(-12.5);
teddyMesh.add(teddyBody);

let teddyBodyPatchGeometry = new THREE.BoxGeometry(7, 9, 0.5);
let teddyBodyPatch = new THREE.Mesh(teddyBodyPatchGeometry, teddySnoutMaterial);
teddyBodyPatch.translateZ(-6.25);
teddyBody.add(teddyBodyPatch);

let teddyRightArmGeometry = new THREE.BoxGeometry(5, 8, 5);
let teddyRightArm = new THREE.Mesh(teddyRightArmGeometry, teddyMaterial);
teddyRightArm.translateX(-10);
teddyRightArm.translateY(2);
teddyRightArm.rotateZ(-Math.PI / 4);
teddyBody.add(teddyRightArm);

let teddyLeftArmGeometry = new THREE.BoxGeometry(5, 8, 5);
let teddyLeftArm = new THREE.Mesh(teddyLeftArmGeometry, teddyMaterial);
teddyLeftArm.translateX(10);
teddyLeftArm.translateY(2);
teddyLeftArm.rotateZ(Math.PI / 4);
teddyBody.add(teddyLeftArm);

let teddyLeftArmPatchGeometry = new THREE.BoxGeometry(3, 3, 0.5);
let teddyLeftArmPatch = new THREE.Mesh(teddyLeftArmPatchGeometry, teddySnoutMaterial);
teddyLeftArmPatch.translateY(-4.25);
teddyLeftArmPatch.rotateX(-Math.PI/2);
teddyLeftArm.add(teddyLeftArmPatch);

let teddyRightArmPatchGeometry = new THREE.BoxGeometry(3, 3, 0.5);
let teddyRightArmPatch = new THREE.Mesh(teddyRightArmPatchGeometry, teddySnoutMaterial);
teddyRightArmPatch.translateY(-4.25);
 teddyRightArmPatch.rotateX(-Math.PI/2);
teddyRightArm.add(teddyRightArmPatch);

let teddyRightLegGeometry = new THREE.BoxGeometry(5, 10, 5);
let teddyRightLeg = new THREE.Mesh(teddyRightLegGeometry, teddyMaterial);
teddyRightLeg.translateX(-9);
teddyRightLeg.translateY(-7.75);
teddyRightLeg.translateZ(-2);
teddyRightLeg.rotateX(Math.PI / 2);
teddyRightLeg.rotateY(Math.PI / 8);
teddyRightLeg.rotateZ(-Math.PI / 8);
teddyBody.add(teddyRightLeg);

let teddyLeftLegGeometry = new THREE.BoxGeometry(5, 10, 5);
let teddyLeftLeg = new THREE.Mesh(teddyLeftLegGeometry, teddyMaterial);
teddyLeftLeg.translateX(9);
teddyLeftLeg.translateY(-7.75);
teddyLeftLeg.translateZ(-2);
teddyLeftLeg.rotateX(Math.PI / 2);
teddyLeftLeg.rotateY(-Math.PI / 8);
teddyLeftLeg.rotateZ(Math.PI / 8);
teddyBody.add(teddyLeftLeg);

let teddyLeftLegPatchGeometry = new THREE.BoxGeometry(3, 3, 0.5);
let teddyLeftLegPatch = new THREE.Mesh(teddyLeftLegPatchGeometry, teddySnoutMaterial);
teddyLeftLegPatch.translateY(-5.25);
teddyLeftLegPatch.rotateX(-Math.PI/2);
teddyLeftLeg.add(teddyLeftLegPatch);

let teddyRightLegPatchGeometry = new THREE.BoxGeometry(3, 3, 0.5);
let teddyRightLegPatch = new THREE.Mesh(teddyRightLegPatchGeometry, teddySnoutMaterial);
teddyRightLegPatch.translateY(-5.25);
 teddyRightLegPatch.rotateX(-Math.PI/2);
teddyRightLeg.add(teddyRightLegPatch);

let teddyTailGeometry = new THREE.BoxGeometry(3, 3, 3);
let teddyTail = new THREE.Mesh(teddyTailGeometry, teddyMaterial);
teddyTail.translateY(-4.5);
teddyTail.translateZ(8);
teddyBody.add(teddyTail);

var timer = 0;
function teddyInit() {
    timer = 0;
}

function teddyMunch() {
    timer+= Math.PI/4 /10;
    console.log(timer);
        if (timer > 0 && timer <= Math.PI/4) {
            teddyRightArm.rotateX(Math.PI/4 / 5);
            return true;
        }
        else if (timer > 0 && timer > Math.PI/4 && timer < Math.PI/2) {
            teddyRightArm.rotateX(-Math.PI/4 / 5);
            return true;
        }
        else {        
            return false;
        }
}

function bounce(theta, z, minY, timer) {
let earBounce = Math.sin(timer*50) * 3;
let bodyBounce = Math.sin(timer*70) * 0.25;
teddyLeftEarMesh.translateY(earBounce/10);
teddyRightEarMesh.translateY(earBounce/10);
teddyBody.translateY(bodyBounce/10);

// Move the teddy along the cone in correspondance to the cone position.
let EPS = 35;
let y = z * Math.tan(theta);
teddyMesh.position.setY(y + minY + EPS);
let buoyancy = Math.sin(timer*25) * 20;
teddyMesh.translateY(buoyancy/10);
}

export {teddyMesh, teddyMunch, teddyInit, bounce};