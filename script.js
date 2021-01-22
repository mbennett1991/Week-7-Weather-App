var APIKey = "7416649906867425f9c55e97c73f40c7";


//parse or stringify user input


$("#searchBtn").on("click", function () {
    var userInput = $("#searchInput").val();
    //var userCity = $(this).attr("userInput");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
            console.log(response);

            getForecast(userInput);
            getUV(response.coord.lat, response.coord.lon);
        });

});


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
        console.log("UV index:", response.value)
    })
}
