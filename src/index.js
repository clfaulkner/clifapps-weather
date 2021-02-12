// SECTION todo's
// TODO delete unnecessary commented lines
// TODO dev loop to display 3-day data (consider for...of structure)


// * weather vars
// let temp = "Temperature = ",
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
let loCation = "Location: ", //location will be city,state combined
  LocalCntry="Country: ",
  forecastDate="Date: ",
  forecastDayMaxTemp="Max Temp: ",
  forecastDayMinTemp="Min Temp: ",
  forecastDayMaxWind="Wind: ",
  forecastDayHumid="Humidity: ",
  forecastDayRainChance="Rain Chance: ",
  forecastDaySnowChance="Snow Chance: ",
  forecastDayCndtnTxt="",
  forecastDayCndtnIcon="";

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
      document.getElementById("local").innerText = data.location.name;
      document.getElementById("desc").innerText = data.current.condition.text;
      // FIXME consider using CDN for icon
      // ?? icon is an image -- how to load into img tag?
      document.getElementById("icon").setAttribute("src", ico+data.current.condition.icon);
      // document.getElementById("temp-f").innerText = temp + Math.ceil(data.current.temp_f) + ' &#8457;';
      // document.getElementById("feelslike-f").innerText = butFeels + Math.ceil(data.current.feelslike_f) + " &#x2109;";
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

// ***************************************
// SECTION HTML constant
const webPage = `
  <div class="w3-modal-content w3-card-4 w3-round-large" style="max-width:500px; background-image: linear-gradient(black,darkblue,DeepSkyBlue);">
      <span class="w3-button w3-right w3-red" onclick="document.getElementById('three-day').style.display='none'" >&times;</span>
      <p class="w3-center details">City, State</p>
      <div class="w3-cell-row">
        <div class="w3-container w3-cell w3-cell-middle">
          <p class="details">Icon, description (left)</p>
        </div>
        <div class="w3-container w3-cell">
          <ul>
            <li class="details" style="list-style-type: none;">wind</li>
            <li class="details" style="list-style-type: none;">precip</li>
            <li class="details" style="list-style-type: none;">pressure</li>
            <li class="details" style="list-style-type: none;">temp</li>
          </ul>
        </div>
      </div>
      <p class="details">Day, Icon, Temp</p>
    </div>
  `

// FIXME update var value names to match return data
/* var forecast data guide
 * Daily details vars (repeats 3 x):
 * forecastDayCndtnIcon= forecast.forecastday[i].day.condition.icon
 * forecastDayCndtnTxt= forecast.forecastday[i].day.condition.text
 * localCity= location.name
 * LocalSt= location.region
 * LocalCntry= location.country
 * forecastDate= forecast.forecastday[i].date
 * forecastDayMaxTemp= forecast.forecastday[i].maxtemp_f
 * forecastDayMinTemp= forecast.forecastday[i].mintemp_f
 * forecastDayMaxWind= forecast.forecastday[i].maxwind_mph
 * forecastDayHumid= forecast.forecastday[i].avghumidity
 * forecastDayRainChance= forecast.forecastday[i].daily_chance_of_rain
 * forecastDaySnowChance= forecast.forecastday[i].daily_chance_of_snow
*/

// SECTION Get 3-day weather and details
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
  let url = api + apiKey + "&q=" + city + " " + st + "&days=3"
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (let i=0; i<3; i++){
        function getWeekDay(){
          let day = new Date(data.forecast.forecastday[index].date);
          let day2 = day.toUTCString()
          let day3 = day2.substr(0,3);
          let weekDay = day3.toUpperCase();
          return weekDay;
        }
        // CALL getWeekDay
        getWeekDay();
        console.log(data.forecast.forecastday[i].date + ' ' + data.forecast.forecastday[i].day.maxtemp_f);
        // SECTION div for details
        let div1= document.createElement("div");
          div1.className= "w3-center";
          div1.id= "deets";
        document.getElementById("three-day").appendChild(div1);
        let day= document.createElement("p");
          div1.className= "w3-center";
        document.getElementById("deets").appendChild(day);


      }
    })
  }

// CALL getDetails()
getDetails();