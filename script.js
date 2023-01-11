var key = 'ecbca053dcf966e18511cc24a49d0055';



var form = $('#searchBar');
var city = $('#city');


// var url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=5&appid=${key}`;


// var urlTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=33.835289&lon=-117.914497&appid=${key}`;



form.submit(function (event) {
    event.preventDefault();

    console.log(city.val());
    var urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.val()}&units=imperial&appid=${key}`
    var urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city.val()}&units=imperial&appid=${key}`

    fetch(urlWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var weatherHeader = document.createElement('h2');
            weatherHeader.innerHTML = data.name;
            document.getElementById('weather-container').append(weatherHeader);
            var date = document.createElement('h3');
            date.innerHTML = new Date(data.dt * 1000).toLocaleString("en-US");
            weatherHeader.append(date);
            var temp = document.createElement('p');
            temp.innerHTML = `Temp: ${data.main.temp} \u00B0F`;
            weatherHeader.append(temp);
            var wind = document.createElement('p');
            wind.innerHTML = `Wind: ${data.wind.speed} MPH`;
            weatherHeader.append(wind);
            var humidity = document.createElement('p');
            humidity.innerHTML = `Humidity: ${data.main.humidity} %`;
            weatherHeader.append(humidity);
        });
    fetch(urlFiveDay)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for(var i = 0; i < data.list.length; i+=8){
                var dayContainer = document.createElement('div');
                dayContainer.setAttribute('class', 'day-container');
                document.getElementById('five-day-container').append(dayContainer);
                var date = document.createElement('p');
                var initialTime = (data.list[i].dt_txt).slice(0, 10);
                var finalForm = initialTime.substr(5, 6) + '-' + initialTime.substr(0, 4);
                console.log(finalForm)
                date.innerHTML = finalForm;
                dayContainer.append(date);
                var temp = document.createElement('p');
                temp.innerHTML = `Temp: ${data.list[i].main.temp} \u00B0F`;
                dayContainer.append(temp);
                var wind = document.createElement('p');
                wind.innerHTML = `Wind: ${data.list[i].wind.speed} MPH`;
                dayContainer.append(wind);
                var humidity = document.createElement('p');
                humidity.innerHTML = `Humidity: ${data.list[i].main.humidity} %`;
                dayContainer.append(humidity);
            }
        });
})

// for (let i = 0; i < array.length; i+=8) {
//     const element = array[i];
    
// }
