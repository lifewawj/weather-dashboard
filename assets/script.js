// My API Key
var APIKey = 'c856779139801e3d2dcf1e726f865979'

// TARGETS the searchBtn element
var searchBtn = $('#search_btn');


// TODO Create Local Storage for user's input and display on webpage
// TODO Create a variable to target user's input
// TODO TARGET .setItem to localstorage
// TODO .getItem from localStorage to display on webpage


// When searchBtn (element) is clicked. With the User's desired input, we are FETCHING data for the specific city.
searchBtn.on('click', function (event) {
    
    // TARGETS the element with the user's desired input
    var city = $('#userInput').val()
    // Combines the API's URL and the user's input to create a fetch call, with also my API Key
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    localStorage.setItem(city, city)

    clearPreviousSearch();
    fetchWeatherAPI(queryURL);
});






function fetchWeatherAPI(queryURL) {
    fetch(queryURL)
        .then(function (response) {

            if (response.status === 404) {
                console.log('Error')
            } else if (response.status === 200) {
                console.log('URL1 Success!')
            };

            return response.json()
        })
        .then(function (data) {
            console.log(data);

            // Grabs the coord objects; lon and lat values and creates them within a variable
            var lon = data.coord.lon;
            var lat = data.coord.lat;

            // Uses the lon and lat values as the url2 parameters
            var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

            return fetch(queryURL2);
        })
        .then(function (response) {

            if (response.status === 404) {
                console.log('Error')
            } else if (response.status === 200) {
                console.log('URL2 Success!')
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // TARGETS the h2 element with the id of 'location_name'
            var locationNameEl = document.getElementById('location_name');

            // uses the fetch data and targets the city's name and date
            var locationNameData = data.city.name;
            var dateData = data.list[0].dt_txt.split(' ')[0];
            
            // displays locationName onto webpage inside the h2 element
            locationNameEl.append(locationNameData + ' ' + '(' + dateData + ')');
            

            var tempEl = document.getElementById('temp')
            var windEl = document.getElementById('wind')
            var humidityEl = document.getElementById('humidity')

            var tempData = data.list[0].main.temp
            var windData = data.list[0].wind.speed
            var humidityData = data.list[0].main.humidity
            
            // TODO Figure out the temp to convert to Farenheight
            tempEl.append('Temp: ' + tempData + "°F");
            windEl.append('Wind: ' + windData + 'MPH');
            humidityEl.append('Humidity: ' + humidityData + '%');
        })
};

// Clears the User's Previous Search
function clearPreviousSearch() {
    var locationNameEl = document.getElementById('location_name');
    
    locationNameEl.innerHTML = '';

    var tempEl = document.getElementById('temp');
    var windEl = document.getElementById('wind');
    var humidityEl = document.getElementById('humidity');

    tempEl.innerHTML = '';
    windEl.innerHTML = '';
    humidityEl.innerHTML = '';
}
