//import * as THREE from 'three';
window.onload = function() {
    
    // Camera controls:
    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500);
      camera.position.y = 450; 
      camera.position.z =  -150; 
      
    // Orbit Controls:
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();  
    
    
    const scene = new THREE.Scene();
    scene.add(camera);
    
    // Background scene:
    var sceneColor = new THREE.Color(0xff6666);
    scene.background = sceneColor;

    // Cone:
    let coneGeometry = new THREE.ConeGeometry(10, 4, 50, 10, true);
    coneGeometry.elementsNeedUpdate = true;  
    let coneMaterial = new THREE.MeshPhongMaterial({color:0x00ccff});
    coneMaterial.side = THREE.DoubleSide;
    coneGeometry.scale(10.0, 10.0, 10.0);
    let cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.castShadow = true;
    cone.dynamic = true;
    scene.add(cone);
    cone.rotation.x = - Math.PI / 2;


    // Lighting:
    const color = 0xFFFFFF;
    const sunColor = 0xffa51b;
    const light = new THREE.DirectionalLight(color, 1);
    light.position.set(camera.position.x, camera.position.y, camera.position.z);
    const sunLight = new THREE.PointLight(sunColor, 1, 0, 2);
    sunLight.position.set(0, 30, 0);
    const ambient = new this.THREE.AmbientLight(0x404040, 1);
    scene.add(light);
    scene.add(sunLight);
    scene.add(ambient);
    
    function getRandomRanges() {
        let length = coneGeometry.vertices.length;
        let randomRanges = [];
        let scale = 300;
        for (let i = 0; i < length; i++) {
            randomRanges.push(Math.random() * scale);
        }
        return randomRanges;
    }

    function moveVertices(timer, randomRanges) {
        let length = coneGeometry.vertices.length;
        let vertices = coneGeometry.vertices;
        for (let i = 0; i < length; i++) {
            let scale = Math.sin(timer) * randomRanges[i];
            vertices[i].setY(vertices[i].y + scale);
        }
    }
    
    // Animation:
    var time = 0;
    let randomRanges = getRandomRanges();
    animate();
    

    function animate(){
      time += 30;
      requestAnimationFrame(animate);
      render();
    }
    
    
    function render() { 
      let timer = time * 0.0002 * 0.8; // Hack given in Cloth Assignment
        //cone.rotation.y = timer;
        moveVertices(timer, randomRanges);
    
       // Render! (by golly I hope this works!)
      renderer.render(scene, camera);
      }
    }
    