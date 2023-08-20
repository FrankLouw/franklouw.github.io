import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight({color: 0xffffff});
scene.add(light);
const geometry = new THREE.BoxGeometry( 2, 1, 1 );
const material = new THREE.MeshMatcapMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
const loader = new GLTFLoader();
loader.load( './Assets/helloworldtext.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

// scene.add( cube );


camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	// cube.rotation.x += 0.05;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();