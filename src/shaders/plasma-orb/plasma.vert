
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

in vec3 position;

out vec3 vUv;

void main(){
    
    vUv=position;
    
    vec4 modelViewPosition=modelViewMatrix*vec4(position,1.);
    gl_Position=projectionMatrix*modelViewPosition;
}