using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityStandardAssets.Vehicles.Car;

public class RaceFinish : MonoBehaviour {

	public GameObject MyCar;
	public GameObject FinishCube;
	public GameObject ViewModes;
	//public AudioSource FinishMusic;

	void OnTriggerEnter () {
		MyCar.SetActive (false);
		CarController.m_Topspeed = 0.0f;
		MyCar.GetComponent<CarController1> ().enabled = false;
		MyCar.GetComponent<CarUserControl> ().enabled = false;
		MyCar.SetActive (true);
		FinishCube.SetActive (true);
		ViewModes.SetActive (false);
		//FinishMusic.Play ();
	}
}
