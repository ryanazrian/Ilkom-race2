var CarControl : GameObject;
var DreamCar01 : GameObject;
var TimeManager : GameObject;

function Start(){
	CarControl.GetComponent("CarController1").enabled = true;	
	DreamCar01.GetComponent("CarAIControl").enabled = true;
	TimeManager.GetComponent("TimeManager").enabled = true;
}