#pragma strict
///Script originaly written by Arvydas Andrius
var lnitro : GameObject; // Nitro effect, place particle effect of fire from exoust as children of your car.
var rnitro : GameObject; // Nitro effect, place particle effect of fire from exoust as children of your car.
private var NosPoints : float = 100; // capacity of nitro tank
private var MaxNosPoints = 100; //should be same as NosPoints
var nosRefilRate : float= 0.03; // how fast nitro vill refill
var nosUseRate : float = 30;  //how fast nitro will use
private var NitroBoost = false; // nitro is false at begining
private var engine = false; // car engine (if A is preseed = true but not affiliate with real car engine)
var NitroSound_spray: AudioClip; // nitro sound when its just spraying without boost car speed
var NitroSound: AudioClip; // audio clip of nitro sound
var zoom : int = 100; //amount of camera zoom out, smaller value = zoom in, larger value = zoom in.
var normal : int = 60; //a defould field of wiev of the camera attacked to car.
var smooth : float = 2; //smooth/speed of camera zooming.
var NitroPower = 50.0; // the amount of directional force thats nitro will give
private var applyForce = false;
var shakey : float =0.01;
var shakex : float =-0.01;
 /////////////// 
 var Cam: Transform; // camare too shake.
 var CamNeutralPosition: Vector3; // its automaticly set a defoult postition of camera.
///////////////////////////////////// 
public var fadeOutTexture : Texture2D;
public var fadeSpeed = 0.3;
var drawDepth = -1000;
private var alpha = 1.0; 
private var fadeDir = -1;


function Start () {
CamNeutralPosition = Cam.transform.localPosition; // its automaticly set a defoult postition of camer
alpha=1;
fadeIn();
}
 

function Update () {

if (Input.GetKey(KeyCode.W)){
	  engine = true; // if W is hloding on keyboard that means car engine is working.
}

else{
	  engine = false; // else if W is not holding, that means car engine if off.
}


// nitro will boost if Shift is pressed, engine is working and nitro tank is not emty
if (Input.GetKey(KeyCode.LeftShift) && NosPoints >= 1 && engine == true){
      { 
    if(!GetComponent.<AudioSource>().isPlaying) // play audio when nitro is enabled.
    {
      GetComponent.<AudioSource>().PlayOneShot(NitroSound); 
      GetComponent.<AudioSource>().Play(); 
    }
  }
  NitroBoost = true;
     }
///nitro wont boost if shift is not pressed, engine off or nitro tank is emty.
else if (Input.GetKeyUp(KeyCode.LeftShift) || NosPoints <= 1 ||engine == false){ 
      NitroBoost = false;
      GetComponent.<AudioSource>().Stop(); // stop audio when niro is disabled.
      }
if ( NitroBoost == false ){ // if nitro is false
      lnitro.GetComponent.<Renderer>().enabled = false; //no nitro effect
      rnitro.GetComponent.<Renderer>().enabled = false;
      applyForce = false;
      //EngineTorque = EngineWithoutNitroTorque;

}
else if ( NitroBoost == true){
	  applyForce = true;
	  NosPoints = Mathf.Clamp(NosPoints - (nosUseRate * Time.deltaTime), 0, 100); // calculate nitro usage.
	  lnitro.GetComponent.<Renderer>().enabled = true; // nitro effect is true.
      rnitro.GetComponent.<Renderer>().enabled = true; 
  
     //camera will shake when nitro is true
     }
if ( NitroBoost == true && Camera.main.fieldOfView){
	  Camera.main.fieldOfView = Mathf.Lerp(Camera.main.fieldOfView,zoom,Time.deltaTime*smooth); // will zoom camera if nitro is on.
	  var randNrX = Random.Range(shakey,shakex);
	  var randNrY = Random.Range(shakey,shakex);
	  //var randNrZ = Random.Range(0.1,-0.1);
	  Cam.transform.position += Vector3(randNrX,randNrY);
	  
	  

    
}
else if ( NitroBoost == false && Camera.main.fieldOfView){


	  Cam.transform.localPosition = Vector3.Lerp(Cam.transform.localPosition, CamNeutralPosition, Time.deltaTime); // vill bring back camera to original postiotn after shake
	  Camera.main.fieldOfView = Mathf.Lerp(Camera.main.fieldOfView,normal,Time.deltaTime*smooth); // will zoom back camera when nitro is off.
}
 

 
 // these lines will calculate reffil of nitro tank
if (NitroBoost == false && NosPoints <= MaxNosPoints){



 	  NosPoints += nosRefilRate + 0.05 / Mathf.Clamp(1 + (nosRefilRate * Time.deltaTime), 0, 100);
}
else {
//else do nothing
}
} // end of function update

function OnGUI() { //nitro bar
{ 
GUI.color = Color.black; // color of nitro bar
GUI.Button(Rect(800,Screen.height-385, NosPoints * 1.5,10), ""); // position and size of nitro bar
}
	alpha += fadeDir * fadeSpeed * Time.deltaTime;	
	alpha = Mathf.Clamp01(alpha);	
	GUI.color.a = alpha;
	GUI.depth = drawDepth;
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), fadeOutTexture);
if ( NitroBoost == true){

fadeOut();

}
else if ( NitroBoost == false){
fadeIn();
}
}
function fadeIn(){
	fadeDir = -1;	
}
function fadeOut(){
	fadeDir = 1;	
}
/// lines thats calculate the speed boost of nitro and direction car will be speeded up.
function FixedUpdate() {
    if (applyForce) {
        GetComponent.<Rigidbody>().AddForce(Camera.main.transform.forward * NitroPower);
    }
}
