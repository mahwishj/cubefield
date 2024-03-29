const fillMaterials = [
    new THREE.MeshBasicMaterial( { color: 0x264e86 } ),
    new THREE.MeshBasicMaterial( { color: 0x5e88fc } ),
    new THREE.MeshBasicMaterial( { color: 0x74dbef } )
]
const edgeMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );

const cubeGeo = new THREE.BoxGeometry();
const edgeGeo = new THREE.EdgesGeometry( cubeGeo );


class Cube{
    constructor(scene){
        var fillIndex = Math.floor(Math.random() * 3) - 0;
        this.cube = new THREE.Mesh( cubeGeo, fillMaterials[fillIndex] );
        this.cube.add( new THREE.LineSegments( edgeGeo, edgeMaterial ) );

        //random x position (-100 to 100)
        this.cube.position.x = Math.floor(Math.random() * 161) - 80;
        
        //random z position (-25 to -30)
        this.cube.position.z = (Math.floor(Math.random() * 30) + 25) * -1; 
        scene.add(this.cube);
    }

    // UPDATES CUBES POSITION WITH A RANDOM X AND Z
    regenerate(){
        this.cube.position.x = Math.floor(Math.random() * 161) - 80;
        this.cube.position.z = (Math.floor(Math.random() * 30) + 25) * -1; 
        return true;;
    }
}