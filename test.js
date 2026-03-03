
const searchBtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if(response.status === 404 || response.status == 400 ){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind speed: " + data.wind.speed + "km/h";

   
    console.log(data);

}searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});
