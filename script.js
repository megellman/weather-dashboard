var key = 'ecbca053dcf966e18511cc24a49d0055';
var city = '';
var state = '';
// var lat = ;
// var lon = ;

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}

// var url = `api.openweathermap.org/data/2.5/forecast?q=ozark&appid=${key}`;

var form = $('#searchBar');
var city = $('#city');


var url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=5&appid=${key}`;

var urlTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=33.835289&lon=-117.914497&appid=${key}`;

fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
    });