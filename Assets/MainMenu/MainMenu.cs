using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Main1Menu : MonoBehaviour {

	public void PlayGame ()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

	public void SelectCar ()
	{
		SceneManager.LoadScene (SceneManager.GetActiveScene().buildIndex + 1);
	} 

	/*
	public void HowToPlay ()
	{
	
	} */
	
    public void QuitGame()
    {
        Debug.Log("QUIT!");
        Application.Quit();
    } 
}
