// SECTION todo's
// TODO delete unnecessary commented lines


// * weather vars
let temp = "Temperature = ",
  butFeels = "Feels like: ",
  wind = "Wind speed (MPH): ",
  gust = "Wind gusts: ",
  dir = "Wind Direction: ",
  hum = "Humidity = ",
  city = "moorhead",
  st = "mn";

// detail weather vars
let localCity = "",
  LocalSt="",
  LocalCntry="",
  forecastDate="",
  forecastDayMaxTemp="",
  forecastDayMinTemp="",
  forecastDayMaxWind="",
  forecastDayHumid="",
  forecastDayRainChance="",
  forecastDaySnowChance="",
  forecastDayCndtnTxt="",
  forecastDayCndtnIcon="";



// SECTION: Set initial city, st or get current from store
// function store(city,st){
function store(){
  if(localStorage.getItem('city')===null){
    // todo: test what heppens when st=values & city=null
      localStorage.setItem('city', city);
      localStorage.setItem('st', st);
    }
    else {
      city=localStorage.getItem('city');
      st=localStorage.getItem('st');
    }
    return city,st
}

// CALL store()
store();

// SECTION: fetch weather and details
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
// FIXME consider using CDN for icon
      // document.getElementById("icon").innerHTML = data.location.name;
      document.getElementById("temp-f").innerHTML = temp + data.current.temp_f + " &#x2109;";
      document.getElementById("feelslike-f").innerHTML = butFeels + data.current.feelslike_f + " &#x2109;";
      document.getElementById("wind-mph").innerHTML = wind + data.current.wind_mph;
      document.getElementById("gust-mph").innerHTML = gust + data.current.gust_mph;
      document.getElementById("wind-dir").innerHTML = dir + data.current.wind_dir;
      document.getElementById("humidity").innerHTML = hum + data.current.humidity;
    })
}

// CALL getWthr
getWthr()

//SECTION change location and set in storage
function changeWthr(){
  city=document.getElementById('change-city').value;
  st=document.getElementById('change-st').value;
  localStorage.setItem('city',city);
  localStorage.setItem('st',st);
}

// SECTION Get new weather and details
// psuedo code
// fetch data
// then convert to json
// then manipulate data
//    let dayCount = TODAYS DATE + 3
//    for forecast.forecastday.date < dayCount
//      populate forecast vars
//    create template
//    insert template into DOM
function getDetails(){
  // declare vars
  // TODO consider using vars already in getWthr()
  let api = "https://api.weatherapi.com/v1/forecast.json?key="
  let apiKey = "7d94c74d88d147c89f5150101201806";
  let url = api +
    apiKey + "&q=" +
    city + " " + st +
    "&days=3"
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
  }

// CALL getDetails()
getDetails();

// SECTION HTML constant
// const webPage = ``

// FIXME update var value names to match return data
/* var data guide
 * Daily details vars (repeats 3 x):
 * forecastDayCndtnIcon= forecast.forecastday.day.condition.icon
 * forecastDayCndtnTxt= forecast.forecastday.day.condition.text
 * localCity= location.name
 * LocalSt= location.region
 * LocalCntry= location.country
 * forecastDate= forecast.forecastday[x].date
 * forecastDayMaxTemp= forecast.forecastday.maxtemp_f
 * forecastDayMinTemp= forecast.forecastday.mintemp_f
 * forecastDayMaxWind= forecast.forecastday.maxwind_mph
 * forecastDayHumid= forecast.forecastday.avghumidity
 * forecastDayRainChance= forecast.forecastday.daily_chance_of_rain
 * forecastDaySnowChance= forecast.forecastday.daily_chance_of_snow
*/