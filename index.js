// * weather vars
let temp = "Temperature = ",
  butFeels = "Feels like: ",
  wind = "Wind speed (MPH): ",
  gust = "Wind gusts: ",
  dir = "Wind Direction: ",
  hum = "Humidity = ",
  city = "moorhead",
  st = "mn";

store();

//* Set initial city, st or get current from store
// function store(city,st){
function store(){
  if(localStorage.getItem('city')===null){
    // todo: test what heppens when st=values & city=null
      localStorage.setItem('city',city);
      localStorage.setItem('st',st);
    }
    else {
      city=localStorage.getItem('city');
      st=localStorage.getItem('st');
    }
    return city,st
}

//* call getWthr
getWthr()

// * fetch weather and details
function getWthr(){
  // declare vars
  let api = "https://api.weatherapi.com/v1/current.json?key="
  let apiKey = "7d94c74d88d147c89f5150101201806";
  // let zip = "&q=56560";
  let url = api +
    apiKey + "&q=" +
    // city + " " + st
    city + " " + st
    // zip
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("local").innerHTML = data.location.name;
      document.getElementById("desc").innerHTML = data.current.condition.text;
// ! icon will not be used due to file size
      // document.getElementById("icon").innerHTML = data.location.name;
      document.getElementById("temp-f").innerHTML = temp + data.current.temp_f + " &#x2109;";
      document.getElementById("feelslike-f").innerHTML = butFeels + data.current.feelslike_f + " &#x2109;";
      document.getElementById("wind-mph").innerHTML = wind + data.current.wind_mph;
      document.getElementById("gust-mph").innerHTML = gust + data.current.gust_mph;
      document.getElementById("wind-dir").innerHTML = dir + data.current.wind_dir;
      document.getElementById("humidity").innerHTML = hum + data.current.humidity;
    })
}

//* change location and set in storage
function changeWthr(){
  city=document.getElementById('change-city').value;
  st=document.getElementById('change-st').value;
  localStorage.setItem('city',city);
  localStorage.setItem('st',st);
  // getWthr();
}

//* Get new weather and details
