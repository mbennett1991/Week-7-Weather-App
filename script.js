var APIKey = "7416649906867425f9c55e97c73f40c7";


$("#searchBtn").on("click", function () {
    var userInput = $("#searchInput").val();
    $("#weatherDisplay").empty();
    searchWeather(userInput);
    saveToLocalStorage(userInput);
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

        for (i = 0; i < response.list.length; i++){

            if (response.list[i].dt_txt.indexOf("12:00:00") !== -1){
                var forecastDiv = $("<div>").addClass("forecasts col-2 bg-secondary rounded");
                var pDate = $("<p>").text(response.list[i].dt_txt);
                var pIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png") 
                var pTemp = $("<p>").text(response.list[i].main.temp);
                var pHum = $("<p>").text(response.list[i].main.humidity);
                
                forecastDiv.append(pDate, pIcon, pTemp, pHum);
                $("#weatherDisplay").append(forecastDiv);
            }
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

function saveToLocalStorage(userInput){
    var userSearch = JSON.parse(window.localStorage.getItem("userSearch")) ||  [];
    userSearch.push(userInput);

    localStorage.setItem("userSearch", JSON.stringify(userSearch));
    
    renderSearchSection();
}

function renderSearchSection(){
    var userSearch = JSON.parse(window.localStorage.getItem("userSearch")) ||  [];
    for (i =0; i < userSearch.length; i++){
        //create buttons for each
        console.log(userSearch[i]);
    }
}

renderSearchSection();