var APIKey = "7416649906867425f9c55e97c73f40c7";


$("#searchBtn").on("click", function () {
    var userInput = $("#searchInput").val();
    //var userCity = $(this).attr("userInput");
    searchWeather(userInput);
    saveToLocalStorage();
});


function searchWeather(userInput){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var currentDay = moment()
        console.log(currentDay)
            console.log(response);

            $("#city").text(userInput);
            var K = response.main.temp;
            var f = Math.floor((K - 273.15) * 1.80 + 32);
            var c = Math.floor(K - 273.15);
            $("#temperatureF").text("Temperature: " + f + "° F");
            $("#temperatureC").text("Temperature: " + c + "° C");
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#windSpeed").text("Wind Speed: " + response.wind.speed);

            getForecast(userInput);
            getUV(response.coord.lat, response.coord.lon);
        });
}

function getForecast(userInput) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        
    })
}

function getUV(lat, lon) {
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log("UV index:", response.value);
        $("#uvIndex").text("UV Index: " + response.value);
    })
}

function saveToLocalStorage(){

}

function renderSearchSection(){

}

renderSearchSection();