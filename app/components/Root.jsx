import { OrbitControls } from './OrbitControls';

//import three.js
const THREE = require('three');

//export stateless React component
export default function Root() {
    return null;
}

// SETUP

// Parameters canvas
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Parameters sphere
var DISTANCE = 750;
const RADIUS = 200 * Math.min(WIDTH, HEIGHT) / Math.max(WIDTH, HEIGHT);
const SEGMENTS = 50;
const RINGS = 50;

// Parameters camera
const ASPECT = WIDTH / HEIGHT;
const VIEW_ANGLE = Math.min(WIDTH, HEIGHT) / Math.max(WIDTH, HEIGHT) * 180 / Math.PI;
const NEAR = 0.1 * DISTANCE;
const FAR = 10 * DISTANCE;

// get the DOM element in which you want to attach the scene
const container = document.querySelector('#container');

//create a WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);

//create a camera
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.set(0, 0, DISTANCE);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#000");

// Attach the renderer to the DOM element.
container.appendChild(renderer.domElement);

const globe = new THREE.Group();
scene.add(globe);

// instantiate a loader
var video = document.getElementById('video');
video.load()
video.play();

const texture = new THREE.VideoTexture(video);
var sphere = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);
var material = new THREE.MeshBasicMaterial({ map: texture });
var mesh = new THREE.Mesh(sphere, material);
globe.add(mesh);


//Lighting
//create a point light (won't make a difference here because our material isn't affected by light)
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 400;
scene.add(pointLight);

//Update
//set update function to transform the scene and view
var slider = document.getElementById("rotation");
function update() {
    //render
    renderer.render(scene, camera);

    //schedule the next frame.
    requestAnimationFrame(update);
    controls.autoRotateSpeed = slider.value;
    controls.update();
}

requestAnimationFrame(update)