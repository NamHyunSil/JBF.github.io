function getWeather(position) {
    // default: seoul
    let lat = 37.517235;
    let lon = 127.047325;
    if(position != null) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const city = document.querySelector("#today-weather-wrap .city");
            const temp = document.querySelector("#today-weather-wrap .temp");
            const tempDetail = document.querySelector("#today-weather-wrap .temp-detail");
            const tempFeelsLike = document.querySelector("#today-weather-wrap .temp-feels-like");
            const cloudIcon = document.querySelector("#today-weather-wrap .cloud-icon");
            city.innerText = (position != null) ? data.name.toUpperCase() : "SEOUL";
            temp.innerText = `${data.main.temp}${WEATHER_TEMP_UNIT}`;
            tempDetail.innerText = `${data.main.temp_max}${WEATHER_TEMP_UNIT} / ${data.main.temp_min}${WEATHER_TEMP_UNIT}`;
            tempFeelsLike.innerText = `Feels Like ${data.main.feels_like}${WEATHER_TEMP_UNIT}`;

            const weathers = data.weather;
            if(weathers.length > 0) {
                cloudIcon.src = `http://openweathermap.org/img/wn/${weathers[0].icon}@2x.png`
            }
        });
}

function getWeatherForcast(position) {
    // default: seoul
    let lat = 37.517235;
    let lon = 127.047325;
    if(position != null) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherForcast = document.querySelector("#weather-forcast-wrap");
            const weatherWrapTemplate = weatherForcast.querySelector(".template.weather-wrap");

            const dataList = data.list;
            for(let i=0 ; i<dataList.length ; i++) {
                const hourlyData = dataList[i];
                const newWeatherWrap = weatherWrapTemplate.cloneNode(true);
                const time = newWeatherWrap.querySelector(".time");
                const cloudIcon = newWeatherWrap.querySelector(".cloud-icon");
                const temp = newWeatherWrap.querySelector(".temp");
                newWeatherWrap.classList.remove(TEMPLATE_CLASSNAME);

                const dt = parseInt(`${hourlyData.dt}000`);
                const date = new Date(dt);
                
                time.innerText = String(date.getHours()).padStart("0", 2);
                const weathers = hourlyData.weather;
                if(weathers.length > 0) {
                    cloudIcon.src = `http://openweathermap.org/img/wn/${weathers[0].icon}@2x.png`
                }
                temp.innerText = `${hourlyData.main.temp}${WEATHER_TEMP_UNIT}`;
                weatherForcast.appendChild(newWeatherWrap);
            }
        });
}


function onGeoOk(position) {
    getWeather(position);
    getWeatherForcast(position)
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
    getWeather(null);
    getWeatherForcast(null)
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
