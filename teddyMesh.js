let teddyHeadGeometry = THREE.BoxGeometry(14,12,12);
let teddyMaterial = THREE.MeshPhongMaterial({color: 0xBF8975});
let teddyMesh = new THREE.Mesh(teddyHeadGeometry, teddyMaterial);

export {teddyMesh};