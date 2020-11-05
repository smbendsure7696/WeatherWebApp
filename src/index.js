function refresh()
{

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        document.getElementById("currLoc").innerHTML = "Geolocation is not supported by this browser.";
      }
}
const apikey = "YOUR_API_KEY";
const api_url = "https://api.opencagedata.com/geocode/v1/json";


function showPosition(position) {
    const lat = position.coords.latitude;
    const longi = position.coords.longitude;
   
    var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(lat + ',' + longi)
    + '&pretty=1'
    + '&no_annotations=1';

     

    fetch(request_url).then((res)=>{
        return res.json();
    }).then((r) => { 
        const city = r.results[0].components.county;
        getWeatherData(city);    
    });
  }

  function getDataForSearch()
  {
      const citySearch = document.getElementById("Sid").value;
      if(citySearch.trim()!=="")
		  {
          getWeatherData(citySearch);
      } 
      else
      {
          refresh();
      } 
  }



  function getWeatherData(city)
  {
    const weatherResult = "http://api.weatherstack.com/forecast?access_key=YOUR_API_KEY&query="+city;

    fetch(weatherResult).then((wres) => {
        return wres.json();
    }).then((w) => {
        document.getElementById("currImg").innerHTML = "<img src ="+w.current.weather_icons[0]+">";
        const location = document.getElementById("currLoc");
        const temprature = document.getElementById("currTemp");
        const currStat = document.getElementById("currStat");
        const currPer = document.getElementById("currPer");

        const winDeg = document.getElementById("winDeg");
        const winDir = document.getElementById("winDir");
        const winSp = document.getElementById("winSp");
        const humid = document.getElementById("humid");

        const winDegImg = document.getElementById("winDegImg");
        const winDirImg = document.getElementById("winDirImg");
        const winSpImg = document.getElementById("winSpImg");
        const humidImg = document.getElementById("humidImg");

        location.innerText = city;
        temprature.innerHTML = w.current.temperature +"<span><sup> 0</sup>C";
        currStat.innerText = w.current.weather_descriptions[0];
        currPer.innerText = "Visibility : "+w.current.visibility +"%";

        winDeg.innerText = w.current.wind_degree;
        winDir.innerText = w.current.wind_dir;
        winSp.innerText = w.current.wind_speed;
        humid.innerText = w.current.humidity;



        console.log(w);
    })
    .catch((e) =>{
      const location = document.getElementById("currLoc");
      location.innerText  = "Unable to find location";
    });
  }