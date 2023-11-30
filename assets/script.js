// My API Key
var APIKey = 'c856779139801e3d2dcf1e726f865979'

// TARGETS the element with the user's desired input
var city = $('#userInput').val()

// 
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// TARGETS the searchBtn element
var searchBtn = $('#search_btn');

// When searchBtn (element) is clicked. With the User's desired input, we are FETCHING data for the specific city.
searchBtn.on('click', function (event) {
    event.preventDefault();

    var city = $('#userInput').val()

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetchWeatherAPI(queryURL);
});

function fetchWeatherAPI(queryURL) {
    fetch(queryURL)
        .then(function (response) {
            
            if (response.status === 404) {
                console.log('Error')
            } else if (response.status === 200) {
                console.log('Success!')
            };
            
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
}
