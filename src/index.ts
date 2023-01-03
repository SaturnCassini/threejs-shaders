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


const path = './objects/SSTITLE.gltf';



const camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 50);
camera.position.z = 4;
camera.position.y = 3;
camera.position.x = 2;

const scene = new Scene();

// Create Saturn
const saturn = new PlasmaOrb(1);
scene.add(saturn);

// Create Rings
const ringGeometry1 = new THREE.RingGeometry(1.83, 2.1, 50)
const ringMaterial1 = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide})
const ring1 = new THREE.Mesh(ringGeometry1, ringMaterial1)
ring1.rotation.x =  1.7
const ringSystem1 = new THREE.Object3D()
ringSystem1.add(ring1)
saturn.add(ringSystem1)


// Create Rings
const ringGeometry2 = new THREE.RingGeometry(1.3, 1.75, 50)
const ringMaterial2 = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide})
const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2)
ring2.rotation.x =  1.6
const ringSystem2 = new THREE.Object3D()
ringSystem2.add(ring2)

saturn.add(ringSystem2)

// Add orbiting moons
// Titan
const titanGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const titanMaterial = new THREE.MeshNormalMaterial()
const titan = new THREE.Mesh(titanGeometry, titanMaterial)
titan.position.set(3, 0, 0)
const titanSystem = new THREE.Object3D()
titanSystem.add(titan)
saturn.add(titanSystem)
// Encelaedus
const encelaedusGeometry = new THREE.SphereGeometry(0.4, 32, 32)
const encelaedusMaterial = new THREE.MeshNormalMaterial()
const encelaedus = new THREE.Mesh(encelaedusGeometry, encelaedusMaterial)
encelaedus.position.set(6, 0, 0)
const encelaedusSystem = new THREE.Object3D()
encelaedusSystem.add(encelaedus)
saturn.add(encelaedusSystem)
// Mimas
const mimasGeometry = new THREE.SphereGeometry(0.2, 32, 32)
const mimasMaterial = new THREE.MeshNormalMaterial()
const mimas = new THREE.Mesh(mimasGeometry, mimasMaterial)
mimas.position.set(8, 0, 0)
const mimasSystem = new THREE.Object3D()
mimasSystem.add(mimas)
saturn.add(mimasSystem)
// Tethys
const tethysGeometry = new THREE.SphereGeometry(0.3, 32, 32)
const tethysMaterial = new THREE.MeshNormalMaterial()
const tethys = new THREE.Mesh(tethysGeometry, tethysMaterial)
tethys.position.set(10, 0, 0)
const tethysSystem = new THREE.Object3D()
tethysSystem.add(tethys)
saturn.add(tethysSystem)
// Dione
const dioneGeometry = new THREE.SphereGeometry(0.2, 32, 32)
const dioneMaterial = new THREE.MeshNormalMaterial()
const dione = new THREE.Mesh(dioneGeometry, dioneMaterial)
dione.position.set(12, 0, 0)
const dioneSystem = new THREE.Object3D()
dioneSystem.add(dione)
saturn.add(dioneSystem)
// Rhea
const rheaGeometry = new THREE.SphereGeometry(0.2, 32, 32)
const rheaMaterial = new THREE.MeshNormalMaterial()
const rhea = new THREE.Mesh(rheaGeometry, rheaMaterial)
rhea.position.set(14, 0, 0)
const rheaSystem = new THREE.Object3D()
rheaSystem.add(rhea)
saturn.add(rheaSystem)

// Renderer options
camera.lookAt(saturn.position)


const renderer = new WebGLRenderer({ antialias: true});
renderer.setSize(window.innerHeight, window.innerHeight);

renderer.setAnimationLoop(update);

//document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onResize, false);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const effect = new AsciiEffect(renderer, ' .-+*%@', { invert: true });
effect.setSize(window.innerWidth, window.innerHeight);
effect.domElement.style.color = 'lightgreen';
effect.domElement.style.backgroundColor = 'black';
document.body.appendChild(effect.domElement);

// Add Orbit Controls
// Controls
const controls = new OrbitControls(camera, effect.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.maxDistance = 15
controls.minDistance = 3

function update(dt: number) {

    saturn.update(dt);
    composer.render(dt);
    titanSystem.rotation.y += 0.02
    encelaedusSystem.rotation.y += 0.01
    mimasSystem.rotation.y += 0.03
    tethysSystem.rotation.y += 0.02
    dioneSystem.rotation.y += 0.01
    rheaSystem.rotation.y += 0.03
    ringSystem1.rotation.y -= 0.03
    ringSystem2.rotation.y += 0.03
    scene.rotation.y += 0.0005
    effect.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth/(window.innerHeight/2 ) ;
    camera.updateProjectionMatrix();

    composer.setSize(window.innerWidth, window.innerHeight/2);
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