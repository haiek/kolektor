<?php

//********** HEADERS *********

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

//********** INCLUDE CLASSES *********

include "classes.php";

//********** GET POST VARIABLES *********

$_POST = array_map(trim,$_POST);
extract($_POST);

//********** FUNCTION *********

if($fun == "getFourMostView") {

	$getData = new GetPodcast();
	$getData -> getFourMostView();
	$getData -> getResults();

}

if($fun == "getSearchByTitle") {

	$getData = new GetPodcast();
	$getData -> getSearchByTitle($imput);
	$getData -> getResults();

}

if($fun == "getWizardResults") {

	$getData = new GetPodcast();
	$getData -> getWizard($moodID, $feelingID, $lenght);
	$getData -> getResults();

}

if($fun == "getCategoriesResults") {

	$getData = new GetPodcast();
	$getData -> getCategoriesSearch($categoryID);
	$getData -> getResults();

}

if($fun == "getCategories") {

	$getData = new GetTable();
	$getData -> getCategories();
	$getData -> getResults();

}

if($fun == "getMoods") {

	$getData = new GetTable();
	$getData -> getMoods();
	$getData -> getResults();

}

if($fun == "getFeelings") {

	$getData = new GetTable();
	$getData -> getFeelings();
	$getData -> getResults();

}

if($fun == "getFeed") {

	$getData = new GetPodcast();
	$getData -> getFeed();
	$getData -> getResults();

}

?>