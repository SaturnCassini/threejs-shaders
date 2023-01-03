import * as THREE from 'three';
import { Scene } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { Vector3 } from 'three';
import { Point3 } from './util/types';



const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);
camera.position.z = 3;

const scene = new THREE.Scene();

buildSphere(10, { x: 0, y: 0, z: 1 }, scene);


const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setAnimationLoop(update);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onResize, false);

const composer = new EffectComposer(renderer);

function update(dt: number) {

    renderer.render(scene, camera);

}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    composer.setSize(window.innerWidth, window.innerHeight);
}


function buildSphere(radius: number, at?: Point3, scene?: Scene) {

    const geom = new THREE.SphereGeometry(0.2,)
    const mat = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geom, mat);
    scene?.add(mesh);
    if (at) {
        mesh.position.set(at.x, at.y, at.z);
    }

    return mesh;

}