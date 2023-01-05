import { PerspectiveCamera, Scene, WebGLRenderer, SphereGeometry, Mesh, MeshNormalMaterial } from 'three';
import * as THREE from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { Vector3 } from 'three';
import { Point3 } from './util/types';
import { PlasmaOrbMaterial } from './shaders/plasma-orb/plasma-orb-filter';
import { PlasmaOrb } from './objects/plasma-orb';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { AudioLoader } from 'three';

const camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 3000);
camera.position.z = 2;
camera.position.y = 3;
camera.position.x = -3;

const scene = new Scene();

// Create Saturn
const saturn = new PlasmaOrb(1) as Mesh;
scene.add(saturn);

// Add a userData property to the Saturn mesh object
Object.defineProperty(saturn, 'userData', {
    value: {},
    writable: true,
    enumerable: true,
    configurable: true
});
  
// Set the value of the url property to the desired URL string
saturn.userData.URL = 'https://en.wikipedia.org/wiki/Saturn';

// Create Rings
const ringGeometry1 = new THREE.RingGeometry(1.83, 2.1, 50)
const ringMaterial1 = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide})
const ring1 = new THREE.Mesh(ringGeometry1, ringMaterial1)
ring1.rotation.x =  1.7
const ringSystem1 = new THREE.Object3D()
ringSystem1.add(ring1)
saturn.add(ringSystem1)

const ringGeometry2 = new THREE.RingGeometry(1.3, 1.75, 50)
const ringMaterial2 = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide})
const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2)
ring2.rotation.x =  1.6
const ringSystem2 = new THREE.Object3D()
ringSystem2.add(ring2)
saturn.add(ringSystem2)

// Add orbiting moons
// Titan
const titanGeometry = new THREE.SphereGeometry(0.2, 32, 32)
const titanMaterial = new THREE.MeshNormalMaterial()
const titan = new THREE.Mesh(titanGeometry, titanMaterial)
titan.position.set(10, 3, 0)
const titanSystem = new THREE.Object3D()
titanSystem.add(titan)
saturn.add(titanSystem)
// Encelaedus
const encelaedusGeometry = new THREE.SphereGeometry(0.4, 32, 32)
const encelaedusMaterial = new THREE.MeshNormalMaterial()
const encelaedus = new THREE.Mesh(encelaedusGeometry, encelaedusMaterial)
encelaedus.position.set(15, -2, 0)
const encelaedusSystem = new THREE.Object3D()
encelaedusSystem.add(encelaedus)
saturn.add(encelaedusSystem)
// Mimas
const mimasGeometry = new THREE.SphereGeometry(1, 32, 32)
const mimasMaterial = new THREE.MeshNormalMaterial()
const mimas = new THREE.Mesh(mimasGeometry, mimasMaterial)
mimas.position.set(21, 0, 12)
const mimasSystem = new THREE.Object3D()
mimasSystem.add(mimas)
mimasSystem.rotation.y += 0.4
saturn.add(mimasSystem)
// Tethys
const tethysGeometry = new THREE.SphereGeometry(0.6, 32, 32)
const tethysMaterial = new THREE.MeshNormalMaterial()
const tethys = new THREE.Mesh(tethysGeometry, tethysMaterial)
tethys.position.set(25, 0, 0)
const tethysSystem = new THREE.Object3D()
tethysSystem.add(tethys)
tethysSystem.rotation.y += 0.21
saturn.add(tethysSystem)
// Dione
const dioneGeometry = new THREE.SphereGeometry(1.2, 32, 32)
const dioneMaterial = new THREE.MeshNormalMaterial()
const dione = new THREE.Mesh(dioneGeometry, dioneMaterial)
dione.position.set(33, 0, 0)
const dioneSystem = new THREE.Object3D()
dioneSystem.add(dione)
dioneSystem.rotation.y += 1
saturn.add(dioneSystem)
// Rhea
const rheaGeometry = new THREE.SphereGeometry(1.2, 32, 32)
const rheaMaterial = new THREE.MeshNormalMaterial()
const rhea = new THREE.Mesh(rheaGeometry, rheaMaterial)
rhea.position.set(43, 0, 0)
const rheaSystem = new THREE.Object3D()
rheaSystem.add(rhea)
saturn.add(rheaSystem)

// Renderer options
camera.lookAt(saturn.position)
camera.position.y -= 2;

