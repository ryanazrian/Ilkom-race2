using System.Collections;
using UnityEngine;

public class CarSelector : MonoBehaviour {

	public GameObject CCME;
	public GameObject SportChar;

	public int carSelected;

	void Start () {
		CCME.SetActive (true);
		SportChar.SetActive (false);

		carSelected = 0;
	}

	public void loadCC_ME ()
	{
		CCME.SetActive (true);
		SportChar.SetActive (false);

		carSelected = 1;
	}

	public void loadSportCaar ()
	{
		CCME.SetActive (false);
		SportChar.SetActive (true);

		carSelected = 2;
	}
}
 