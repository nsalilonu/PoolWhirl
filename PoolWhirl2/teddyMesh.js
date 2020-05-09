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

    let previous;
    let firstBounce = true;

    function bounce(theta, z, minY, timer) {
        let earBounce = Math.sin(timer*50) * 3;
        let bodyBounce = Math.sin(timer*70) * 0.25;
        teddyLeftEarMesh.translateY(earBounce/10);
        teddyRightEarMesh.translateY(earBounce/10);
        teddyBody.translateY(bodyBounce/10);

        // Move the teddy along the cone in correspondance to the cone position.
        let EPS = 20;
        let y = Math.tan(theta) * z;
        teddyMesh.position.setY(y + minY + EPS);
        let buoyancy = Math.sin(timer*25) * 40;
        teddyMesh.translateY(buoyancy/10);

        // Find intersections of tube with cone.

        // let teddyPosition = teddyMesh.localToWorld(teddyMesh.position.clone());
        // // let y = teddyPosition.z * Math.tan(3.27); 
        // let smallHypotenuse = teddyPosition.length();
        // let leg = teddyPosition.z;
        // let y = Math.sqrt(Math.pow(smallHypotenuse, 2) - Math.pow(leg, 2));
        // //let y = Math.sin(3.27) * smallHypotenuse;
        // // Subtract that distance from the y that was calculated earlier (tube sitting on top of the cone)
        // let volume_disp = y - teddyMesh.position.y;
        // let area = Math.PI * Math.pow((10 + 3), 2) - Math.PI * Math.pow((10 - 3), 2); //Torus area = pi*(R+r)^2 - pi*(R-r)^2;
        // volume_disp *= area; // Calculate area and multiply... this is your displaced volume!
        // const GRAVITY = -9.8 * 140; // Taken from Cloth Assignment 
        // const mass = 0.1;
        // // Multiply by density of water and acceleration due to gravity. Should be positive. This is your buoyancy force!
        // let buoyancy = volume_disp * GRAVITY;
        // // Get gravitational force vector and subtract the buoyancy force from it.
        // let gravity = GRAVITY * mass;
        // let force = gravity - buoyancy;
        // const DAMPING = 0.03;
        // const TIMESTEP = 18 / 1000;
            
        // // Do Verlet integration on the bear?
        // if (firstBounce) {previous = teddyMesh.position.clone();}
        // let accelerationTerm = new THREE.Vector3();
        // accelerationTerm.setY(force);
        // accelerationTerm.divideScalar(mass);
        // accelerationTerm.multiplyScalar(Math.pow(TIMESTEP, 2));
        // let newPos = new THREE.Vector3();
        // newPos.subVectors(teddyMesh.position, previous);
        // newPos.multiplyScalar((1-DAMPING));
        // newPos.add(teddyMesh.position);
        // newPos.add(accelerationTerm);
        // previous = teddyMesh.position.clone();
        // Clamp the y value.
        // newPos.y = Math.min(newPos.y, -minY); 
        // newPos.y = Math.max(newPos.y, minY); 

        // teddyMesh.position.set(newPos.x, newPos.y, newPos.z);
        // console.log("Teddy: ", teddyMesh.position);  
        // console.log("Previous: ", previous);
        // console.log(teddyMesh.position);
}

    function stickyTeddy(cone) {
        let vertices = cone.geometry.vertices;
        let minVertex = new THREE.Vector3(600, 600, 600);
        let minLength = minVertex.length();
        // look through all the vertices to find the closest one
        let teddyPosition = teddyMesh.localToWorld(teddyMesh.position.clone());
        for (let i = 0; i < vertices.length; i++) {
            let vertexPosition = cone.localToWorld(vertices[i].clone());
            let currLength = vertexPosition.clone().sub(teddyPosition).length();
            if (currLength <= minLength) {
                minLength = currLength;
                minVertex = vertexPosition;
            }
        }
        //const EPS = 2 - 92 / 2 - 10;
        const EPS = 1;
        let y = minVertex.y;
        teddyMesh.position.setY(y + EPS); 

        
    }

export {teddyMesh, teddyMunch, teddyInit, bounce, stickyTeddy};