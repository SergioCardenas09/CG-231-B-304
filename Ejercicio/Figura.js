// medidas de la pantalla
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// render y visualización
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

// cámara perspectiva
var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;
camera.rotation.set(0, -0.5, 0);
scene.add(camera);

// Orbit control
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// luz ambiental y direccional
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 0, 10);
scene.add(ambientLight);
scene.add(directionalLight);

// grilla
const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// creación de la figura y agregado a la escena
const figura = troncoPiramide(7, 9, 2, 20);
scene.add(figura);

// función de render
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
