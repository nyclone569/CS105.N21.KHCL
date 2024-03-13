function init()
{
var scene= new THREE.Scene();
var gui = new dat.GUI();
var enablefog = false;
if (enablefog){
     scene.fog= new THREE.FogExp2(0xffffff, 0.2)
}
var boxgird = getBoxGrid(5, 1.5);
//var helper = new THREE.CameraHelper(directionLight.shadow.camera);
boxgird.name = 'boxgird-1';
var plane = getPlane(30);
var directionLight = getDirectionalLight(1);
var ambientLight = getAmbientLight(1);
var sphere = getSphere(0.05);
plane.rotation.x= Math.PI/2;
directionLight.position.x = 2;
directionLight.position.y = 4;
directionLight.position.z = 1;
directionLight.intensity = 1.5;
gui.add(directionLight, 'intensity', 0, 10);
gui.add(directionLight.position, 'x', 0, 10);
gui.add(directionLight.position, 'y', 0, 20);
gui.add(directionLight.position, 'z', 0, 20);
//gui.add(spotLight, 'penumbra', 0, 1);
scene.add(boxgird);
scene.add(plane);
scene.add(directionLight);
scene.add(ambientLight);
//scene.add(helper);
directionLight.add(sphere);
var camera= new THREE.PerspectiveCamera(
    45,window.innerWidth/window.innerHeight,1,1000
);
camera.position.z=10;
camera.position.x=1;
camera.position.y=2;
camera.lookAt(new THREE.Vector3(0,0,0));
var renderer= new THREE.WebGLRenderer();
renderer.shadowMap.enable = true;
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor('rgb(120,120,100)');
document.getElementById('webgl').appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
update(renderer, scene, camera, controls);
return scene;
}

function getBOX(w ,h , d)
{
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshPhongMaterial({color: 'rgb(10,255,50)'});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.castShadow = true;
    return mesh;
}
function getPointLight(intensity){
    var light = new THREE.SpotLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
}
function getSpotLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048; 
    light.shadow.mapSize.height = 2048; 
    return light;
}
function getDirectionalLight(intensity){
    var light = new THREE.DirectionalLight(0xffffff, intensity);
    light.castShadow = true;
    light.shadow.camera.left = -5; 
    light.shadow.mapSize.bottom = -5; 
    light.shadow.mapSize.right = 5; 
    light.shadow.mapSize.top = 5; 
    return light;
}
function getAmbientLight(intensity){
    var light = new THREE.AmbientLight('rgb(10,20,30)', intensity);
    return light;
}
function getPlane(size)
{
    var geometry = new THREE.PlaneGeometry(size,size);
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(120,120,120)',
        side: THREE.DoubleSide,
    });
    var mesh = new THREE.Mesh(geometry,material);
    mesh.receiveShadow = true;
    return mesh;
}
function getBoxGrid(amount, separationMultiplier){
    var group = new THREE.Group();
    for(var i=0; i<amount; i++){
        var obj = getBOX(1,1,1);
        obj.position.x = i*separationMultiplier;
        obj.position.y = obj.geometry.parameters.height/2;
        group.add(obj);
        for(var j=1; j<amount; j++){
            var obj = getBOX(1,1,1);
            obj.position.x = i*separationMultiplier;
            obj.position.y = obj.geometry.parameters.height/2;
            obj.position.z = j*separationMultiplier;
            group.add(obj);
        }
    }
    group.position.x = -(separationMultiplier * (amount - 1))/2;
    group.position.z = -(separationMultiplier * (amount - 1))/2;
    return group;
}
function getSphere(size)
{
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    var material = new THREE.MeshBasicMaterial({color: 'rgb(255,255,255)'});
    var mesh = new THREE.Mesh(geometry,material);
    return mesh;
}
function update(renderer, scene, camera, controls){
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    })
}
var scene = init();