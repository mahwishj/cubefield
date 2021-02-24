
//THIS IS JUST ME PLAYING AROUND WITH CUBES, WILL MAKE A CLEAN CUBE CLASS SOON

// SET UP SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
//const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setClearColor(0xffffff, 0);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// CREATE A CUBE GEOMETRY, FILL MATERIAL
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xa176d6 } );
const cube = new THREE.Mesh( geometry, material );

// CREATE EDGE GEOMETRY, LINE MATERIAL, ADD TO CUBE
var edgeGeo = new THREE.EdgesGeometry( cube.geometry ); // or WireframeGeometry
var edgeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
var edges = new THREE.LineSegments( edgeGeo, edgeMaterial );
cube.add( edges );   
            
//cube.position.x = -20;


scene.add( cube );

// SETTING CUBE IN A DISTANCE, CAMERA LOOKING FROM A LITTLE ABOVE
cube.position.z = -30;
camera.position.y = 2;


const animate = function () {
	requestAnimationFrame( animate );
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
    cube.position.z += 0.10;      // CUBE MOVES CLOSER          

	renderer.render( scene, camera );
};

animate();

