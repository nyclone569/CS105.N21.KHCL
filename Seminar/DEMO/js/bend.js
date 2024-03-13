import * as THREE from './lib/three.module.js';

import Stats from './lib/stats.module.js'

import { OrbitControls } from './lib/OrbitControls.js'
import { FBXLoader } from './lib/FBXLoader.js';
const clock = new THREE.Clock();
let camera, scene, renderer, stats;
let bendAmount;
let geometry, material, box;
init()
animate()
function init() {

    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(250, 200, 450);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 2000);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = - 100;
    dirLight.shadow.camera.left = - 120;
    dirLight.shadow.camera.right = 120;
    scene.add(dirLight);

    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    // ground
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x222222, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);



    // model
    // Create a box geometry
    geometry = new THREE.BoxGeometry(20, 20, 20, 20, 20, 20);
    console.log(geometry),
        material = new THREE.MeshPhongMaterial({ color: 0x888888 });
    // Create a mesh from the geometry and material
    box = new THREE.Mesh(geometry, material);
    box.position.set(0, 50, 50);
    box.scale.set(5, 5, 5)
    box.rotateY(30.5);
    // Add the mesh to the scene
    scene.add(box);

    let theta = 0;
    let angle = Math.PI / 48;
    const v = box.geometry.attributes.position.array;
    for (let i = 0; i < v.length; i += 3) {
        let x = v[i]
        let y = v[i + 1]
        let z = v[i + 2]
        theta = x * angle
        let sinTheta = Math.sin(theta)
        let cosTheta = Math.cos(theta)
        v[i] = -(z - 1.0 / angle) * sinTheta
        v[i + 1] = y
        v[i + 2] = (z - 1.0 / angle) * cosTheta + 1.0 / angle
    }
    geometry.attributes.position.needsUpdate = true


    let geometry_2 = new THREE.BoxGeometry(100, 100, 100);
    // Create a material
    const material_2 = new THREE.MeshPhongMaterial({ color: 0x888888, side: THREE.DoubleSide });
    // Create a mesh from the geometry and material
    const object_2 = new THREE.Mesh(geometry_2, material_2);
    object_2.position.set(150, 50, 50);
    // Add the mesh to the scene
    scene.add(object_2);



    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);

    // stats
    stats = new Stats();
    container.appendChild(stats.dom);
}






function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//
function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();


    renderer.render(scene, camera);

    stats.update();

}