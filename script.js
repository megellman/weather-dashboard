// Global Variables 
var key = 'ecbca053dcf966e18511cc24a49d0055';
var form = $('#searchBar');
var city = $('#city');
var buttonContainer = document.createElement('div');
buttonContainer.setAttribute('id', 'btnContainer');
document.getElementById('sidebar').append(buttonContainer);

// When the submit button is click OR when user hit return
form.submit(function (event) {
    event.preventDefault();
    var prevSearch = document.createElement('button');
    prevSearch.innerHTML = city.val();
    prevSearch.setAttribute('id', city.val());
    document.getElementById('btnContainer').append(prevSearch);

    // Applies weather stats of previously searched button to page
    $('#btnContainer').on('click', function (e) {
        var btnObject = JSON.parse(localStorage.getItem(e.target.innerText));
        e.stopPropagation();
        $('#weather-header').text(btnObject.weatherHeader);
        $('#date').text(btnObject.date);
        $('#icon').attr('src', btnObject.icon);
        $('#temp').text(btnObject.temp);
        $('#wind').text(btnObject.wind);
        $('#humidity').text(btnObject.humidity);
        var btnOtherObject = JSON.parse(localStorage.getItem(`${e.target.innerText}0`));
        console.log(btnOtherObject)
        for (var i = 0; i < 32; i += 8) {
            $('#weather-header' + i).text(btnObject.weatherHeader);
            $('#date' + i).text(btnObject.date);
            $('#temp' + i).text(btnObject.temp);
            $('#wind' + i).text(btnObject.wind);
            $('#icon' + i).attr('src', btnObject.icon);
        }
    })

    var urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.val()}&units=imperial&appid=${key}`
    var urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city.val()}&units=imperial&appid=${key}`


    // Current weather data
    fetch(urlWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var container = document.getElementById('weather-container');
            $('#weather-container').empty();
            var weatherHeader = document.createElement('h2');

            weatherHeader.innerHTML = data.name;
            weatherHeader.setAttribute('id', 'weather-header');

            container.append(weatherHeader);

            var date = document.createElement('h3');
            var format = new Date(data.dt * 1000);
            var icon = document.createElement('img');
            var temp = document.createElement('p');
            var wind = document.createElement('p');
            var humidity = document.createElement('p');

            date.innerHTML = format.toLocaleDateString();
            temp.innerHTML = `Temp: ${data.main.temp} \u00B0F`;
            wind.innerHTML = `Wind: ${data.wind.speed} MPH`;
            humidity.innerHTML = `Humidity: ${data.main.humidity} %`;

            date.setAttribute('id', 'date');
            icon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
            icon.setAttribute('id', 'icon')
            temp.setAttribute('id', 'temp');
            wind.setAttribute('id', 'wind');
            humidity.setAttribute('id', 'humidity');

            container.append(date);
            container.append(icon);
            container.append(temp);
            container.append(wind);
            container.append(humidity);

            var currentInfo = {
                weatherHeader: data.name,
                date: format.toLocaleDateString(),
                icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                temp: `Temp: ${data.main.temp} \u00B0F`,
                wind: `Wind: ${data.wind.speed} MPH`,
                humidity: `Humidity: ${data.main.humidity} %`
            }
            localStorage.setItem(city.val(), JSON.stringify(currentInfo));
        });
    // Five Day Weather Data
    fetch(urlFiveDay)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $('#container').empty();

            var forecastHeader = document.createElement('h2');
            var fiveDayContainer = document.createElement('div');

            fiveDayContainer.setAttribute('id', 'five-day-container');
            forecastHeader.innerHTML = "5 Day Forecast:"

            document.getElementById('container').prepend(fiveDayContainer);
            document.getElementById('container').prepend(forecastHeader);

            for (var i = 0; i < data.list.length; i += 8) {
                var dayContainer = document.createElement('div');
                var icon = document.createElement('img');
                var date = document.createElement('h4');
                var format = new Date(data.list[i].dt * 1000);
                var temp = document.createElement('p');
                var wind = document.createElement('p');
                var humidity = document.createElement('p');

                date.innerHTML = format.toLocaleDateString();
                temp.innerHTML = `Temp: ${data.list[i].main.temp} \u00B0F`;
                wind.innerHTML = `Wind: ${data.list[i].wind.speed} MPH`;
                humidity.innerHTML = `Humidity: ${data.list[i].main.humidity} %`;

                dayContainer.setAttribute('class', 'day-container');
                icon.setAttribute('src', `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);
                date.setAttribute('id', 'date' + i);
                temp.setAttribute('id', 'temp' + i);
                wind.setAttribute('id', 'wind' + i);
                humidity.setAttribute('id', 'humidity' + i);
                icon.setAttribute('id', 'icon' + i);

                dayContainer.append(icon);
                dayContainer.append(date);
                dayContainer.append(temp);
                dayContainer.append(wind);
                dayContainer.append(humidity);
                document.getElementById('five-day-container').append(dayContainer);

                var currentInfo = {
                    icon: `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`,
                    date: format.toLocaleDateString(),
                    temp: `Temp: ${data.list[i].main.temp} \u00B0F`,
                    wind: `Wind: ${data.list[i].wind.speed} MPH`,
                    humidity: `Humidity: ${data.list[i].main.humidity} %`
                }
                localStorage.setItem(city.val() + i, JSON.stringify(currentInfo));
            }
        });
})

