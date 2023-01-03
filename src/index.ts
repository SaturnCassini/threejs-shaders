import { PerspectiveCamera, Scene, WebGLRenderer, SphereGeometry, Mesh } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { Vector3 } from 'three';
import { Point3 } from './util/types';
import { PlasmaOrbMaterial } from './shaders/plasma-orb/plasma-orb-filter';
import { PlasmaOrb } from './objects/plasma-orb';



const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);
camera.position.z = 20;

const scene = new Scene();

//buildSphere(10, { x: 0, y: 0, z: -20 }, scene);

const orb = new PlasmaOrb(10);
scene.add(orb);

const renderer = new WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setAnimationLoop(update);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onResize, false);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

function update(dt: number) {

    orb.update(dt);

    composer.render(dt);
    //renderer.render(scene, camera)


}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    composer.setSize(window.innerWidth, window.innerHeight);
}


function buildSphere(radius: number, at?: Point3, scene?: Scene) {

    const geom = new SphereGeometry(radius,)
    const mat = new PlasmaOrbMaterial();// new THREE.MeshNormalMaterial();

    const mesh = new Mesh(geom, mat);
    scene?.add(mesh);
    if (at) {
        mesh.position.set(at.x, at.y, at.z);
    }

    return mesh;

}