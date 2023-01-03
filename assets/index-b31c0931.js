import{S as j,C as G,G as N,M as r,a as d,P as U,b as q,R as z,c as s,D as E,O as a,W as F,E as I,d as K,A as _,e as B}from"./libs-6d6a511a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))R(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const h of t.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&R(h)}).observe(document,{childList:!0,subtree:!0});function V(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerpolicy&&(t.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?t.credentials="include":n.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function R(n){if(n.ep)return;n.ep=!0;const t=V(n);fetch(n.href,t)}})();const J=`
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
    
}`,Q=`#define PI 3.1415926535897932384626433832795
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
	
}`,l=c=>({value:c});class T extends j{get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get radius(){return this.uniforms.radius.value}set radius(e){this.uniforms.radius.value=e}get color1(){return this.uniforms.color1.value}set color1(e){this.uniforms.color1.value.set(e)}get color2(){return this.uniforms.color2.value}set color2(e){this.uniforms.color2.value.set(e)}constructor(e){super({uniforms:{radius:l((e==null?void 0:e.radius)??10),time:l(0),color1:l(new G((e==null?void 0:e.color1)??8167403)),color2:l(new G((e==null?void 0:e.color2)??14280188)),angle:l((e==null?void 0:e.angle)??0),seed:l((e==null?void 0:e.seed)??Date.now())},vertexShader:J,fragmentShader:Q,glslVersion:N})}}class X extends r{constructor(e){super(new d(e),new T),console.dir(this.material.uniforms)}update(e){this.material.time=e/1e3}}const i=new U(90,window.innerWidth/window.innerHeight,.01,50);i.position.z=4;i.position.y=3;i.position.x=2;const f=new q,o=new X(1);f.add(o);const Y=new z(1.83,2.1,50),Z=new s({side:E}),L=new r(Y,Z);L.rotation.x=1.7;const w=new a;w.add(L);o.add(w);const $=new z(1.3,1.75,50),ee=new s({side:E}),D=new r($,ee);D.rotation.x=1.6;const g=new a;g.add(D);o.add(g);const ne=new d(.1,32,32),te=new s,O=new r(ne,te);O.position.set(3,0,0);const p=new a;p.add(O);o.add(p);const oe=new d(.4,32,32),ie=new s,C=new r(oe,ie);C.position.set(6,0,0);const y=new a;y.add(C);o.add(y);const re=new d(.2,32,32),se=new s,H=new r(re,se);H.position.set(8,0,0);const b=new a;b.add(H);o.add(b);const ae=new d(.3,32,32),ce=new s,W=new r(ae,ce);W.position.set(10,0,0);const x=new a;x.add(W);o.add(x);const de=new d(.2,32,32),le=new s,k=new r(de,le);k.position.set(12,0,0);const M=new a;M.add(k);o.add(M);const ue=new d(.2,32,32),fe=new s,A=new r(ue,fe);A.position.set(14,0,0);const S=new a;S.add(A);o.add(S);i.lookAt(o.position);const m=new F({antialias:!0});m.setSize(window.innerHeight,window.innerHeight);m.setAnimationLoop(me);window.addEventListener("resize",ve,!1);const P=new I(m);P.addPass(new K(f,i));const u=new _(m," .-+*%@",{invert:!0});u.setSize(window.innerWidth,window.innerHeight);u.domElement.style.color="lightgreen";u.domElement.style.backgroundColor="black";document.body.appendChild(u.domElement);const v=new B(i,u.domElement);v.enableDamping=!0;v.dampingFactor=.05;v.maxDistance=15;v.minDistance=3;function me(c){o.update(c),P.render(c),p.rotation.y+=.02,y.rotation.y+=.01,b.rotation.y+=.03,x.rotation.y+=.02,M.rotation.y+=.01,S.rotation.y+=.03,w.rotation.y-=.03,g.rotation.y+=.03,f.rotation.y+=5e-4,u.render(f,i)}function ve(){i.aspect=window.innerWidth/(window.innerHeight/2),i.updateProjectionMatrix(),P.setSize(window.innerWidth,window.innerHeight/2)}
