import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/dracoloader';
import './style.css';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";



//scene
const scene  = new THREE.Scene();

// // geometry
// var textureLoader = new THREE.TextureLoader();
// var texture = textureLoader.load('h.png');
// var material1 = new THREE.MeshBasicMaterial({ map: texture });
// var geometry = new THREE.BoxGeometry(10, 15, 15);
// var mesh = new THREE.Mesh(geometry, material1);
// scene.add(mesh);



// //load gltf


// const loader = new GLTFLoader();
// loader.load('model_m.gltf',function(gltf){
//   scene.add(gltf.scene);
//   let mixer = new THREE.AnimationMixer()
// });










// sizes  
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize( sizes.width, sizes.height );
  renderer.render(scene,camera);
});


console.log(sizes.height);
console.log(sizes.width);

//light 
const light = new THREE.PointLight( 0xfffff8, 100, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );


//camera
const camera = new THREE.PerspectiveCamera( 50,sizes.width/ sizes.height);
camera.position.z = 60;
camera.position.x = 10;
scene.add(camera)

//renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize( sizes.width,sizes.height );

renderer.render(scene,camera)


//loading with animation

let loader = new GLTFLoader();
let mixer;
let player1;


loader.load("model_m.gltf", function(gltf){
  console.log(gltf);
  player1 = gltf;
  console.log(gltf.animations[0].name);
  const model = gltf.scene;
  scene.add(model);
  mixer = new THREE.AnimationMixer(model);
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips,'ArmatureAction');
  const action = mixer.clipAction(clip);
  
  action.play();
  action.loop = THREE.LoopRepeat;
},undefined , function(error){
console.log(error);
});



const clock = new THREE.Clock();
function animate(){
  
    console.log("entered");
    requestAnimationFrame(animate);
  if(player1){
    //player1.scene.rotation.y += 0.005;
    if(mixer){
      mixer.update(clock.getDelta);
    }
  }
  renderer.render(scene,camera);

    
  }
  

animate();





//controller
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enablezoon = false;
controls.autorotate = true;
controls.autoRotateSpeed= 5;


const loop = () => {
  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop)
}
loop();




