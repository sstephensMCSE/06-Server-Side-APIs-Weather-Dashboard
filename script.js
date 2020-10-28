// my key
openweatherAPI = "dcbe46fefc13d93112c8444dd4bded9f"

// Initialize search history and load the buttons
var searchHistory = [];
historyBtns();


$("#searchBtn").on("click", function (event) {    
    event.preventDefault();
    var cityInput = $("#citySearch").val().trim();
    // Add query to history array
    searchHistory.push(cityInput);
    // update local storage
    localStorage.setItem('cityNames', JSON.stringify(searchHistory));
    // clear the search text box
    $('#citySearch').val('');
    // update the buttons
    historyBtns();
    // update the dashboard
    updateDashboard(cityInput);
});

function historyBtns() {
    // the browser storage is the source of truth
    searchHistory = JSON.parse(localStorage.getItem("cityNames"));
    // clear the history div
    $("#searchHistory").empty();
    // array loop to create the buttons
    if (searchHistory !== null){
        for (var i = 0; i < searchHistory.length; i++) {
            searchbtn = $("<button class='btn btn-light'>").text(searchHistory[i]);
            $("#searchHistory").append(searchbtn);        
        }
    }
}

// clear the history and reload the buttons
$("#clearHistory").on("click", function (event) {
    event.preventDefault();
    searchHistory = [];    
    localStorage.setItem('cityNames', JSON.stringify(searchHistory));
    historyBtns();
});

$("#searchHistory").on('click', '.btn', function(event) {
    event.preventDefault();
    console.log($(this).text());
    updateDashboard($(this).text());
    
});

function updateDashboard(cityInput) {

    // format mm/dd/yyy
    var todaysdate = moment().format('L');
    
    // API
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${openweatherAPI}`;
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=imperial&appid=${openweatherAPI}`;

    $.ajax({
        url: currentURL,
        method: 'GET'
    }).then(function (response) {

        // clear the div
        $("#currentWeather").empty();
        
        // Current Weather
        var cityName = $("<h3>").text(response.name);
        var displayDate = cityName.append(" " + todaysdate);
        var temp = $("<p>").text("Temprature: " + response.main.temp);
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed);
        var weathericon = response.weather[0].main;        
        var newDiv = $('<div>');
        newDiv.append(displayDate, temp, humidity, wind);
        $("#currentWeather").html(newDiv);        
        
        // nested UV API call
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvURL = `https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=${lat}&lon=${lon}`;
        
        $.ajax({
            url: uvURL,
            method: 'GET'
        }).then(function (response) {            
            // Create a green button for UV index
            uvindex = $("<button class='btn bg-success'>").text("UV Index: " + response.value);    
            if (response.value > 3) {
                // Change to yellow button for UV index
                uvindex = $("<button class='btn bg-warning'>").text("UV Index: " + response.value);    
            }
            if (response.value > 6) {
                // Change to red button for UV index            
                uvindex = $("<button class='btn bg-danger'>").text("UV Index: " + response.value);
            }
            var newDiv = $('<div>');
            newDiv.append(uvindex);
            $("#uvindex").html(newDiv);
        });        
        newDiv.append(displayDate, temp, humidity, wind, uvindex);
        $("#currentWeather").html(newDiv);
    });
    

    // 5 day forecast cards
    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function (response) {
        // clear any previous result
        $("#forecast").empty();

        // put the response into an array
        var results = response.list;

        console.log(response);
        console.log(forecastURL);
        
        forecastdiv = $('<div class="col-sm-2 bg-primary forecast text-white ml-2 mb-3 p-2 mt-2 rounded">');      
        

    });
};
