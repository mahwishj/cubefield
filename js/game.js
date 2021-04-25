// SET UP SCENE, CAMERA, RENDERER
var scene;
var camera;
var renderer;
var planeGeo;
var plane;
var arrow;
var currScore = 0;
var highScore = currScore;
var timer;
var zSpeed = 1;
var alpha = false;


// Testing with 20 cubes
var numCubes = 100;
var cubeArr = [];

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //alpha = white??

// renderer.setClearColor(0xffffff, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Initialize plane
planeGeo = new THREE.PlaneGeometry( 300, 85, 20 );
plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({ color: 0xC8C8C8 }));
plane.receiveShadow = true;
plane.rotation.x += -0.5 * Math.PI;
	plane.position.y = -0.7;




// Initialize arrow
const arrowGeo = new THREE.BufferGeometry();
const points = [
	new THREE.Vector3(0, 0.06, 0.20),//c
	new THREE.Vector3(0.17, 0.000,  0.40),//b
	new THREE.Vector3(-0.17, 0.000,  0.40),//a   

	new THREE.Vector3(-0.17, 0.000,  0.40),//a    
	new THREE.Vector3( 0.000, 0.000, -0.150),//d  
	new THREE.Vector3(0, 0.06, 0.20),//c

	new THREE.Vector3(0.17, 0.000,  0.40),//b
	new THREE.Vector3( 0.000, 0.000, -0.150),//d  
	new THREE.Vector3(-0.17, 0.000,  0.40),//a

	new THREE.Vector3(0, 0.06, 0.20),//c
	new THREE.Vector3( 0.000, 0.000, -0.150),//d    
	new THREE.Vector3(0.17, 0.000,  0.40),//b
]

arrowGeo.setFromPoints(points);
arrowGeo.computeVertexNormals();

arrow = new THREE.Mesh(arrowGeo,  new THREE.MeshBasicMaterial({color: 0x897afa}));
const arrowEdgeGeo = new THREE.EdgesGeometry( arrowGeo );
const arrowEdgeMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
arrow.add( new THREE.LineSegments( arrowEdgeGeo, arrowEdgeMaterial ) );



arrow.position.y=-0.5;
arrow.position.z=-5;




// creat cubes
for(var i = 0; i < numCubes; i++){
	cubeArr[i] = new Cube(scene);
	
}

camera.position.y = 2;	

var leftPressed = false;
var rightPressed = false;
var cameraStraight = true;

var arrowStraight = true;

var collision = false;
var gameOver = false;



var menu = document.getElementById("menu");
var score = document.getElementById('highscore');
score.innerHTML='High Score: ' + highScore;

var currScoreDisplay = document.getElementById('currentscore');
currScoreDisplay.textContent = currScore;
// Hide the curr score on the menu initially (only shows up after playing at least 1 game)
currScoreDisplay.style.color = 'white';


///////////////////////////////////////////////////////////////////
const initialize = function () {
	scene.add(plane);
	scene.add(arrow);

	for(var i = 0; i < numCubes; i++){
		(cubeArr[i]).regenerate();
		scene.add((cubeArr[i]).cube);
	}

	// initialize and show curr score
	currScore = 0;
	zSpeed = 1;
	alpha = false;
	currScoreDisplay.textContent = currScore;
	currScoreDisplay.style.color = 'black';
	timer = setInterval(keepScore, 1);
	setInterval(increaseDifficulty, 500);
	animate();
}


function collisionCheck(curCube){
	var cube_bbox = new THREE.Box3();
	cube_bbox.setFromObject( curCube );

	if(arrow.position.y<=cube_bbox.max.y && arrow.position.y>=cube_bbox.min.y && 
		arrow.position.x<=cube_bbox.max.x && arrow.position.x>=cube_bbox.min.x &&
		arrow.position.z<=(cube_bbox.max.z) && arrow.position.z>=(cube_bbox.min.z)
		){
			return true;	
		}
	return false;
}


