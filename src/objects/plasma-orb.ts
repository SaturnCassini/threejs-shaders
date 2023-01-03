import { BufferGeometry, CircleGeometry, Mesh, Object3D, SphereGeometry } from 'three';
import { PlasmaOrbMaterial } from '../shaders/plasma-orb/plasma-orb-filter';
import { Point3 } from '../util/types';

export class PlasmaOrb extends Mesh<BufferGeometry, PlasmaOrbMaterial> {


    constructor(radius: number) {
        super(new SphereGeometry(radius,), new PlasmaOrbMaterial());

        console.dir(this.material.uniforms);
    }


    update(time: number) {
        this.material.time = time / 1000;

    }

}