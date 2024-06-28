import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.y = 2;
camera.position.z = 13;

//빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

//바닥
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, side: THREE.FrontSide });
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.y = 0.51;
frontSideMesh.position.z = 4;
frontSideMesh.receiveShadow = true;
frontSideMesh.castShadow = true;
scene.add(frontSideMesh);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.BackSide });
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.x = 1.2;
backSideMesh.position.y = 0.51;
backSideMesh.position.z = 4;
backSideMesh.receiveShadow = true;
scene.add(backSideMesh);

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.x = 2.4;
doubleSideMesh.position.y = 0.51;
doubleSideMesh.position.z = 4;
doubleSideMesh.receiveShadow = true;
// doubleSideMesh.castShadow = true;
scene.add(doubleSideMesh);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
torusKnotMaterial.roughness = 0.5;
torusKnotMaterial.metalness = 1;
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.position.x = -4;
torusKnotMesh.position.y = 1;
torusKnotMesh.position.z = 0;
torusKnotMesh.receiveShadow = true;
torusKnotMesh.castShadow = true;
scene.add(torusKnotMesh);

const torusKnotLembertMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
torusKnotLembertMaterial.emissive = new THREE.Color(0xff0000);
torusKnotLembertMaterial.emissiveIntensity = 0.2;
const torusKnotLembertMesh = new THREE.Mesh(torusKnotGeometry, torusKnotLembertMaterial);
torusKnotLembertMesh.position.x = -2;
torusKnotLembertMesh.position.y = 1;
torusKnotLembertMesh.position.z = 0;
torusKnotLembertMesh.receiveShadow = true;
torusKnotLembertMesh.castShadow = true;
scene.add(torusKnotLembertMesh);

const torusKnotPongMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
torusKnotPongMaterial.emissive = new THREE.Color(0xff0000);
torusKnotPongMaterial.emissiveIntensity = 0.2;
torusKnotPongMaterial.specular = new THREE.Color(0x0000ff);
const torusKnotPongMesh = new THREE.Mesh(torusKnotGeometry, torusKnotPongMaterial);
torusKnotPongMesh.position.x = 0;
torusKnotPongMesh.position.y = 1;
torusKnotPongMesh.position.z = 0;
torusKnotPongMesh.receiveShadow = true;
torusKnotPongMesh.castShadow = true;
scene.add(torusKnotPongMesh);

const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x000ff0 });
const torusKnotBasicMesh = new THREE.Mesh(torusKnotGeometry, torusKnotBasicMaterial);
torusKnotBasicMesh.position.x = 2;
torusKnotBasicMesh.position.y = 1;
torusKnotBasicMesh.position.z = 0;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.castShadow = true;
scene.add(torusKnotBasicMesh);

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ colorWrite: true });
torusKnotDepthMaterial.opacity = 0.5;
const torusKnotDepthMesh = new THREE.Mesh(torusKnotGeometry, torusKnotDepthMaterial);
torusKnotDepthMesh.position.x = 4;
torusKnotDepthMesh.position.y = 1;
torusKnotDepthMesh.position.z = 0;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.castShadow = true;
scene.add(torusKnotDepthMesh);

const textureLoader = new THREE.TextureLoader();
// textureLoader.load('/threejs.webp', (texture) => {
//     const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
//     const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
//     const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
//     textureMesh.receiveShadow = true;
//     textureMesh.castShadow = true;
//     textureMesh.position.set(0, 0.5, 2);
//     scene.add(textureMesh);
// });
const texture = await textureLoader.loadAsync('/threejs.webp');
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
textureMesh.receiveShadow = true;
textureMesh.castShadow = true;
textureMesh.position.set(0, 0.5, 2);
scene.add(textureMesh);

//카메라 컨트롤
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    frontSideMesh.rotation.y += 0.01;
    backSideMesh.rotation.y += 0.01;
    doubleSideMesh.rotation.y += 0.01;
    torusKnotMesh.rotation.y += 0.01;
    torusKnotLembertMesh.rotation.y += 0.01;
    torusKnotPongMesh.rotation.y += 0.01;
    torusKnotBasicMesh.rotation.y += 0.01;
    torusKnotDepthMesh.rotation.y += 0.01;
    textureMesh.rotation.y += 0.01;
};

render();
