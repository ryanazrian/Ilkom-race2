using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelLoader : MonoBehaviour {

	GameObject menu_Canvas;
	GameObject setting_Canvas;

	void Start () {

		menu_Canvas = GameObject.Find ("MainMenu_Canvas");
		setting_Canvas = GameObject.Find ("Setting_Canvas");

		setting_Canvas.SetActive (false);
		menu_Canvas.SetActive (true);
	}

	public void LoadLevel (int a)
	{
		Application.LoadLevel (a);
	}

	public void Quit()
	{
		Application.Quit ();
	}

	public void loadMenu ()
	{
		menu_Canvas.SetActive (true);
		setting_Canvas.SetActive (false);
	}

	public void loadSettings ()
	{
		menu_Canvas.SetActive (false);
		setting_Canvas.SetActive (true);	
	}
}