const animate = function () {
	
	menu.style.visibility = 'hidden';
	currScoreDisplay.style.visibility = 'visible';
	var req = requestAnimationFrame( animate );

	if(camera.rotation.z > -0.001 && camera.rotation.z < 0.001){
		cameraStraight = true;
	}

	if(arrow.rotation.y > -0.001 && arrow.rotation.y < 0.001){
		arrowStraight = true;
	}

	// restraighten camera
	if(!cameraStraight && !leftPressed && !rightPressed){
			if(camera.rotation.z > 0){
				camera.rotation.z -= .005;
			}
			else if(camera.rotation.z < 0){
				camera.rotation.z += .005;
				
			}


	}
	// restraighten arrow
	if(!arrowStraight && !leftPressed && !rightPressed){
		if(arrow.rotation.y>0){
			arrow.rotation.y -= 0.020;
		}else if(arrow.rotation.y<0){
			arrow.rotation.y += 0.020;
		}

	}
		
	// CUBES MOVE SIDE TO SIDE
	if(leftPressed){
		for(var i = 0; i < numCubes; i++){
			cubeArr[i].cube.position.x += 0.30;
		}
	}
	else if(rightPressed){
		for(var i = 0; i < numCubes; i++){
			cubeArr[i].cube.position.x -= 0.30;
		}
	}

	// CAMERA TILT
	if(leftPressed){

		if(camera.rotation.z < .10){
			camera.rotation.z += .01;
		}

		if(arrow.rotation.y<0.2){
			arrow.rotation.y += 0.03;
		}
		
		cameraStraight = false;	
		arrowStraight = false;
	}
	else if(rightPressed){
		if(camera.rotation.z > -.10){ 
			camera.rotation.z -= .01;
		}
		
		if(arrow.rotation.y>-0.2){
			arrow.rotation.y -= 0.03;
		}
		cameraStraight = false;
		arrowStraight = false;
	}

    // CUBE MOVES CLOSER  
	for(var i = 0; i < numCubes; i++){
		var curCube = cubeArr[i].cube;
		curCube.position.z += (0.20 * zSpeed);

		if(collisionCheck(curCube)){
			gameOver = true;
			clearInterval(timer);
			break;	
		}

		// Once past the screen, regenerate cube in distance
		if(cubeArr[i].cube.position.z > arrow.position.z + 3){
			cubeArr[i].regenerate();
		}
	}

	// INVERTING COLORS
	console.log(currScore);
	if(currScore > 8000 && currScore < 16000){
		if(!alpha){
			scene.background = new THREE.Color( 0x000000 );
			currScoreDisplay.style.color = 'white';
			plane.color = "black";
			plane.material.color.setHex( 0x000000 );
			alpha = true;
		}

	}
	else{
		if(alpha){
			scene.background = new THREE.Color( 0xffffff );
			currScoreDisplay.style.color = "black";
			plane.material.color.setHex( 0xC8C8C8 );
			alpha = false;
		}
		
	}
	

	
	if(gameOver){

		scene.background = new THREE.Color( 0xffffff );
		currScoreDisplay.style.color = "black";
		plane.material.color.setHex( 0xC8C8C8 );
		while(scene.children.length > 0){ 
			scene.remove(scene.children[0]); 
		}
		
	
	}

	renderer.render( scene, camera );
	if(gameOver){
		// record high score, display current score on menu
		highScore = Math.max(currScore, highScore);
		currScoreDisplay.textContent = "Current Score: " + currScore;
		
		menu.style.visibility = 'visible';
		score.innerHTML='High Score: ' + highScore;

		scene.background = new THREE.Color( 0xffffff );
		currScoreDisplay.style.color = 'black';

		gameOver=false;
		cancelAnimationFrame(req);
		return;
	}
};


document.getElementById("startGameButton").addEventListener("click", initialize);

function keepScore() {
	currScore++;
	currScoreDisplay.textContent = currScore;

}

function increaseDifficulty() {
	zSpeed += .01;
}

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

