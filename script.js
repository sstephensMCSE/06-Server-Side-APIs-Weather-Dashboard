
// format mm/dd/yyy
var todaysdate = moment().format('L');

// Initialize search history
var searchHistory = [];
var searchHistory = JSON.parse(localStorage.getItem("cityNames"));
historyBtns();

$("#searchBtn").on("click", function (event) {
    var cityInput = $("#citySearch").val().trim();
    searchHistory.push(cityInput);
    localStorage.setItem('cityNames', JSON.stringify(searchHistory));
    historyBtns();
});

function historyBtns() {
    // the browser storage is the source of truth
    var searchHistory = JSON.parse(localStorage.getItem("cityNames"));
    console.log(searchHistory);
    $("#searchHistory").empty();
    for (var i = 0; i < searchHistory.length; i++) {
        searchbtn = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(searchHistory[i]);
        $("#searchHistory").append(searchbtn);        
    }
}

$("#clearHistory").on("click", function (event) {
    searchHistory = [];    
    localStorage.setItem('cityNames', JSON.stringify(searchHistory));
    historyBtns();
});

