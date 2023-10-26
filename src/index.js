/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import './style.css';

var apiKey = 'rzbEZcwqrjbwZVofGMBowwRLvaOoEmOvbg8tn8vW' // Mars API Key

// https://api.nasa.gov/index.html for information about api

// Mission Manifest:
var name = "Curiosity"; // Name of the Rover
var launch_date = "2011-11-26"; // The Rover's landing date on Mars
var landing_date = "2012-08-05"; // The Rover's launch date from Earth
var status; // The Rover's mission status
var max_sol; // The most recent Martian sol from which photos exist
var max_date; // The most recent Earth date from which photos exist
var total_photos; // Number of photos taken by that Rover

var sol; // Martian sol of the Rover's mission
var total_photos; // Number of photos taken by that Rover on that sol
var cameras; // Cameras for which there are photos by that Rover on that sol

// Photo Queries 
var date = '2023-05-25' // YYYY-MM-DD format
var queryEarthDate = '&earth_date=' + date;
var sol = '1000' // 0 to 3986 (max atm)
var querSol = '&sol=' + sol;

var queryDate = queryEarthDate; // Stores which date format user chooses

var camera = 'NAVCAM'; // Selection: NAVCAM, MAHLI, PANCAM, MARDI, FHAZ, RHAZ, CHEMCAM, MINITES, MAST
var queryCamera = '&camera=' + camera
var queryPage = '1'; // 25 items per page


async function requestPhotos(){
  const img = document.querySelector('img');
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?page=${queryPage}${queryCamera}${queryDate}&api_key=${apiKey}`, {mode: 'cors'});
  
  const photosJson = await response.json();
  
  console.log(photosJson)
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

