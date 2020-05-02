
window.onload = function () {
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;


    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    let renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let rainGeo = new THREE.Geometry();
    let rainCount = 15000;
    // randomly generate and push vertices onto the geometry 
    for (let i = 0; i < rainCount; i++) {
        let rainDrop = new THREE.Vector3(
            Math.random() * 400 - 200,
            Math.random() * 500 - 250,
            Math.random() * 400 - 200
        );
        rainDrop.velocity = {};
        rainDrop.velocity = 0;
        rainGeo.vertices.push(rainDrop);
    }
    // create the rain material using PointMaterial class
    let rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true
    });
    let rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);

    let cloudParticles = [];
    let loader = new THREE.TextureLoader();
    loader.load("smoke.png", function (texture) {

        let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        let cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for (let p = 0; p < 25; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 500,
                500,
                Math.random() * 800 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 360;
            cloud.material.opacity = 0.6;
            scene.add(cloud);
            cloudParticles.push(cloud);
        }

        let segmentList = [];

        let startPoint = new THREE.Vector3(1, 2, -0.5);
        let endPoint = new THREE.Vector3(20, 20, 60);
        let points = [];
        points.push(startPoint);
        points.push(endPoint);
        let geometry = new THREE.BufferGeometry().setFromPoints(points);

        let material = new THREE.LineBasicMaterial({
            color: 0xCCCC00,
            linewidth: 30,
        });

        let segMesh = new THREE.Line(geometry, material);

        let segmentInfo = [];
        segmentInfo.push(segMesh);
        segmentInfo.push(startPoint);
        segmentInfo.push(endPoint);

        segmentList.push(segmentInfo);

        // the maximum amount to offset a lightning bolt
        let maxOffset = 45;

        const NUM_GENERATIONS = 10;

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
                let geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
                let segMesh1 = new THREE.Line(geometry1, material);

                let segmentInfo1 = [];
                segmentInfo1.push(segMesh1);
                segmentInfo1.push(startPoint);
                segmentInfo1.push(midPoint);

                let points2 = [];
                points2.push(midPoint);
                points2.push(endPoint);
                let geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
                let segMesh2 = new THREE.Line(geometry2, material);

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
                    let geometry_div = new THREE.BufferGeometry().setFromPoints(points_div);
                    let segMesh_div = new THREE.Line(geometry_div, material);

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
        function animate() {
            cloudParticles.forEach(p => {
                p.rotation.z -= 0.002;
            });
            rainGeo.vertices.forEach(p => {
                p.velocity -= 0.1 + Math.random() * 0.1;
                p.y += p.velocity;
                if (p.y < -200) {
                    p.y = 200;
                    p.velocity = 0;
                }
            });
            rainGeo.verticesNeedUpdate = true;
            rain.rotation.y += 0.002;
            let flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
            flash.position.set(200, 300, 100);
            scene.add(flash);
            if (Math.random() > 0.93 || flash.power > 100) {
                if (flash.power < 100)
                    flash.position.set(
                        Math.random() * 400,
                        300 + Math.random() * 200,
                        100
                    );
                flash.power = 50 + Math.random() * 500;
            }
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
    });

}