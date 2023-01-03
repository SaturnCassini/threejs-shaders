import{S as H,C as R,G as k,M as r,a,P as A,b as V,R as j,c,D as N,O as d,W as U,E as q,d as F,A as I,e as K}from"./libs-6d6a511a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))P(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&P(h)}).observe(document,{childList:!0,subtree:!0});function W(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function P(t){if(t.ep)return;t.ep=!0;const n=W(t);fetch(t.href,n)}})();const _=`
//uniform mat4 projectionMatrix;
//uniform mat4 modelViewMatrix;
//in vec3 position;

uniform float radius;
uniform float time;

out vec3 vUv;

out vec2 pt1;
out vec2 pt2;

// vertPos divided by radius in each dimension.
// not normalized.
out vec3 vertR;

void main(){
    
    float theta1=time;
    float theta2=3.14+time;
    
    pt1=vec2(cos(theta1),sin(theta1));
    pt2=vec2(cos(theta2),sin(theta2));
    
    vec4 modelViewPosition=modelViewMatrix*vec4(position,1.);
    
    vUv=position;
    
    vertR=vUv/radius;
    
    gl_Position=projectionMatrix*modelViewPosition;
    
}`,B=`#define PI 3.1415926535897932384626433832795
precision highp float;

// perlin seed
uniform int seed;
uniform vec3 color1;
uniform vec3 color2;

uniform float time;

in vec2 pt1;
in vec2 pt2;

// vertPos divided by radius in each dimension.
in vec3 vertR;

out vec4 color;

vec2 grad(ivec2 z)// replace this anything that returns a random vector
{
	// 2D to 1D  (feel free to replace by some other)
	int n=z.x+z.y*seed;
	
	// Hugo Elias hash (feel free to replace by another one)
	n=(n<<13)^n;
	n=(n*(n*n*15731+789221)+1376312589)>>16;
	
	// Perlin style vectors
	n&=7;
	vec2 gr=vec2(n&1,n>>1)*2.-1.;
	return(n>=6)?vec2(0.,gr.x):
	(n>=4)?vec2(gr.x,0.):
	gr;
	
}

float noise(in vec2 p)
{
	ivec2 i=ivec2(floor(p));
	vec2 f=fract(p);
	
	vec2 u=f*f*(3.-2.*f);// feel free to replace by a quintic smoothstep instead
	
	return mix(mix(dot(grad(i+ivec2(0,0)),f-vec2(0.,0.)),
	dot(grad(i+ivec2(1,0)),f-vec2(1.,0.)),u.x),
	mix(dot(grad(i+ivec2(0,1)),f-vec2(0.,1.)),
	dot(grad(i+ivec2(1,1)),f-vec2(1.,1.)),u.x),u.y);
}

/// octaves: number of subdivisions. each octave halves the granularity.
float perlin(vec2 uv,int octaves){
	
	float f=0.;
	float r=.5;
	
	/// translates to new sample location for octaves.
	mat2 m=mat2(1.6,1.2,-1.2,1.6);
	
	uv*=float(1<<(octaves-1));
	
	for(int i=octaves;i>0;i--){
		f+=r*noise(uv);uv=m*uv;
		r=.5*r;
	}
	
	return f;
}

/// step but preserves the original value.
float cutoff(float min,float v){
	return v*step(min,v);
}

void main(void){
	
	float r=length(vertR);
	
	/// smooth edge at drop>1
	float alpha1=r>1.?1.-smoothstep(1.,1.06,r):pow(r,4.);
	alpha1*=.77;
	
	/// displacement = 1-z
	float del=perlin(vertR.xy*(1.+.4*vertR.z)+.45*time,3);
	
	// distance to lightning
	float d1=abs(4.*del)*min(length(cross(vertR,vec3(pt1,0.))),.95);
	//d1=max(d1,.03);
	
	float d2=abs(4.*del)*min(length(cross(vertR,vec3(pt2,0.))),.95);
	//d2=max(d2,.03);
	
	d1=min(d1,d2);
	/// acid trip stuff:
	//float alpha2=mix(1.,0.,d/.2);
	
	float alpha2=mix(.0,1.,1.-min(d1/.22,1.));
	//alpha2*=cutoff(.4,.5+.5*perlin(vertR,4));
	
	vec4 orb=alpha1*vec4(color1,1.);
	vec4 shock=alpha2*vec4(color1,1.);
	vec4 tex=vec4(.5,.5,.5,1.);
	
	color=orb.a>0.?orb.a*orb+(1.-orb.a)*tex+shock:tex;
	
}`,l=s=>({value:s});class J extends H{get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get radius(){return this.uniforms.radius.value}set radius(e){this.uniforms.radius.value=e}get color1(){return this.uniforms.color1.value}set color1(e){this.uniforms.color1.value.set(e)}get color2(){return this.uniforms.color2.value}set color2(e){this.uniforms.color2.value.set(e)}constructor(e){super({uniforms:{radius:l((e==null?void 0:e.radius)??10),time:l(0),color1:l(new R((e==null?void 0:e.color1)??8167403)),color2:l(new R((e==null?void 0:e.color2)??14280188)),angle:l((e==null?void 0:e.angle)??0),seed:l((e==null?void 0:e.seed)??Date.now())},vertexShader:_,fragmentShader:B,glslVersion:k})}}class Q extends r{constructor(e){super(new a(e),new J),console.dir(this.material.uniforms)}update(e){this.material.time=e/1e3}}const i=new A(70,window.innerWidth/window.innerHeight,.01,50);i.position.z=3;i.position.y=0;const f=new V,o=new Q(1);f.add(o);const T=new j(1.2,2,50),X=new c({side:N}),z=new r(T,X);z.rotation.x=1.7;const w=new d;w.add(z);o.add(w);i.lookAt(o.position);const Y=new a(.1,32,32),Z=new c,G=new r(Y,Z);G.position.set(3,0,0);const p=new d;p.add(G);o.add(p);const $=new a(.4,32,32),ee=new c,E=new r($,ee);E.position.set(6,0,0);const g=new d;g.add(E);o.add(g);const te=new a(.2,32,32),ne=new c,L=new r(te,ne);L.position.set(8,0,0);const y=new d;y.add(L);o.add(y);const oe=new a(.3,32,32),ie=new c,D=new r(oe,ie);D.position.set(10,0,0);const b=new d;b.add(D);o.add(b);const re=new a(.2,32,32),se=new c,O=new r(re,se);O.position.set(12,0,0);const x=new d;x.add(O);o.add(x);const ae=new a(.2,32,32),ce=new c,C=new r(ae,ce);C.position.set(14,0,0);const M=new d;M.add(C);o.add(M);const m=new U({antialias:!0});m.setSize(window.innerWidth,window.innerHeight);m.setAnimationLoop(de);window.addEventListener("resize",le,!1);const S=new q(m);S.addPass(new F(f,i));const u=new I(m," .-+*%@",{invert:!0});u.setSize(window.innerWidth,window.innerHeight);u.domElement.style.color="lightgreen";u.domElement.style.backgroundColor="black";document.body.appendChild(u.domElement);const v=new K(i,u.domElement);v.enableDamping=!0;v.dampingFactor=.05;v.maxDistance=15;v.minDistance=.1;function de(s){o.update(s),S.render(s),p.rotation.y+=.02,g.rotation.y+=.01,y.rotation.y+=.03,b.rotation.y+=.02,x.rotation.y+=.01,M.rotation.y+=.03,w.rotation.y+=.01,f.rotation.y+=.01,u.render(f,i)}function le(){i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),S.setSize(window.innerWidth,window.innerHeight)}
