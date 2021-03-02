const fillMaterials = [
    new THREE.MeshBasicMaterial( { color: 0xb9976e } ),
    new THREE.MeshBasicMaterial( { color: 0x382118 } ),
    new THREE.MeshBasicMaterial( { color: 0x613c27 } )
]
const edgeMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );

const cubeGeo = new THREE.BoxGeometry();
const edgeGeo = new THREE.EdgesGeometry( cubeGeo );


class Cube{
    constructor(scene){
        var fillIndex = Math.floor(Math.random() * 3) - 0;
        this.cube = new THREE.Mesh( cubeGeo, fillMaterials[fillIndex] );
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