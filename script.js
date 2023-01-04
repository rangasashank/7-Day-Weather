const timeEL = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEL = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY_1 = '794bcc248627452eb47b437acaa25850'
const API_KEY_2 ='7e5bf4f1376b9f22d91e0646079b7c22';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEL.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

function getWeatherData () {
    var place_name = document.getElementById('Place').value;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place_name}&key=${API_KEY_1}`).then(res => res.json()).then(data_1 => {
        console.log(data_1)
        let latitude = data_1.results[0].geometry.lat;
        let longitude = data_1.results[0].geometry.lng;
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY_2}`).then(res=> res.json()).then(data => {
        console.log(data)

        timezone.innerHTML = data.timezone;
        countryEl.innerHTML = data.lat + 'N' + data.lon+ 'E';
        let otherDayForecast = ''
    data.daily.forEach((day,idx) => {
        if (idx == 0) {
            currentTempEL.innerHTML = 
            `
            <div class="weather-forecast-item">
            <div class="day" id="current-temp">${window.moment(day.dt*1000).format('ddd')}</div>  
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - ${day.temp.night}&#176; c</div>
            <div class="temp">Day - ${day.temp.day}&#176; c</div> 
     
</div>
            `
        } else {
            otherDayForecast += 
            `
            <div class="weather-forecast-item">
            <div class="day" id="current-temp">${window.moment(day.dt*1000).format('ddd')}</div>  
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - ${day.temp.night}&#176; c</div>
            <div class="temp">Day - ${day.temp.day}&#176; c</div> 
     
</div>
            `
        }
    })
    weatherForecastEl.innerHTML = otherDayForecast;
    })
        
    })
    
}

