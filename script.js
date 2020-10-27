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
    var searchHistory = JSON.parse(localStorage.getItem("cityNames"));    
    // clear the history div
    $("#searchHistory").empty();
    // array loop to create the buttons
    for (var i = 0; i < searchHistory.length; i++) {
        searchbtn = $("<button class='btn btn-light'>").text(searchHistory[i]);
        $("#searchHistory").append(searchbtn);        
    }
}

// clear the history and reload the buttons
$("#clearHistory").on("click", function (event) {
    event.preventDefault();
    searchHistory = [];    
    localStorage.setItem('cityNames', JSON.stringify(searchHistory));
    historyBtns();
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
        console.log(response);
        console.log(currentURL);
        // clear the div
        $("#currentWeather").empty();
        
        //create HTML for city information......
        var cityName = $("<h2>").text(response.name);
        var displayDate = cityName.append(" " + todaysdate);
        var temp = $("<p>").text("Temprature: " + response.main.temp);
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed);
        var weathericon = response.weather[0].main;        
        var newDiv = $('<div>');
        newDiv.append(displayDate, temp, humidity, wind);
        $("#currentWeather").html(newDiv);
    });

    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(forecastURL);
    });
};
