const apiKey = "3d585053cb88a4302c78c60bbdca5ac0";
const searchBtn = document.querySelector(".search .searchbtn");
const lovedbtn = document.querySelector(".search .loved");
const lovedList = document.getElementById("lovedl");
const searchInput = document.querySelector(".search input");
const historyList = document.getElementById("history");
const input = document.getElementById("city");

document.addEventListener("DOMContentLoaded", loadHistory);
document.addEventListener("DOMContentLoaded", loadLoved);


async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if(response.status === 404 || response.status == 400){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    } else {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".feels-like").innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind speed: " + Math.round(data.wind.speed) + "km/h";

    if(data.weather[0].main == "Clouds") {
        document.querySelector("body").style.backgroundImage = "url('images/sunny-clouddy-weather.png')";
    } else if(data.weather[0].main == "Clear") {
        document.querySelector("body").style.backgroundImage = "url('images/clear.png')";
    } else if(data.weather[0].main == "Rain" || data.weather[0].main == "Drizzle") {
        document.querySelector("body").style.backgroundImage = "url('images/rainy-weather.png')";
    } else if(data.weather[0].main == "Mist") {
        document.querySelector("body").style.backgroundImage = "url('images/mist.png')";
    } 

    saveCity(city);
    saveCitytolov(city);
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});
function saveCity(city) {
    if(!city) return;
    let history = JSON.parse(localStorage.getItem("cityHistory")) || [];
    if (!history.includes(city)) {
        history.unshift(city); 
        history = history.slice(0, 5); 
    }
    localStorage.setItem("cityHistory", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("cityHistory")) || [];
    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            input.value = city;
            historyList.style.display = "none";
            checkWeather(city);
        });
        historyList.appendChild(li);
    });
}

input.addEventListener("focus", () => {
    loadHistory();
    historyList.style.display = "block";
});

function saveCitytolov(city) {
    if(!city) return;
    let loved = JSON.parse(localStorage.getItem("cityLoved")) || [];
    if (!loved.includes(city)) {
        loved.unshift(city); 
        loved = loved.slice(0, 5); 
    }
    localStorage.setItem("cityLoved", JSON.stringify(loved));
    loadLoved();
}

function loadLoved() {
    lovedList.innerHTML = "";
    let loved = JSON.parse(localStorage.getItem("cityLoved")) || [];
    loved .forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            input.value = city;
            lovedList.style.display = "none";
            checkWeather(city);
        });
        lovedList.appendChild(li);
    });
}
lovedbtn.addEventListener("click", () => {
    loadLoved();
    lovedList.style.display = "block";
});