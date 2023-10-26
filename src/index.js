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

async function requestPhotos(){
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${queryRover}/photos?page=${queryPage}${queryCamera}${queryDate}&api_key=${apiKey}`, {mode: 'cors'});
  
  const responseJson = await response.json();
  
  // Queried photos
  const photos = responseJson.photos;
  currPhotos = photos;

  // Update currMissionManifest
  const missionInfo = photos[0].rover;
  currMissionManifest = missionInfo;

  console.log(currPhotos);
  console.log(currMissionManifest);

  displayPhotos();
}

function displayPhotos(){
  const image = document.querySelectorAll(".photo");
  for(let i = 0; i < image.length; i++){
    image[i].src = currPhotos[i].img_src;
  }
}

function handleErrorRequest(fn){
  return function(queryDate){
    return fn(queryDate).catch(function(error){
      console.log(error)
    })
  }
}

const safeRequestPhotos = handleErrorRequest(requestPhotos);

safeRequestPhotos(queryDate);

