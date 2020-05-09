let duckHeadGeometry = new THREE.BoxGeometry(14, 12, 12);

// duck material which is set to a golden yellow
let duckMaterial = new THREE.MeshPhongMaterial({color: 0xFFC300})
duckMaterial.side = THREE.DoubleSide;

// stores the entirety of the duck
let duckMesh = new THREE.Mesh(duckHeadGeometry, duckMaterial);

// make the right eye
let duckEye = new THREE.BoxGeometry(2.5, 2.5, 1);
let eyeMaterial = new THREE.MeshPhongMaterial({color: 0x080200});
let rightEye = new THREE.Mesh(duckEye, eyeMaterial);
rightEye.translateX(-4);
rightEye.translateY(2);
rightEye.translateZ(-6);
duckMesh.add(rightEye);

// make the left eye
let leftEye = rightEye.clone();
leftEye.translateX(8);
duckMesh.add(leftEye);

// create the duck's bill
let billGeometry = new THREE.BoxGeometry(10, 2, 5);
let billMaterial = new THREE.MeshPhongMaterial({color: 0xFF7919});
billMaterial.side = THREE.DoubleSide;
let bill = new THREE.Mesh(billGeometry, billMaterial);
bill.translateY(-2);
bill.translateZ(-8);
duckMesh.add(bill);

// create the duck's body
let bodyGeometry = new THREE.BoxGeometry(10, 12, 18);
let body = new THREE.Mesh(bodyGeometry, duckMaterial);
body.translateY(-12);
body.translateZ(10);
duckMesh.add(body);

// add a tail
let tailGeometry = new THREE.BoxGeometry(2, 2, 2);
let tail = new THREE.Mesh(tailGeometry, duckMaterial);
tail.translateZ(18);
tail.translateY(-5);
duckMesh.add(tail);

// create the wings
let wingGeometry = new THREE.BoxGeometry(2, 9, 8);
let rightWing = new THREE.Mesh(wingGeometry, duckMaterial);
rightWing.translateY(-10);
rightWing.translateX(7);
rightWing.translateZ(14);
duckMesh.add(rightWing);

let leftWing = rightWing.clone();
leftWing.translateX(-14);
duckMesh.add(leftWing);

export {duckMesh};