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
let forecastDay = "",
  // loCation = "Location: ", //location will be city,state combined
  // LocalCntry="Country: ",
  forecastDate="Date: ",
  forecastDayMaxTemp="Max Temp(F): ",
  forecastDayMinTemp="Min Temp(F): ",
  forecastDayMaxWind="Wind(MPH): ",
  forecastDayHumid="Humidity: ",
  forecastDayRainChance="Rain Chance: ",
  forecastDaySnowChance="Snow Chance: ",
  forecastDayCndtnTxt="",
  forecastDayCndtnIcon="https:";

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
  let api = "https://api.weatherapi.com/v1/current.json?key=7d94c74d88d147c89f5150101201806"
  let url = api + "&q=" + city + " " + st
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
// const webPage = `
// <p class="w3-center details">Weekday</p>
// <div class="w3-cell-row">
//   <div class="w3-container w3-cell w3-cell-middle">
//     <p class="details">Icon, description (left)</p>
//   </div>
//   <div class="w3-container w3-cell">
//     <ul>
//       <li class="details" style="list-style-type: none;">wind</li>
//       <li class="details" style="list-style-type: none;">precip</li>
//       <li class="details" style="list-style-type: none;">pressure</li>
//       <li class="details" style="list-style-type: none;">temp</li>
//     </ul>
//   </div>
// </div>
// <p class="details">Day, Icon, Temp</p>
// `


// FIXME update var value names to match return data
/* var forecast data guide
 * Daily details vars (repeats 3 x):
 * forecastDayCndtnIcon= forecast.forecastday.day.condition.icon
 * forecastDayCndtnTxt= forecast.forecastday.day.condition.text
 * localCity= location.name
 * LocalSt= location.region
 * LocalCntry= location.country
 * forecastDate= forecast.forecastday[x].date
 * forecastDayMaxTemp= forecast.forecastday.maxtemp_f
 * forecastDayMinTemp= forecast.forecastday.mintemp_f
 * forecastDayMaxWind= forecast.forecastday[index].maxwind_mph
 * forecastDayHumid= forecast.forecastday.avghumidity
 * forecastDayRainChance= forecast.forecastday.daily_chance_of_rain
 * forecastDaySnowChance= forecast.forecastday.daily_chance_of_snow
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
  let api = "https://api.weatherapi.com/v1/forecast.json?key=7d94c74d88d147c89f5150101201806"
  let url = api + "&q=" + city + " " + st + "&days=3"
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (let index=0; index<3; index++){
        let day = new Date(data.forecast.forecastday[index].date);
        let day2 = day.toUTCString()
        let day3 = day2.substr(0,3);
        let weekDay = day3.toUpperCase();
        console.log(weekDay);
// SECTION div for details
        let div1= document.createElement("section");
          div1.className= "w3-row";
          div1.id= "deets";
        document.getElementById("three-day").appendChild(div1);
        let div2= document.createElement("div");
          div2.className= "w3-col w3-container m6";
          div2.id= "details";
          div2.style= "padding-left: 6rem;";
        document.getElementById("deets").appendChild(div2);
        let wd = document.createElement("p");
          wd.className="w3-center";
          wd.innerText= weekDay;
        document.getElementById("details").appendChild(wd);
        // document.getElementById("three-day").appendChild(wd);
        let detDesc= document.createElement("p");
          detDesc.innerText= forecastDayCndtnTxt+
          data.forecast.forecastday[index].day.condition.text;
          document.getElementById("details").appendChild(detDesc);
        // let detIco= document.createElement("span");
        let detIcoImg= document.createElement("img");
          detIcoImg.src= ico+data.forecast.forecastday[index].day.condition.icon;
          document.getElementById("details").appendChild(detIcoImg);
          // <div class="w3-container w3-cell">
// SECTION div for 2nd column
        let div3= document.createElement("div");
          div3.className= "w3-col w3-container m6";
          div3.id= "side-2"
          div3.style= "padding-left: 4rem;";
        document.getElementById("deets").appendChild(div3);
        let wind= document.createElement("p");
          wind.innerText= forecastDayMaxWind+Math.ceil(data.forecast.forecastday[index].day.maxwind_mph);
        document.getElementById("side-2").appendChild(wind);
      }
    })
  }

// CALL getDetails()
getDetails();