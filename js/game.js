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

var arrow = new THREE.Mesh(arrowGeo,  new THREE.MeshBasicMaterial({color: 0x897afa}));
const arrowEdgeGeo = new THREE.EdgesGeometry( arrowGeo );
const arrowEdgeMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
arrow.add( new THREE.LineSegments( arrowEdgeGeo, arrowEdgeMaterial ) );


arrow.position.y=-0.5;
arrow.position.z=-5;


scene.add(arrow);

// Testing with 20 cubes
var numCubes = 20;
var cubeArr = [];

var leftPressed = false;
var rightPressed = false;
var cameraStraight = true;

var arrowStraight = true;

var collidableObjects = [];

// creat cubes and populate collidableObjects
for(var i = 0; i < numCubes; i++){
	cubeArr[i] = new Cube(scene);
}

collidableObjects.push(arrow);


camera.position.y = 2;

var menu = document.getElementById("menu");
var score = document.getElementById('highscore');
score.innerHTML='High Score: 0';

const animate = function () {
	
	menu.style.visibility = 'hidden';
	requestAnimationFrame( animate );

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
			cubeArr[i].cube.position.x += 0.50;
		}
	}
	else if(rightPressed){
		for(var i = 0; i < numCubes; i++){
			cubeArr[i].cube.position.x -= 0.50;
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
		curCube.position.z += 0.10;

		var cube_bbox = new THREE.Box3();
		cube_bbox.setFromObject( curCube );

		// cube_height = cube_bbox.max.y - cube_bbox.min.y;
		// cube_width = cube_bbox.max.x - cube_bbox.min.x;
		// cube_depth = cube_height = cube_bbox.max.z - cube_bbox.min.z;
		
		// console.log(cube_height, cube_width, cube_depth);

		if(arrow.position.y<=cube_bbox.max.y && arrow.position.y>=cube_bbox.min.y && 
			arrow.position.x<=cube_bbox.max.x && arrow.position.x>=cube_bbox.min.x &&
			arrow.position.z<=cube_bbox.max.z && arrow.position.z>=cube_bbox.min.z 
			){
				alert('Collision!');
			}
	
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

