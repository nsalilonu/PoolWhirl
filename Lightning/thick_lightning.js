window.onload = function () {
    const canvas = document.getElementById('canvas');
    let renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(50, 50, -150);
    camera.lookAt(20, 20, 20);

    // Orbit Controls:
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    let scene = new THREE.Scene();
    scene.add(camera);

    let segmentList = [];

    let startPoint = new THREE.Vector3(10, 25, 30);
    let endPoint = new THREE.Vector3(100, 120, 150);
    let points = [];
    points.push(startPoint);
    points.push(endPoint);
    let geometry = new THREE.Geometry().setFromPoints(points);

    let line = new MeshLine();
    line.setGeometry(geometry);

    let material = new MeshLineMaterial({color: new THREE.Color(0xCCCC00)});

    let segMesh = new THREE.Mesh(line.geometry, material);

    let segmentInfo = [];
    segmentInfo.push(segMesh);
    segmentInfo.push(startPoint);
    segmentInfo.push(endPoint);

    segmentList.push(segmentInfo);

    // the maximum amount to offset a lightning bolt
    let maxOffset = 45;

    const NUM_GENERATIONS = 9;

    let division_count = 0;
    let lengthScale = 0.7;

    // for each generation
    for (let i = 0; i < NUM_GENERATIONS; i++) {
        let array_len = segmentList.length;
        // for each segment that was in segmentList when this generation started
        for (let j = array_len - 1; j >= 0; j--) {
            let segmentInfo = segmentList[j];
            startPoint = segmentInfo[1];
            // this.console.log(startPoint);
            endPoint = segmentInfo[2];
            // this.console.log(endPoint);
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
            let geometry1 = new THREE.Geometry().setFromPoints(points1);

            let line1 = new MeshLine();
            line1.setGeometry(geometry1);
            let segMesh1 = new THREE.Mesh(line1.geometry, material);

            let segmentInfo1 = [];
            segmentInfo1.push(segMesh1);
            segmentInfo1.push(startPoint);
            segmentInfo1.push(midPoint);

            let points2 = [];
            points2.push(midPoint);
            points2.push(endPoint);
            let geometry2 = new THREE.Geometry().setFromPoints(points2);
            let line2 = new MeshLine();
            line2.setGeometry(geometry2);
            let segMesh2 = new THREE.Mesh(line2.geometry, material);

            let segmentInfo2 = [];
            segmentInfo2.push(segMesh2);
            segmentInfo2.push(midPoint);
            segmentInfo2.push(endPoint);

            segmentList.push(segmentInfo1);
            segmentList.push(segmentInfo2);

            // create branches every other division 
            // instead of just adding two segments (one for each side of the split), 
            // you add three. the third continues in the first segment’s direction 
            // (with some randomization thrown in)
            if (division_count % 2 == 0) {
                let direction = new THREE.Vector3();
                direction.subVectors(midPoint, startPoint);
                // generate a random angle between 0 and 2 * pi radians 
                let x_angle = Math.random() * this.Math.PI / 2;
                let y_angle = Math.random() * this.Math.PI / 2;
                let z_angle = Math.random() * this.Math.PI / 2;
                let rotation = new THREE.Euler(x_angle, y_angle, z_angle);
                let rotated_vec = new THREE.Vector3();
                rotated_vec.copy(direction.applyEuler(rotation));
                let splitEnd = new THREE.Vector3();
                splitEnd.copy(rotated_vec.multiplyScalar(lengthScale).add(midPoint));

                let points_div = [];
                points_div.push(midPoint);
                points_div.push(splitEnd);
                let geometry_div = new THREE.Geometry().setFromPoints(points_div);
                let line_div = new MeshLine();
                line_div.setGeometry(geometry_div);
                let segMesh_div = new THREE.Mesh(line_div.geometry, material);

                let segmentInfo_div = [];
                segmentInfo_div.push(segMesh_div);
                segmentInfo_div.push(midPoint);
                segmentInfo_div.push(splitEnd);
                segmentList.push(segmentInfo_div);
            }

            division_count++;
        }
        // each subsequent generation offsets at most half as much as 
        // the previous generation
        maxOffset /= 2;
    }
    // add every line segment in the array to the scene
    for (segment of segmentList) {
        scene.add(segment[0]);
    }

    renderer.render(scene, camera);
}
