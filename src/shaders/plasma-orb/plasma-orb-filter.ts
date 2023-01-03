import vert from './plasma.vert?raw';
import frag from './plasma.frag?raw';
import { Color, ColorRepresentation, GLSL3, GLSLVersion, IUniform, Material, ShaderMaterial } from 'three';
import { asUniform } from '../../util/shaders';
import { Point3 } from '../../util/types';

// [0x7c9feb, 0xd9e5fc]),
export class PlasmaOrbMaterial extends ShaderMaterial {


    public get time() { return this.uniforms.time.value; }
    public set time(v) { this.uniforms.time.value = v; }

    public get radius(): number {
        return this.uniforms.radius.value;
    }
    public set radius(r: number) {
        this.uniforms.radius.value = r;
    }

    public get color1(): ColorRepresentation { return (this.uniforms.color1 as IUniform<Color>).value; }
    public set color1(v: ColorRepresentation) { (this.uniforms.color1.value as Color).set(v); }

    public get color2(): ColorRepresentation { return (this.uniforms.color2 as IUniform<Color>).value; }
    public set color2(v: ColorRepresentation) { (this.uniforms.color2.value as Color).set(v); }

    constructor(params: {
        at: Point3,
        radius?: number,
        color1?: ColorRepresentation,
        color2?: ColorRepresentation,
        angle?: number,
        seed?: number
    }) {

        super({

            uniforms: {

                radius: asUniform(params.radius ?? 100),
                worldPos: asUniform(params.at),
                time: asUniform(0),
                color1: asUniform(new Color(params.color1 ?? 0x7c9feb)),
                color2: asUniform(new Color(params.color2 ?? 0xd9e5fc)),

                angle: asUniform(params.angle ?? 0),
                seed: asUniform(params.seed ?? Date.now()),

            },
            vertexShader: vert,
            fragmentShader: frag,
            glslVersion: GLSL3

        });

    }


}