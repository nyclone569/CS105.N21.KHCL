let camera, scene, renderer, cube;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	renderer = new THREE.WebGLRenderer({ antialias: true });
	
	renderer.setSize(window.innerWidth, window.innerHeight);

	
	document.body.appendChild(renderer.domElement);

	const geometry = new THREE.BoxGeometry(1, 1, 1);

	const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

	
	cube = new THREE.Mesh(geometry, material);
	

	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3(1,1,1));
	
	var plane = getplane(10);
	scene.add(plane);
	plane.rotation.x = Math.PI/2;
	cube.position.y = 0.5;
	
	plane.name = 'plane_1';

	//plane.add(cube);
	scene.add(cube);

	scene.fog = new THREE.FogExp2(0xffffff,0.2);
	renderer.setClearColor(0xffffff);

	return scene;
}
function animate() {

	// var plane = scene.getObjectByName('plane_1');
	// plane.rotation.y += 0.001;
	// plane.rotation.z += 0.001;

	// scene.traverse(function(child) {
	// 	child.scale.x += 0.001;
	// })

	requestAnimationFrame(animate);
	cube.rotation.x += 0.00;
	cube.rotation.y += 0.00;
	renderer.render(scene, camera);
}

function onWindowResize() {	
	camera.aspect = window.innerWidth / window.innerHeight;	
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

var scenea = init();
animate();


function getplane(size){
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	return mesh
}