// SET UP SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //alpha = white??
// renderer.setClearColor(0xffffff, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Testing with 20 cubes
var numCubes = 20;
var cubeArr = [];

for(var i = 0; i < numCubes; i++){
	cubeArr[i] = new Cube(scene);
}

camera.position.y = 2;


const animate = function () {
	requestAnimationFrame( animate );
    // CUBE MOVES CLOSER  
	for(var i = 0; i < numCubes; i++){
		cubeArr[i].cube.position.z += 0.10;
	}

	renderer.render( scene, camera );
};

animate();

