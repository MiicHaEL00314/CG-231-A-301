var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xDDDDDD, 1);
    document.body.appendChild(renderer.domElement);
    var scene = new THREE.Scene();

//Camara
var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.x = 10;
camera.position.z = 30;
camera.position.y = 10;
scene.add(camera);

//Luz
const light = new THREE.AmbientLight(0x404040, 5);
scene.add(light);


//Creación de malla
const size = 500;
const divisions = 100;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );


//Creación de ejes X,Y,Z
const axesHelper1 = new THREE.AxesHelper( 50 );
const axesHelper2 = new THREE.AxesHelper( -50 );
scene.add( axesHelper1,axesHelper2 )

/**
 * cubo: Generacion del objeto cubo
 * ENTRADAS: base= valor de la base del cubo
 *           altura= valor de la altura del cubo
 *           ancho= valor del ancho del cubo
 * SALIDAS:  objeto mesh
 */
function cubo(base, altura, ancho) {
    const geometry = new THREE.BoxGeometry(base, altura, ancho);
    const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
  }

var ArPil=[]; //Arreglo de cubos vacio
var L=10;

var x =new THREE.Vector3(1,0,0);
var y = new THREE.Vector3(0,1,0)
var z = new THREE.Vector3(0,0,1)
/**
 * gra_A_Rad: Transformacion de grados a radianes
 * ENTRADAS: grados= valor del grado que se quiere convertir
 * SALIDAS: el valor de grado convertido a radianes
 */
function gra_A_Rad(grados) {
  return grados * Math.PI / 180;
}

/*
//Valores para visualizacion de la imagen 1
var beta = gra_A_Rad(360);
var alpha = gra_A_Rad(90);
var gama = gra_A_Rad(90);
*/

//Valores para visualizacion de la imagen 2
var beta = gra_A_Rad(30);
var alpha = gra_A_Rad(25);
var gama = gra_A_Rad(-30);


var abertura = Math.PI - alpha;


//Generación de pilares
for(var i=0;i<2;i++){
    
    ArPil[i]=cubo(1, L, 1);
    ArPil[i].position.y=L/2;
    scene.add(ArPil[i]);    

}
/**
 * Traslacion: Traslacion del objeto
 * ENTRADAS: fig= objeto que se va a trasladar
 *           vx= valor a trasladar en el eje x
 *           vy= valor a trasladar en el eje y
 *           vz= valor a trasladar en el eje z
 * SALIDAS: 
 */

function Traslacion(fig, vx,vy,vz){
    
    fig.position.x=vx;
    fig.position.y=vy;
    fig.position.z=vz;
}

//Traslacion del pilar 2 para visualizacion imagen 2
Traslacion(ArPil[1],(5*L/24),(47*L/32),0);


/**
 * Rotacion: Rotacion del objeto dependiendo su eje y angulo
 * ENTRADAS: objeto= objeto el cual se quiere aplicar la rotacion
 *           eje= eje en el cual se rotara el objeto
 *           angulo= valor del angulo que se quiere realizar la rotacion
 * SALIDAS: 
 */

function Rotacion( objeto, eje, angulo) {
    
    const quaternion = new THREE.Quaternion(); //Representación de una rotación en three.js
    quaternion.setFromAxisAngle(eje, angulo);
    objeto.quaternion.multiply(quaternion); //Aplicacion de la rotación al objeto
}

//Rotacion del pilar 2 para visualizacion imagen 2
ArPil[1].rotation.z = abertura


const grupo = new THREE.Group();
//Añade las figuras al grupo
grupo.add(ArPil[0]);
grupo.add(ArPil[1]);
scene.add(grupo)

//Rotacion del grupo en el angulo beta y gama
Rotacion(grupo, z, -beta);
grupo.rotation.y += gama;

//Trasalcion para afinar la similitud con imagen 2
Traslacion(grupo,0,0.3,0)

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