const renderer = new WebGLRenderer({ antialias: true});
// renderer.setSize(window.innerHeight, 400);
renderer.setAnimationLoop(update);
//document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onResize, false);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const effect = new AsciiEffect(renderer, ' .-+*saturnsATURNS', { invert: true });
effect.setSize(window.innerWidth, window.innerHeight/1.5);
composer.aspect = window.innerWidth / window.innerHeight*1.5;
effect.domElement.style.color = 'lightgreen';
effect.domElement.style.backgroundColor = 'black';
document.body.appendChild(effect.domElement);



// Add Orbit Controls
// Controls
const controls = new OrbitControls(camera, effect.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.maxDistance = 30
controls.minDistance = 3

document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;




// // add background sound with audio listener
// const listener = new THREE.AudioListener();
// camera.add(listener);
// const audioLoader = new AudioLoader();
// const backgroundSong = new THREE.Audio( listener );


// const muteButton = document.getElementById('audio-mute') as HTMLButtonElement
// function muteToggle(event){
//   // when the button is clicked toggle the mute property of the sound
//   audioLoader.load('sounds/song.mp3', function(buffer) {
//     backgroundSong.setBuffer(buffer);
//     backgroundSong.setLoop(true);
//     backgroundSong.setVolume(0.5);
//     } 
//   );
//   backgroundSong.muted = !backgroundSong.muted;
//   // change the button text
//   muteButton.innerHTML = backgroundSong.muted ? 'Unmute' : 'Mute';
//   console.log('mute')
// }



function onDocumentKeyDown(event) {
  // backgroundSong.play();

  switch (event.keyCode) {
    case 87: // w
        moveForward = true;
      break;
    case 65: // a
        moveLeft = true;
      break;
    case 83: // s
        moveBackward = true;
      break;
    case 68: // d
        moveRight = true;
      break;
  }
}

function onDocumentKeyUp(event) {
  switch (event.keyCode) {
    case 87: // w
      moveForward = false;
      break;
    case 65: // a
      moveLeft = false;
      break;
    case 83: // s
      moveBackward = false;
      break;
    case 68: // d
      moveRight = false;
      break;
  }
}

// Raycaster
const raycaster = new THREE.Raycaster();
document.addEventListener('click', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false)

function onDocumentMouseMove(event){
    const mouse ={
        x: (event.clientX / effect.domElement.clientWidth) * 2 - 1,
        y: -(event.clientY / effect.domElement.clientHeight) * 2 + 1
    }  

}

function onDocumentMouseDown(event) {
  // Set the mouse position to be used for the raycaster
  const mouse ={
    x: (event.clientX / effect.domElement.clientWidth) * 2 - 1,
    y: -(event.clientY / effect.domElement.clientHeight) * 2 + 1
}  
  // Update the raycaster with the new mouse position
  raycaster.setFromCamera(mouse, camera);
  console.log('mouseclick:', mouse)

  // backgroundSong.play();

  // Use the raycaster to detect if the user clicked on an object
  const intersects = raycaster.intersectObjects(saturn);
  if (intersects.length > 0) {
    // If the user clicked on an object, open the link associated with that object
    console.log(saturn.userData.URL);
    effect.open(intersects[0].object.userData.URL, '_blank');
  }
}



function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight*1.5;
    composer.setSize(window.innerWidth, window.innerHeight/1.5);
    camera.updateProjectionMatrix();
}

function update(dt: number) {


    if (moveForward) camera.position.z -= 0.1;
    if (moveBackward) camera.position.z += 0.1;
    if (moveLeft) camera.position.x -= 0.1;
    if (moveRight) camera.position.x += 0.1;
    
    

    saturn.update(dt);
    composer.render(dt);
    titanSystem.rotation.y += 0.0071
    encelaedusSystem.rotation.y += 0.005
    mimasSystem.rotation.y += 0.0025
    tethysSystem.rotation.y += 0.002
    dioneSystem.rotation.y += 0.0015
    rheaSystem.rotation.y += 0.001
    ringSystem1.rotation.y -= 0.02
    ringSystem2.rotation.y += 0.05
    scene.rotation.y += 0.00005
    effect.render(scene, camera);
}


function buildSphere(radius: number, at?: Point3, scene?: Scene) {

    const geom = new SphereGeometry(radius,)
    const mat = new MeshNormalMaterial();

    const mesh = new Mesh(geom, mat);
    scene?.add(mesh);
    if (at) {
        mesh.position.set(at.x, at.y, at.z);
    }

    return mesh;

}

// function animate() {
//     requestAnimationFrame(animate);
//     sphere.rotation.x += 0.01;

//     sphere.rotation.y += 0.01;
//     render()
// }
// animate();