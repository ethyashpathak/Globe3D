import * as THREE from "three"
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { createStarField } from "./stars.js";
import { TextureLoader, Mesh, SphereGeometry, MeshPhongMaterial } from "three";

const w=window.innerWidth;
const h=window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);


const fov=75;
const aspect=w/h;
const near=0.1;
const far=1000;
const camera=new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.z=5;
const scene=new THREE.Scene();

const earthGroup=new THREE.Group();
earthGroup.rotation.z=-23.4*Math.PI/180;
scene.add(earthGroup);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.dampingFactor=0.03;
const loader=new THREE.TextureLoader();
const geo=new THREE.IcosahedronGeometry(1.5,12);
const mat=new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map:loader.load("8081_earthmap10k.jpg")
   // flatShading:true
});
const mesh=new THREE.Mesh(geo,mat);
earthGroup.add(mesh);
const stars = createStarField();
scene.add(stars);

const lightsMat = new THREE.MeshBasicMaterial({
    map:loader.load("8081_earthlights10k.jpg"),
    blending: THREE.AdditiveBlending,
});
const lightsMesh=new THREE.Mesh(geo,lightsMat);
earthGroup.add(lightsMesh);

const sunlight=new THREE.DirectionalLight(0xffffff);
sunlight.position.set(-2,0.5,1.5)
scene.add(sunlight);


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    mesh.rotation.y+=0.002;
    lightsMesh.rotation.y+=0.002;
    controls.update();
}
animate();
