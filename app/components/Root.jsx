//import three.js
const THREE = require('three');

//export stateless React component
export default function Root()
{
    return null;
}

//Setup:
//get the DOM element in which you want to attach the scene
const container = document.querySelector('#container');

//create a WebGL renderer
const renderer = new THREE.WebGLRenderer();

//set the attributes of the renderer
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

//set the renderer size
renderer.setSize(WIDTH, HEIGHT);

//Adding a Camera

//set camera attributes
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 1500;

//create a camera
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

import { OrbitControls } from './OrbitControls';
const controls = new OrbitControls(camera, renderer.domElement);


//set the camera position - x, y, z
camera.position.set(0, 0, 750);

// Create a scene
const scene = new THREE.Scene();


// Attach the renderer to the DOM element.
container.appendChild(renderer.domElement);

//Three.js uses geometric meshes to create primitive 3D shapes like spheres, cubes, etc. I’ll be using a sphere.

// Set up the sphere attributes
const RADIUS = WIDTH / 10;
const SEGMENTS = 50;
const RINGS = 50;

//Create a group (which will later include our sphere and its texture meshed together)
const globe = new THREE.Group();
//add it to the scene
scene.add(globe);

//Let's create our globe using TextureLoader

// instantiate a loader
var video = document.getElementById('video');
video.play();
const texture = new THREE.VideoTexture(video);
//create the sphere
var sphere = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);

//map the texture to the material. Read more about materials in three.js docs
var material = new THREE.MeshBasicMaterial({ map: texture });

//create a new mesh with sphere geometry.
//create a new mesh with sphere geometry.
//create a new mesh with sphere geometry.
var mesh = new THREE.Mesh(sphere, material);

//add mesh to globe group
globe.add(mesh);

// Move the sphere back (z) so we can see it.
// globe.position.z = -300;

//Lighting

//create a point light (won't make a difference here because our material isn't affected by light)
const pointLight =
    new THREE.PointLight(0xFFFFFF);

//set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 400;

//add light to the scene
scene.add(pointLight);

//Update
//set update function to transform the scene and view
function update()
{
    //render
    renderer.render(scene, camera);

    //schedule the next frame.
    requestAnimationFrame(update);
    controls.update();
}

requestAnimationFrame(update)