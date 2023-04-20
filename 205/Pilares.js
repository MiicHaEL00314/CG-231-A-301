var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xDDDDDD, 1);
    document.body.appendChild(renderer.domElement);
    var scene = new THREE.Scene();

//Camara
var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.x = 5;
camera.position.z = 30;
camera.position.y = 5;
scene.add(camera);

//Luz
const light = new THREE.AmbientLight(0x404040, 5);
scene.add(light);



//Creación de malla
const size = 1000;
const divisions = 1000;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

//Creación de ejes X,Y,Z
const axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper )


function cubo(base, altura, ancho) {
    const geometry = new THREE.BoxGeometry(base, altura, ancho);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
  }

var ArPil=[];

//Generación de pilares
for(var i=0;i<2;i++){
  
    var L=10;
    
    ArPil[i]=cubo(1, L, 1);
    ArPil[i].position.y=L/2;    

}

function Traslacion(fig, vx,vy,vz){
    
    fig.position.x=vx;
    fig.position.y=vy;
    fig.position.z=vz;
}

Traslacion(ArPil[1],1,L+L/2,0);

Traslacion(ArPil[0],L/4,L/2,L/4)

function Rotacion(fig,alpha,beta,gamma){
    fig.rotation.x=alpha
    fig.rotation.y=beta
    fig.rotation.z=gamma
}


ArPil[0].rotation.x = 30*(Math.PI/180)

ArPil[0].rotation.z = -30*(Math.PI/180)



const group = new THREE.Group();

for (i = 0; i < 2; i++) {
  group.add(ArPil[i]);
}
scene.add(group);



const controls = new THREE.OrbitControls(camera, renderer.domElement);

/**
 * animate: Renderizado del programa
 * ENTRADAS: 
 * SALIDAS: 
 */
function animate() {

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera)
}
animate();