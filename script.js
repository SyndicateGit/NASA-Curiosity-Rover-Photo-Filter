var apiKey = 'rzbEZcwqrjbwZVofGMBowwRLvaOoEmOvbg8tn8vW' // Mars API Key

var name;
var launch_date;
var landing_date;
var status;
var max_sol;
var max_date;
var total_photos;

var queryDate = '2023-05-25' // YYYY-MM-DD format
var querySol = '1000' // 0 to 3986 (max)
var queryCamera;
var queryPage;

// Mast and chem cam kinda sucks
// Nav cam is good

async function requestPhotos(queryDate){
  const img = document.querySelector('img');
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${queryDate}&api_key=${apiKey}`, {mode: 'cors'});
  
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

