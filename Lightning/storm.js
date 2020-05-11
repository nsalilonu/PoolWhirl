
// storm clouds and rain. sources:
// https://redstapler.co/cool-nebula-background-effect-three-js/
// https://redstapler.co/three-js-realistic-rain-tutorial/
window.onload = function () {
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;


    let ambient = new THREE.AmbientLight(0x878787);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0x171863);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    let renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x03544e, 0.002);
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
        size: 0.4,
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