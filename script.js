var APIKey = "7416649906867425f9c55e97c73f40c7";


$("#searchBtn").on("click", function () {
    var userInput = $("#searchInput").val();
    searchWeather(userInput);
    saveToLocalStorage();
});


function searchWeather(userInput){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var currentDay = moment().format("D/M/YYYY")
        console.log(currentDay)
            console.log(response);

            var K = response.main.temp;
            var f = Math.floor((K - 273.15) * 1.80 + 32);
            var c = Math.floor(K - 273.15);
            var weatherIcon = response.weather[0].icon;
            var iconImage = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
            console.log(iconImage);
            $("#city").text(userInput + " " + currentDay + " ");
            $("#weatherPic").attr("src", iconImage);
            $("#temperatureF").text("Temperature: " + f + "° F");
            $("#temperatureC").text("Temperature: " + c + "° C");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");

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

        for (i = 0; i < 5; i++){
            var date = moment().format("D/M/YYYY");
            //var fIcon = 
            var fTempK = response.list[7].main.temp;
            var fTempF = Math.floor((fTempK - 273.15) * 1.80 + 32);
            var fTempC = Math.floor(fTempK - 273.15);
            var fHum = response.list[7].main.humidity;

            $("#fD" + i)
            $("#fI" + i)
            $("#fTemp" + i).text(fTempF + "° F");
            $("#fHum" + i).text(fHum + "%");
        }

        
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

    var searchCity = $("#searchInput").val();
    localStorage.setItem("userSearch", searchCity)
    
    renderSearchSection();
}

function renderSearchSection(){

}

renderSearchSection();