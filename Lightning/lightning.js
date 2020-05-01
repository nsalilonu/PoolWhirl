
// Pseudocode source: http://drilian.com/2009/02/25/lightning-bolts/
// Work-in-progress



window.onload = function () {
    const canvas = document.getElementById('canvas');
    let renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 400);
    camera.position.set(0, 0, -2);

    // Orbit Controls:
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update(); 

    let scene = new THREE.Scene();
    scene.add(camera);

    /* var sceneColor = new THREE.Color(0xff6666);
    scene.background = sceneColor; */

    let segmentList = [];

    let startPoint = new THREE.Vector3(-10, 5, 10);
    let endPoint = new THREE.Vector3(0, 20, 20);
    let points = [];
    points.push(startPoint);
    points.push(endPoint);
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    /* let segment = new THREE.Line3(startPoint, endPoint);
    let geometry = segment; */
    let material = new THREE.LineBasicMaterial({
        color: 0xb9b9b9}); 
    let segMesh = new THREE.Line(geometry, material);
    

    segmentList.push(segMesh);

    // the maximum amount to offset a lightning bolt
    let maxOffset = 5;

    const NUM_GENERATIONS = 5;

    // for each generation
    for (let i = 0; i < NUM_GENERATIONS; i++) {
        let array_len = segmentList.length;
        // for each segment that was in segmentList when this generation started
        for (let j = array_len - 1; j >= 0; j--) {
            // remove it 
            segmentList.splice(j, 1);
            let temp = new THREE.Vector3();
            let midPoint = new THREE.Vector3();
            midPoint.copy(temp.addVectors(startPoint, endPoint).divideScalar(2));
            // offset the midpoint by a random amount along the normal
            // midPoint += Perpendicular(Normalize(endPoint-startPoint))*RandomFloat(-offset,offset)

            // compute the unit direction vector of the line segment
            temp.subVectors(endPoint, startPoint).normalize();
            // compute its normal
            let refVector = new THREE.Vector3(1, 0, 0);
            let norm = new THREE.Vector3();
            norm.crossVectors(temp, refVector).normalize();

            // get three random floats between -MAX_OFFSET and MAX_OFFSET 
            // to form the random offset 
            let n1 = (2 * maxOffset) * Math.random() - maxOffset;
            let n2 = (2 * maxOffset) * Math.random() - maxOffset;
            let n3 = (2 * maxOffset) * Math.random() - maxOffset;
            let randOffset = new THREE.Vector3(n1, n2, n3);

            norm.multiply(randOffset);
            midPoint.add(norm);

            // Create two new segments that span from the start point to the end point,
            // but with the new (randomly-offset) midpoint.
            let points1 = [];
            points1.push(startPoint);
            points1.push(midPoint);
            let geometry1 = new THREE.BufferGeometry().setFromPoints(points1);

            let points2 = [];
            points2.push(midPoint);
            points2.push(endPoint);
            let geometry2 = new THREE.BufferGeometry().setFromPoints(points2);

            /* let segment1 = new THREE.Line3(startPoint, midPoint);
            let geometry1 = segment1;
           
            let segment2 = new THREE.Line3(midPoint, endPoint);
            let geometry2 = segment2; */
           
            let segMesh1 = new THREE.Line(geometry1, material);
           
            let segMesh2 = new THREE.Line(geometry2, material);
            segmentList.push(segMesh1);
            segmentList.push(segMesh2);
        }
        // each subsequent generation offsets at most half as much as 
        // the previous generation
        maxOffset /= 2;
    }
    // add every line segment in the array to the scene
    for (segment of segmentList) {
        scene.add(segment);
    }
    
    renderer.render(scene, camera); 
}
