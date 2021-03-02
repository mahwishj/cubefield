
const fillMaterial = new THREE.MeshBasicMaterial( { color: 0xa176d6 } ); // WE CAN HAVE AN ARRAY OF MATERIALS FOR MORE COLORS
const edgeMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );

const cubeGeo = new THREE.BoxGeometry();
const edgeGeo = new THREE.EdgesGeometry( cubeGeo );


class Cube{
    constructor(scene){
        this.cube = new THREE.Mesh( cubeGeo, fillMaterial );
        this.cube.add( new THREE.LineSegments( edgeGeo, edgeMaterial ) );

        //random x position (-36 to 36)
        this.cube.position.x = Math.floor(Math.random() * 72) - 36;
        
        //random z position (-20 to -30)
        this.cube.position.z = Math.floor(Math.random() * -30) - 25; 
        console.log(this.cube.position.x);
        console.log(this.cube.position.z);
        scene.add(this.cube);
    }
}