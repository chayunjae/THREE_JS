import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.y = 1;
camera.position.z = 5;

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

//박스 엘리먼트
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-5, 0.5, 0);
mesh.castShadow = true;
scene.add(mesh);

//캡슐 엘리먼트
const capsuleGeometry = new THREE.CapsuleGeometry(0.5, 0.5, 20, 5);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xff5500 });
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.set(-3.5, 0.75, 0);
capsuleMesh.receiveShadow = true;
capsuleMesh.castShadow = true;
scene.add(capsuleMesh);

//기둥 엘리먼트
const cylinderGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.5, 6);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-2, 0.8, 0);
cylinderMesh.receiveShadow = true;
cylinderMesh.castShadow = true;
scene.add(cylinderMesh);

//원환면 엘리먼트
const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(1.1, 0.6, 0);
torusMesh.receiveShadow = true;
torusMesh.castShadow = true;
scene.add(torusMesh);

//윤곽선 엘리먼트
const starShape = new THREE.Shape();
starShape.moveTo(0, 0.8);
starShape.lineTo(0.17, 0.2);
starShape.lineTo(0.8, 0.2);
starShape.lineTo(0.27, -0.1);
starShape.lineTo(0.5, -0.8);
starShape.lineTo(0, -0.35);
starShape.lineTo(-0.5, -0.8);
starShape.lineTo(-0.27, -0.1);
starShape.lineTo(-0.8, 0.2);
starShape.lineTo(-0.17, 0.2);
const shapeGeometry = new THREE.ShapeGeometry(starShape);
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0x008800 });
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMesh.position.set(-0.25, 2.2, 0);
shapeMesh.receiveShadow = true;
shapeMesh.castShadow = true;
scene.add(shapeMesh);

//입체(돌출) 엘리먼트
const extrudeSettings = {
    steps: 1,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickenss: 0.1,
    bevelSize: 0.3,
    bevelOffset: -0.2,
    bevelSegments: 100,
};
const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(-0.25, 1, 0);
extrudeMesh.receiveShadow = true;
extrudeMesh.castShadow = true;
scene.add(extrudeMesh);

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
};

render();
