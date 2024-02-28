const apiKey="d328b0dae52fba94642c68dd3ec6601d";
// const city="kolhapur"
const temp= document.querySelector(".temp");
const cityhead= document.querySelector("h2");
const windspeed=document.querySelector(".wind-speed");
const humidity= document.querySelector(".humidity-per");
const visibility=document.querySelector(".visibility-dist");
const description=document.querySelector(".description-text");
const date=document.querySelector(".date");
const formElement=document.querySelector(".serch-form");
const inputElement=document.querySelector(".city-input");
const descriptionicon=document.querySelector(".description i");


async function fetchWeatherData(city){
    //fetching weather data from openweathermap API using the city name entered by user.
    try{
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    if(!response.ok){
        throw new Error("Unable to etch Data..");
    }
    const data = await response.json();
    console.log(data);
    // console.log(data.main.temp);
    // console.log(data.name);
    // console.log(data.main.humidity);
    // console.log(data.visibility);
    updateWeatherUi(data);
    }
    catch(error){
        console.error();
    }
}

// fetchWeatherData();

function updateWeatherUi(data){
    inputElement.textContent=data.name;
    temp.textContent=`${Math.round(data.main.temp)}°`;
    cityhead.textContent=data.name;
    windspeed.innerText=`${data.wind.speed} km/Hr`;
    humidity.innerText=`${data.main.humidity} %`;
    visibility.innerText=`${data.visibility/1000} Km/Hr`;
    description.innerText=`${data.weather[0].main}`;
    let currentDate= new Date();
    date.innerText=currentDate.toDateString();
    const weathername=getWeatherName(data.weather[0].main);
    descriptionicon.innerHTML=` <i class="material-icons">${weathername}</i>`;
}

formElement.addEventListener("submit",function (e) {
    e.preventDefault();
    const city = inputElement.value;
    if(city !== " "){
        fetchWeatherData(city);
    }

});

function getWeatherName(weatherConduction){
    const iconMap= {
        Clear:"wb_sunny",
        Clouds:"wb_cloudy",
        Rain:"umbrella",
        Thunderstores:"flash_on",
        Drizzle:"grain",
        Snow:"ac_unit",
        Mist:"cloude",
        Smoke:"cloude",
        Haze:"cloude",
        Fog:"cloude",
    };
    return iconMap[weatherConduction]|| "help";
}