// SET UP SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //alpha = white??
// renderer.setClearColor(0xffffff, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Initialize plane
const planeGeo = new THREE.PlaneGeometry( 300, 75, 20 );
var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({ color: 0xe0dfda }));
plane.receiveShadow = true;
plane.rotation.x += -0.5 * Math.PI;
	plane.position.y = -0.7;

scene.add(plane);

// Testing with 20 cubes
var numCubes = 20;
var cubeArr = [];

var leftPressed = false;
var rightPressed = false;
var straight = true;

for(var i = 0; i < numCubes; i++){
	cubeArr[i] = new Cube(scene);
}

camera.position.y = 2;

var menu = document.getElementById("menu");
var score = document.getElementById('highscore');
score.innerHTML='High Score: 0';

const animate = function () {
	
	menu.style.visibility = 'hidden';
	requestAnimationFrame( animate );

	if(camera.rotation.z > -0.001 && camera.rotation.z < 0.001){
		straight = true;
	}

	if(!straight && !leftPressed && !rightPressed){
			if(camera.rotation.z > 0){
				camera.rotation.z -= .005;
			}
			else if(camera.rotation.z < 0){
				camera.rotation.z += .005;
			}
	}

	// CUBES MOVE SIDE TO SIDE
	if(leftPressed){
		for(var i = 0; i < numCubes; i++){
			cubeArr[i].cube.position.x += 0.50;
		}
	}
	else if(rightPressed){
		for(var i = 0; i < numCubes; i++){
			cubeArr[i].cube.position.x -= 0.50;
		}
	}

	// CAMERA TILT
	if(leftPressed && camera.rotation.z < .10){
		camera.rotation.z += .01;
		straight = false;	
	}
	else if(rightPressed && camera.rotation.z > -.10){
		camera.rotation.z -= .01;
		straight = false;
	}

    // CUBE MOVES CLOSER  
	for(var i = 0; i < numCubes; i++){
		cubeArr[i].cube.position.z += 0.10;
	}

	renderer.render( scene, camera );
};


document.getElementById("startGameButton").addEventListener("click", animate);

// KEY EVENT LISTENERS
document.onkeydown = function(event) {
	if(event.keyCode == '37'){
		leftPressed = true;

	}
	if(event.keyCode == '39'){
		rightPressed = true;
	}
}

document.onkeyup = function(event) {
	if(event.keyCode == '37'){
		leftPressed = false;

	}
	if(event.keyCode == '39'){
		rightPressed = false;

	}
}

