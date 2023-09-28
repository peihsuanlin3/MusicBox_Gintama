var scene,camera,renderer;
var orbitcontrol;

scene = new THREE.Scene();

var loader = new THREE.FBXLoader();

loader.load( './model/test.fbx', (object) => {
    // object.traverse(function (child) {
    //     if ((child as THREE.Mesh).isMesh) {
    //         // (child as THREE.Mesh).material = material
    //         if ((child as THREE.Mesh).material) {
    //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
    //         }
    //     }
    // })
    //object.scale.set(.001, .001, .001)
    object.position.set(0,1,0);
    model = object;
    console.log(model);
    //mesh = object.children[0].clone();
    scene.add(model)
} );

//scene.add(new THREE.AxesHelper(50)); //坐標軸
//scene.add(new THREE.GridHelper(50,50)); //地面網格

var ambientLight = new THREE.AmbientLight(0xffffff,1);  //環境光(色光)
var directionLight = new THREE.DirectionalLight(0xffffff,0.5) //有方向、光澤
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
scene.add( light )
directionLight.position.set(1,1,1);
scene.add(ambientLight);
scene.add(directionLight);

const light2 = new THREE.PointLight( 0x1ae3ff, 1, 100 );
light2.position.set( 50, 50, 50 );
scene.add( light2 );

/*set up camera*/
camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
camera.position.set(0,10,50);
camera.lookAt(scene.position);

camera1 = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
camera1.position.set(0,10,10);
camera1.lookAt(scene.position);

camera2 = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
camera2.position.set(0,20,0);
camera2.lookAt(scene.position);

/*set up renderer*/
renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth,innerHeight); //畫布大小
renderer.setClearColor(0xD5F3F4);  //空場景色(背景色)
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement); //加入dom

//orbitcontrol = new THREE.OrbitControls( camera, renderer.domElement );

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
camera1.add( listener );
camera2.add( listener );
// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
function out(){
    fpcontrol = new THREE.FirstPersonControls(camera,renderer.domElement);
    fpcontrol.movementSpeed = 10;
    fpcontrol.lookSpeed = 0.05;
    fpcontrol.lookVertical = true;
    if(sound.isPlaying){sound.stop();}
    audioLoader.load( './music/銀魂OP1-Pray.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.1 );
        sound.play();
    });
    animate();
}
function one(){
    fpcontrol = new THREE.FirstPersonControls(camera1,renderer.domElement);
    fpcontrol.movementSpeed = 10;
    fpcontrol.lookSpeed = 0.05;
    fpcontrol.lookVertical = true;
    if(sound.isPlaying){sound.stop();}
    audioLoader.load( './music/銀魂-修羅.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.2 );
        sound.play();
    });
    animate1();
}
function two(){
    fpcontrol = new THREE.FirstPersonControls(camera2,renderer.domElement);
    fpcontrol.movementSpeed = 10;
    fpcontrol.lookSpeed = 0.05;
    fpcontrol.lookVertical = true;
    if(sound.isPlaying){sound.stop();}
    audioLoader.load( './music/銀魂ED10 - This world is yours.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.2 );
        sound.play();
    });
    animate2();
}
//window.addEventListener( 'resize', onWindowResize );
/*function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    fpcontrol.handleResize();

}*/

clock = new THREE.Clock();

/*let wheel = new THREE.Mesh(
    new THREE.TorusGeometry(0.75,0.25,16,32),
    new THREE.MeshLambertMaterial({
        color:0xffa14a
    })
) //甜甜圈原型

let yellow = new THREE.MeshPhongMaterial({
    color:0xffff00,
    specular:0x101010,
    shininess:16
})

let cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5,0.5,1.0,32,1),
    yellow
) //圓柱體原型
//scene.add(cylinder)

cylinder.scale.set(0.15,1.2,0.15); //CylinderGeometry(0.075,0.075,1.2,32,1)
wheel.add(cylinder.clone()); //新增複製物件至local
cylinder.rotation.z = Math.PI/3; //繞z軸轉60度
wheel.add(cylinder.clone());
cylinder.rotation.z = -Math.PI/3; //繞z軸轉-60度
wheel.add(cylinder.clone());
scene.add(wheel); //輪胎
console.log(wheel.getWorldPosition(new THREE.Vector3()))

box = new THREE.Mesh(
    new THREE.BoxGeometry(1.0,1.0,1.0,3,3),
    new THREE.MeshPhongMaterial({
        color: 0xff6666
        
    })
)
scene.add(box) //車體原型

let axleModel = new THREE.Object3D();
cylinder.scale.set(0.2,4.2,0.2); //CylinderGeometry(0.1,0.1,4.2,32,1)
cylinder.rotation.set(Math.PI/2,0,0);  //直接set，繞x軸轉90度
axleModel.add(cylinder); //輪軸
wheel.position.z = 2; //輪胎1
axleModel.add(wheel.clone());
console.log(axleModel.localToWorld(wheel.position))
wheel.position.z =-2;  //輪胎2
axleModel.add(wheel); //新增module本身
console.log(axleModel.localToWorld(wheel.position))
scene.add(axleModel); //輪胎+輪軸
//wheel.position.z = 0; 
//axleModel.position.z = -2

let axleModel2 = new THREE.Object3D();
axleModel2.add(axleModel.clone()); //第二組輪胎+輪軸

let car = new THREE.Object3D(); //車子組裝
axleModel2.position.x = 2;
car.add(axleModel2); //第一組輪
axleModel.position.x = -2;
car.add(axleModel); //第二組輪
box.scale.set(7.0,1.5,3.5);
car.add(box.clone()); //車體下
box.scale.set(4.0,1.2,3.5); 
box.position.y = 1.2; 
car.add(box); //車體上
scene.add(car);

let field = new THREE.Object3D(); //相對於world
car.position.set(0,2,35);
car.scale.set(2,2.5,2);
field.add(car);
scene.add(field);*/

var floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(500,500,20,20),
    new THREE.MeshLambertMaterial({
        color:0xeb6300
    })
)
floor.rotateX(-Math.PI/2);  //繞x軸旋轉-90度
scene.add(floor);

function animate(){
    //stats.update();
    //orbitcontrol.update();
    fpcontrol.update(clock.getDelta());
    requestAnimationFrame(animate); //function自動迴圈
    renderer.render(scene,camera);  //重新渲染
    /*field.rotation.y += 0.03;
    axleModel.rotation.z +=0.3;
    axleModel2.rotation.z +=0.3;*/
    if(animate1||animate2){return;}
}
out();

function animate1(){
    //stats.update();
    //orbitcontrol.update();
    fpcontrol.update(clock.getDelta());
    requestAnimationFrame(animate1); //function自動迴圈
    renderer.render(scene,camera1);  //重新渲染
    if(animate||animate2){return;}
}
function animate2(){
    //stats.update();
    //orbitcontrol.update();
    fpcontrol.update(clock.getDelta());
    requestAnimationFrame(animate2); //function自動迴圈
    renderer.render(scene,camera2);  //重新渲染
    if(animate1||animate){return;}
}

outButton = document.getElementById('outButton');
outButton.addEventListener('click',function(){
    out();
})

oneFButton = document.getElementById('1FButton');
oneFButton.addEventListener('click',function(){
    one();
})

twoFButton = document.getElementById('2FButton');
twoFButton.addEventListener('click',function(){
    two();
})