import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const clock = new THREE.Clock();
var delta = 0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
camera.position.set(1,3,0)

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// const light = new THREE.AmbientLight({color: 0xffffff});
// scene.add(light);
const spotLight = new THREE.SpotLight(0x99ffff);
spotLight.position.set(1, 2, 3);
spotLight.intensity = 50;
spotLight.castShadow = true;
scene.add(spotLight);

const lampLight = new THREE.PointLight(0xff0000);
lampLight.position.set(-2,2,-2);
lampLight.castShadow = true;
lampLight.intensity = 10;
scene.add(lampLight);



const geometry = new THREE.BoxGeometry( 2, 1, 1 );
const material = new THREE.MeshMatcapMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
const loader = new GLTFLoader();
loader.load( './Assets/SiteUnderConstruction.glb', function ( gltf ) {
	const model = gltf.scene;
	scene.add( model );
	const mixer = new THREE.AnimationMixer(model);
	const action = mixer.clipAction(gltf.animations[0]);
	action.play();
	function animate() {
		delta = clock.getDelta();
		requestAnimationFrame( animate );
		controls.update();
		mixer.update(delta);
		model.rotation.y -= 0.2*delta;
		// cube.rotation.y += 0.01;
	
		renderer.render( scene, camera );
	}
	
	animate();

}, undefined, function ( error ) {

	console.error( error );

} );

// scene.add( cube );

// window.addEventListener('resize', function () {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// });
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement)

