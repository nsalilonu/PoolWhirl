let teddyHeadGeometry = new THREE.BoxGeometry(14,12,12);
let teddyMaterial = new THREE.MeshPhongMaterial({color: 0xBF8975});
let teddyMesh = new THREE.Mesh(teddyHeadGeometry, teddyMaterial);
let teddyEyeGeometry = new THREE.BoxGeometry(4,4,1);
let teddyPupilGeometry = new THREE.BoxGeometry(2,2,1)

export {teddyMesh};