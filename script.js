let array = []

//variables for left side
let app = document.querySelector('.weatherapp')
let content = document.querySelector('.content')
let temperature = document.getElementById('temp-id')
let convert = document.querySelector('.temp-convert')
let name = document.querySelector('.city')
let place = document.querySelector('.location')
let time = document.querySelector('.time')
const minutes = document.getElementById('minutes')
let date = document.querySelector('.date')
let weatherIcon = document.querySelector('.icon')
let weatherCondition = document.querySelector('.condition')

//variables for right side
let form = document.getElementById('location-input')
let searchBar = document.querySelector('.search')
let submitButton = document.querySelector('.submit')
let humid = document.querySelector('.humidity')
let clouds = document.querySelector('.cloud')
let windy = document.querySelector('.wind')
let cities = document.querySelectorAll('.city')



//getting the weather data
let weather = {
    key: "64a49a3e3a994b87b19133914232701",
    cityInput: 'Singapore',
    fetchData: function() {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${this.key}&q=${this.cityInput}&aqi=no`)
        .then((response)=>response.json())
        .then(data => {this.displayData(data)
            this.displayIcon(data)
            this.displayTime(data)
            this.displayBackgroundImage(data)
            console.log(data)})
    },
    displayData: function(data) {
        const { name } = data.location
        const {cloud, humidity, temp_c, wind_kph} = data.current
        const {text} = data.current.condition
        console.log(name, cloud, humidity, temp_c, wind_kph, text)

        temperature.innerText = temp_c + '°C'
        place.innerText = name
        weatherCondition.innerText = text
        humid.innerText = humidity + '%'
        clouds.innerText = cloud + '%'
        windy.innerText = wind_kph + 'km/h'
    },
    displayIcon: function(data) {
        const iconID = data.current
        .condition
        .icon
        .substr('//cdn.weatherapi.com/weather/64x64/'.length)
        weatherIcon.src = "./icons/" + iconID;
    },
    displayBackgroundImage: function(data) {
        const {code} = data.current.condition
        let timeDefault = 'day';
        if (!data.current.is_day) {
            timeDefault = 'night'
        }

        if (code === 1000) {
            //set backgorund to clear if weather is clear, day or night
            app.style.backgroundImage = `url(./images/${timeDefault}/clear.jpg)`;
            submitButton.style.background = '#e4ba92';
            if (timeDefault=='night'){
                submitButton.style.background = '#181e27'
            }
        } 
        else if ( 
            code==1003 ||
            code==1006 ||
            code==1009 ||
            code==1030 ||
            code==1069 ||
            code==1087 ||
            code==1135 ||
            code==1273 ||
            code==1276 ||
            code==1279 ||
            code==1282 )
         {
            app.style.backgroundImage = `url(./images/${timeDefault}/cloudy.jpg)`;
            submitButton.style.background = '#fa6d1b';
            if (timeDefault == 'night') {
                submitButton.style.background = '#181e27'
            }
        } 
        else if ( 
            code==1063 ||
            code==1069 ||
            code==1072 ||
            code==1150 ||
            code==1153 ||
            code==1180 ||
            code==1183 ||
            code==1186 ||
            code==1189 ||
            code==1192 ||
            code==1195 ||
            code==1204 ||
            code==1207 ||
            code==1240 ||
            code==1243 ||
            code==1246 ||
            code==1249 ||
            code==1252 )
         {
            app.style.backgroundImage = `url(./images/${timeDefault}/rainy.jpg)`;
            submitButton.style.background = '#647d75';
            if (timeDefault == 'night') {
                submitButton.style.background = '#325c80'
            }
        } 
        else {
            app.style.backgroundImage = `url(./images/${timeDefault}/snowy.jpg)`;
            submitButton.style.background = '#4d72aa';
            if (timeDefault == 'night') {
                submitButton.style.background = '#1b1b1b'
            }
        } 
        



    },
    displayTime: function(data) {
        const dateText = data.location.localtime;
        const y = parseInt(dateText.substr(0, 4));
        const m = parseInt(dateText.substr(5, 2));
        const whatDay = parseInt(dateText.substr(8, 2));
        let timeText = dateText.substr(11, 2);
        if (!timeText.includes(":")) {timeText += ':'}
        time.innerText = `${timeText}`
        date.innerHTML = `${this.dayOfTheWeek(whatDay, m, y)} ${whatDay}, ${m} ${y}`
    },

    dayOfTheWeek: function(whatDay, m, y){
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        return weekday[ new Date(`${m}/${whatDay}/${y}`).getDay()]
    }
}


// search engine
submitButton.addEventListener("click", function() {
    weather.cityInput = searchBar.value
    weather.fetchData()
})

form.addEventListener('submit', function(e) {
   if (searchBar.value.length == 0) {
    alert('Type in a city')
   } else {
    weather.cityInput = searchBar.value
    weather.fetchData()
    searchBar.value=''
   }
   e.preventDefault()
})

temperature.addEventListener('click', function() {
    var temp = temperature.innerText
    var C = Number(temp.substring(0, (temp.length)-2))
    if (temp.includes('°C')){
        x =(C*(9/5))+32
        let F = Math.round(x * 10)/10
        temperature.innerText = F + '°F'}
    else {
        let F = Number(temp.substring(0, (temp.length)-2))
        x = (F-32)/(9/5)
        let C = Math.round(x * 10)/10 
        temperature.innerText = C + '°C'
    }
})

//clickable cities
cities.forEach((city)=>{
    city.addEventListener('click', ()=>{
        weather.cityInput = city.innerHTML;
        weather.fetchData()
    })
})


//constantly updates m
function updateMinutes() {
    let m = new Date().getMinutes()
    m = m<10 ? '0'+m : m
    minutes.innerHTML = m
    setTimeout(()=>{updateMinutes()},1000)
}

weather.fetchData()
updateMinutes()





