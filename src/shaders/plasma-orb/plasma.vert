
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
    
}