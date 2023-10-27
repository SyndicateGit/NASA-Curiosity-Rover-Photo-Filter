/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */

import './style.css';

var apiKey = 'rzbEZcwqrjbwZVofGMBowwRLvaOoEmOvbg8tn8vW' // Mars API Key

// https://api.nasa.gov/index.html for information about api

// Photo Queries to test, replace with form submit later
var queryRover = 'curiosity'; // Only curiosity atm
var date = '2023-05-27' // YYYY-MM-DD format
var queryEarthDate = '&earth_date=' + date;
var sol = '1000' // 0 to 3986 (max atm)
var querSol = '&sol=' + sol;
var queryDate = queryEarthDate; // Stores which date format user chooses
var camera = 'NAVCAM'; // Selection: NAVCAM, MAHLI, PANCAM, MARDI, FHAZ, RHAZ, CHEMCAM, MINITES, MAST
var queryCamera = '&camera=' + camera
var queryPage = '1'; // 25 items per page


// Current Photos and Mission Manifest Objects
var currPhotos;
var currMissionManifest;

async function requestPhotos(queryPage, queryCamera, queryDate){
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${queryRover}/photos?page=${queryPage}${queryCamera}${queryDate}&api_key=${apiKey}`, {mode: 'cors'});
  
  const responseJson = await response.json();
  
  // Queried photos
  const currPhotos =  await responseJson.photos;


  console.log(currPhotos);

  // Updates mission manifest on firs load
  if(currMissionManifest == undefined){
    const missionInfo =  currPhotos[0].rover;
    currMissionManifest =  missionInfo;
  }
  
  const image = document.querySelectorAll(".photo");
  for(let i = 0; i < 25; i++){
    image[i].src = await currPhotos[i].img_src;
  }

  const inputDate = document.querySelector("#date")
  const max_date = await currMissionManifest.max_date;

  inputDate.value = max_date;
  inputDate.attributes.max.value = max_date;
}


// DOM Functions

function generateImageElements(){
  const photoGallery = document.querySelector(".photo-gallery");
  for(let i = 0; i < 25; i++){
    const image = document.createElement("img");
    image.classList.add("photo");
    photoGallery.appendChild(image);
  }
}


document.querySelector("#submit").onclick = () => {
  submitForm();
  requestPhotos(queryPage, queryCamera, queryDate);
};


function submitForm(){
  queryCamera = document.getElementById("camera").value;
  
  queryDate = document.getElementById("date").value;
  
  queryPage = document.getElementById("page").value;

}


generateImageElements();

requestPhotos(queryPage, queryCamera, queryDate);


