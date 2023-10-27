/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */

import './style.css';

var apiKey = 'rzbEZcwqrjbwZVofGMBowwRLvaOoEmOvbg8tn8vW' // Mars API Key

// https://api.nasa.gov/index.html for information about api

// Photo Queries to test, replace with form submit later
var queryRover = 'curiosity'; // Only curiosity atm
var queryEarthDate =  '2023-05-27';

var queryDate = queryEarthDate; // Stores which date format user chooses

var queryCamera = 'NAVCAM'
var queryPage = '1'; // 25 items per page


// Current Photos and Mission Manifest Objects
var currPhotos;
var currMissionManifest;

async function requestPhotos(){
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${queryRover}/photos?page=${queryPage}&camera=${queryCamera}&earth_date=${queryDate}&api_key=${apiKey}`, {mode: 'cors'});
  
  const responseJson = await response.json();
  
  // Queried photos
  const photos = await responseJson.photos;
  currPhotos = await photos;
  
  if(currPhotos.length == 0){
    document.querySelector(".error-message").classList.remove("hidden");
    document.querySelector(".photo-gallery").classList.add("hidden");
    return;
  } 
  
  document.querySelector(".error-message").classList.add("hidden");
  document.querySelector(".photo-gallery").classList.remove("hidden");
  
  console.log(photos);

  const missionInfo = await currPhotos[0].rover;
  currMissionManifest = await missionInfo;
  // Updates mission manifest on firs load
  // if(currMissionManifest == undefined){
  //   const missionInfo = await currPhotos[0].rover;
  //   currMissionManifest = await missionInfo;
  // }


  console.log(currMissionManifest);

  displayPhotos();
  setDateBounds();
}

function displayPhotos(){
  const image = document.querySelectorAll(".photo");
  for(let i = 0; i < 25; i++){
    image[i].src = currPhotos[i].img_src;
  }
}

function setDateBounds(){
  const inputDate = document.querySelector("#date")
  const max_date = currMissionManifest.max_date;
  console.log(max_date)
  inputDate.value = max_date;
  inputDate.attributes.max.value = max_date;
}

function handleErrorRequest(fn){
  return function(queryDate){
    return fn(queryDate).catch(function(error){
      console.log(error)
    })
  }
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


const submit = document.querySelector("#submit");
submit.addEventListener("click", function(e){
  // Prevent default submit
  e.preventDefault;

  queryCamera = document.getElementById("camera").value;

  queryDate = document.getElementById("date").value;

  queryPage = document.getElementById("page").value;

  requestPhotos();
})


generateImageElements();

requestPhotos();


