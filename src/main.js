// SECTION todo's
// TODO delete unnecessary commented lines
// TODO consider using 1 load function

// * weather vars
let temp = "Temp (F): ",
  butFeels = "Feels like (F): ",
  wind = "Wind speed (MPH): ",
  gust = "Wind gusts: ",
  dir = "Wind Direction: ",
  hum = "Humidity = ",
  city = "moorhead",
  st = "mn",
  ico = "https:";

// detail weather vars
let loCation = "Location: ", //location will be city,state combined -- unused for now
  LocalCntry="Country: ",
  forecastDate="Date: ",
  forecastDayMaxTemp="Max Temp(F): ",
  forecastDayMinTemp="Min Temp(F): ",
  forecastDayMaxWind="Wind(MPH): ",
  forecastDayHumid="Humidity: ",
  forecastDayRainChance="Rain Chance: ",
  forecastDaySnowChance="Snow Chance: ";

// SECTION: Set initial city, st or get current from store
function store(){
  if(localStorage.getItem('city')===null){
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

// ***************************************
// SECTION: fetch current weather
function getWthr(){
  // declare vars
  let api= "https://api.weatherapi.com/v1/current.json?key=7d94c74d88d147c89f5150101201806&q=";
  let url= api+city+' '+st;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("local").innerText = data.location.name;
      document.getElementById("desc").innerText = data.current.condition.text;
      document.getElementById("icon").setAttribute("src", ico+data.current.condition.icon);
      document.getElementById("temp-f").innerText = temp + Math.ceil(data.current.temp_f);
      document.getElementById("feelslike-f").innerText = butFeels + Math.ceil(data.current.feelslike_f);
      document.getElementById("wind-mph").innerText = wind + Math.ceil(data.current.wind_mph);
      document.getElementById("gust-mph").innerText = gust + Math.ceil(data.current.gust_mph);
      document.getElementById("wind-dir").innerText = dir + data.current.wind_dir;
      document.getElementById("humidity").innerText = hum + Math.ceil(data.current.humidity);
    })
}

// CALL getWthr
getWthr()

// ***************************************
//SECTION change location and set in storage
function changeWthr(){
  city=document.getElementById('change-city').value;
  st=document.getElementById('change-st').value;
  localStorage.setItem('city',city);
  localStorage.setItem('st',st);
}

// *************************************
/* var forecast data guide
 * Daily details vars (repeats 3 x):
 *  forecastDayCndtnIcon= data.forecast.forecastday[i].day.condition.icon
 *  forecastDayCndtnTxt= data.forecast.forecastday[i].day.condition.text
 *  localCity= data.location.name
 *  LocalSt= data.location.region
 *  LocalCntry= data.location.country
 *  forecastDate= data.forecast.forecastday[i].date
 *  forecastDayMaxTemp= data.forecast.forecastday[i].day.maxtemp_f
 *  forecastDayMinTemp= data.forecast.forecastday[i].day.mintemp_f
 *  forecastDayMaxWind= data.forecast.forecastday[i].day.maxwind_mph
 *  forecastDayHumid= data.forecast.forecastday[i].day.avghumidity
 *  forecastDayRainChance= data.forecast.forecastday[i].day.daily_chance_of_rain
 *  forecastDaySnowChance= data.forecast.forecastday[i].day.daily_chance_of_snow
*/

// ***************************************
// SECTION Get 3-day weather and details
function getDetails(){
  // declare vars
  let api = "https://api.weatherapi.com/v1/forecast.json?key="
  let apiKey = "7d94c74d88d147c89f5150101201806";
  let url = api + apiKey + "&q=" + city + " " + st + "&days=3"
// SECTION get 3-day forecast
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // divs to create row and cells for details
      let div1= document.createElement("div");
        div1.className= "w3-center deets";
        div1.id= "deets";
        document.getElementById("three-day").appendChild(div1);
      // NOTE for... statement to populate 3-day forecast
      for (let i=0; i<3; i++){
        // get and format weekday
        let day = new Date(data.forecast.forecastday[i].date);
        let day2 = day.toUTCString()
        let day3 = day2.substr(0,3);
        let weekDay = day3.toUpperCase();
        weekDay += "  "+ data.forecast.forecastday[i].date
        // Forecast details **********************
        let days= document.createElement("p");
          days.innerText= weekDay;
          document.getElementById("deets").appendChild(days);
        let wIcon= document.createElement("img");
          wIcon.src= ico+data.forecast.forecastday[i].day.condition.icon;
          document.getElementById("deets").appendChild(wIcon);
        let cdnt= document.createElement("p");
          cdnt.innerText= data.forecast.forecastday[i].day.condition.text;
          document.getElementById("deets").appendChild(cdnt);
        let maxt= document.createElement("p");
          maxt.innerText= forecastDayMaxTemp+ Math.ceil(data.forecast.forecastday[i].day.maxtemp_f);
          document.getElementById("deets").appendChild(maxt);
        let minT= document.createElement("p");
          minT.innerText= forecastDayMinTemp+ Math.ceil(data.forecast.forecastday[i].day.mintemp_f);
          document.getElementById("deets").appendChild(minT);
        let wind= document.createElement("p");
          wind.innerText= forecastDayMaxWind+ Math.ceil(data.forecast.forecastday[i].day.maxwind_mph);
          document.getElementById("deets").appendChild(wind);
        let rain= document.createElement("p");
          rain.innerText= forecastDayRainChance+ data.forecast.forecastday[i].day.daily_chance_of_rain;
          document.getElementById("deets").appendChild(rain);
        let snow= document.createElement("p");
          snow.innerText= forecastDaySnowChance+ data.forecast.forecastday[i].day.daily_chance_of_snow;
          document.getElementById("deets").appendChild(snow);
        let hr= document.createElement("hr");
          document.getElementById("deets").appendChild(hr);
      }
    })
  }

// CALL getDetails()
getDetails();