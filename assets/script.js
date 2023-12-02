// My API Key
var APIKey = 'c856779139801e3d2dcf1e726f865979'

// TARGETS the searchBtn element
var searchBtn = $('#search_btn');


$(document).ready(function () {
    getLocalStorage();
});

// .getItem from localStorage to display on webpage
function getLocalStorage() {
    if (localStorage.length > 0) {
        // Loops through the user's local storage
        for (let i = 0; i < localStorage.length; i++) {
            // selects for every key within local storage
            var key = localStorage.key(i);

            // GETS each key
            var value = localStorage.getItem(key);

            // creates a li element
            var listEl = document.createElement('button');

            // store the value from the user's local storage in the listEl
            listEl.textContent = value;

            // TARGETS the search_history id
            var searchHistoryEl = document.getElementById('search_history')

            searchHistoryEl.append(listEl);
        }
    }
}










// When searchBtn (element) is clicked. With the User's desired input, we are FETCHING data for the specific city.
searchBtn.on('click', function (event) {
    // TARGETS the element with the user's desired input
    var userInputcity = $('#userInput').val()
    // Combines the API's URL and the user's input to create a fetch call, with also my API Key
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInputcity + "&appid=" + APIKey;

    // Check if the user input is empty
    if (userInputcity === '') {
        alert('Please enter a valid city name.');
        return;
    }

    // SAVEs user's input to Local Storage
    localStorage.setItem(userInputcity, userInputcity)

    // clears the previous user input aka previous location
    clearPreviousSearch();

    // fetches the data
    fetchWeatherAPI(queryURL);

    // Updates search history
    updateSearchHistory();
});



// Listens for a click on the recent search history buttons
// when clicked, it uses the fetchWeatherAPI() function
// and the local storage's data
function searchHistoryBtn(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    // Clear the previous search
    clearPreviousSearch();

    // Fetch the data for the specific city again
    fetchWeatherAPI(queryURL);
}

// Attach a click event listener to the search history element
document.getElementById('search_history').addEventListener('click', function (event) {
    // Check if the clicked element is a button within the search history
    if (event.target.tagName.toLowerCase() === 'button') {
        // Get the text content of the clicked button (which is the city name)
        var cityName = event.target.textContent;

        // Call the searchHistoryBtn function with the cityName
        searchHistoryBtn(cityName);
    }
});





// A Function that fetches data from the Open Weather API
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
            // 5-DAY FORCAST STARTING FROM +1 FROM CURRENT DAY
            // What list[x] number from 5 days out current
            // 2, 3, 4, 5, 6
            // 6, 14, 22, 30, 38 
            var futureContainer = document.querySelector('.future_container')

            futureContainer.style.display = 'block'

            // DAY 1
            // SETS THE DATE AND DISPLAYS ON WEBPAGE
            var day1_locationName = document.getElementById('day1_location_name')
            var day1_Data = data.list[6].dt_txt.split(' ')[0];
            day1_locationName.innerText = '(' + day1_Data + ')';
            // TARGETS ul and CREATES an li
            var day1_dataEl = document.getElementById('day1_data');
            // Create a li element for each data piece
            var day1_tempEl = document.createElement('li');
            var day1_windEl = document.createElement('li');
            var day1_humidityEl = document.createElement('li');
            // Stores the temp, wind, & humidity data in a variable
            var day1_tempData = data.list[6].main.temp;
            var day1_windData = data.list[6].wind.speed;
            var day1_humidityData = data.list[6].main.humidity;
            // Convert K to F
            var day1_TempDataFahrenheit = kelvinToFahrenheit(day1_tempData)
            // Inserting Text inside of the data elements
            day1_tempEl.textContent = '🌡️ Temp: ' + day1_TempDataFahrenheit.toFixed(2) + "°F";
            day1_windEl.textContent = '💨 Wind: ' + day1_windData + 'MPH'
            day1_humidityEl.textContent = '🥵 Humidity: ' + day1_humidityData + '%'
            // Apend Elements
            day1_dataEl.append(day1_tempEl);
            day1_dataEl.append(day1_windEl);
            day1_dataEl.append(day1_humidityEl);

            // DAY 2
            var day2_locationName = document.getElementById('day2_location_name');
            var day2_Data = data.list[14].dt_txt.split(' ')[0];
            day2_locationName.textContent = '(' + day2_Data + ')';
            // TARGETS ul and CREATES an li
            var day2_dataEl = document.getElementById('day2_data')
            // Create a li element for each data piece
            var day2_tempEl = document.createElement('li');
            var day2_windEl = document.createElement('li');
            var day2_humidityEl = document.createElement('li');
            // Stores the temp, wind, & humidity data in a variable
            var day2_tempData = data.list[14].main.temp;
            var day2_windData = data.list[14].wind.speed;
            var day2_humidityData = data.list[14].main.humidity;
            // Convert K to F
            var day2_TempDataFahrenheit = kelvinToFahrenheit(day2_tempData)
            // Inserting Text inside of the data elements
            day2_tempEl.textContent = '🌡️ Temp: ' + day2_TempDataFahrenheit.toFixed(2) + "°F";
            day2_windEl.textContent = '💨 Wind: ' + day2_windData + 'MPH'
            day2_humidityEl.textContent = '🥵 Humidity: ' + day2_humidityData + '%'
            // Apend Elements
            day2_dataEl.append(day2_tempEl);
            day2_dataEl.append(day2_windEl);
            day2_dataEl.append(day2_humidityEl);

            // DAY 3
            var day3_locationName = document.getElementById('day3_location_name');
            var day3_Data = data.list[22].dt_txt.split(' ')[0];
            day3_locationName.textContent = '(' + day3_Data + ')';
            // TARGETS ul and CREATES an li
            var day3_dataEl = document.getElementById('day3_data')
            // Create a li element for each data piece
            var day3_tempEl = document.createElement('li');
            var day3_windEl = document.createElement('li');
            var day3_humidityEl = document.createElement('li');
            // Stores the temp, wind, & humidity data in a variable
            var day3_tempData = data.list[22].main.temp;
            var day3_windData = data.list[22].wind.speed;
            var day3_humidityData = data.list[22].main.humidity;
            // Convert K to F
            var day3_TempDataFahrenheit = kelvinToFahrenheit(day3_tempData)
            // Inserting Text inside of the data elements
            day3_tempEl.textContent = '🌡️ Temp: ' + day3_TempDataFahrenheit.toFixed(2) + "°F";
            day3_windEl.textContent = '💨 Wind: ' + day3_windData + 'MPH'
            day3_humidityEl.textContent = '🥵 Humidity: ' + day3_humidityData + '%'
            // Apend Elements
            day3_dataEl.append(day3_tempEl);
            day3_dataEl.append(day3_windEl);
            day3_dataEl.append(day3_humidityEl);

            //DAY 4
            var day4_locationName = document.getElementById('day4_location_name');
            var day4_Data = data.list[30].dt_txt.split(' ')[0];
            day4_locationName.textContent = '(' + day4_Data + ')';
            // TARGETS ul and CREATES an li
            var day4_dataEl = document.getElementById('day4_data')
            // Create a li element for each data piece
            var day4_tempEl = document.createElement('li');
            var day4_windEl = document.createElement('li');
            var day4_humidityEl = document.createElement('li');
            // Stores the temp, wind, & humidity data in a variable
            var day4_tempData = data.list[30].main.temp;
            var day4_windData = data.list[30].wind.speed;
            var day4_humidityData = data.list[30].main.humidity;
            // Convert K to F
            var day4_TempDataFahrenheit = kelvinToFahrenheit(day4_tempData)
            // Inserting Text inside of the data elements
            day4_tempEl.textContent = '🌡️ Temp: ' + day4_TempDataFahrenheit.toFixed(2) + "°F";
            day4_windEl.textContent = '💨 Wind: ' + day4_windData + 'MPH'
            day4_humidityEl.textContent = '🥵 Humidity: ' + day4_humidityData + '%'
            // Apend Elements
            day4_dataEl.append(day4_tempEl);
            day4_dataEl.append(day4_windEl);
            day4_dataEl.append(day4_humidityEl);

            //DAY 5
            var day5_locationName = document.getElementById('day5_location_name');
            var day5_Data = data.list[38].dt_txt.split(' ')[0];
            day5_locationName.textContent = '(' + day5_Data + ')';
            // TARGETS ul and CREATES an li
            var day5_dataEl = document.getElementById('day5_data')
            // Create a li element for each data piece
            var day5_tempEl = document.createElement('li');
            var day5_windEl = document.createElement('li');
            var day5_humidityEl = document.createElement('li');
            // Stores the temp, wind, & humidity data in a variable
            var day5_tempData = data.list[38].main.temp;
            var day5_windData = data.list[38].wind.speed;
            var day5_humidityData = data.list[38].main.humidity;
            // Convert K to F
            var day5_TempDataFahrenheit = kelvinToFahrenheit(day5_tempData)
            // Inserting Text inside of the data elements
            day5_tempEl.textContent = '🌡️ Temp: ' + day5_TempDataFahrenheit.toFixed(2) + "°F";
            day5_windEl.textContent = '💨 Wind: ' + day5_windData + 'MPH'
            day5_humidityEl.textContent = '🥵 Humidity: ' + day5_humidityData + '%'
            // Apend Elements
            day5_dataEl.append(day5_tempEl);
            day5_dataEl.append(day5_windEl);
            day5_dataEl.append(day5_humidityEl);


            // CURRENT DAY
            // TARGETS the h2 element with the id of 'location_name'
            var currentContainer = document.querySelector('.current_container')
            var locationNameEl = document.getElementById('location_name');
            // CSS STYLING CHANGE
            currentContainer.style.display = 'block'

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

            var currentTempDataFahrenheit = kelvinToFahrenheit(tempData);

            // Appends elements
            tempEl.append('🌡️ Temp: ' + currentTempDataFahrenheit.toFixed(2) + "°F");
            windEl.append('💨 Wind: ' + windData + 'MPH');
            humidityEl.append('🥵 Humidity: ' + humidityData + '%');
            
        })
};



// A function that takes in the tempData, and converts it into Fahrenheit
function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9 / 5) + 32;
}


// Clears the User's Previous Search
function clearPreviousSearch() {
    var locationNameEl = document.getElementById('location_name');
    var tempEl = document.getElementById('temp');
    var windEl = document.getElementById('wind');
    var humidityEl = document.getElementById('humidity');

    locationNameEl.innerHTML = '';
    tempEl.innerHTML = '';
    windEl.innerHTML = '';
    humidityEl.innerHTML = '';

    // Clear 5-day forecast elements
    clearDayForecast('day1');
    clearDayForecast('day2');
    clearDayForecast('day3');
    clearDayForecast('day4');
    clearDayForecast('day5');
}


// Clears the forecast information for a specific day
function clearDayForecast(day) {
    var dayLocationName = document.getElementById(day + '_location_name');
    var dayDataEl = document.getElementById(day + '_data');

    dayLocationName.innerHTML = '';
    dayDataEl.innerHTML = '';
}

// Updates the search history
function updateSearchHistory() {
    var searchHistoryEl = document.getElementById('search_history');

    searchHistoryEl.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        var value = localStorage.getItem(key);

        var listEl = document.createElement('button');

        listEl.textContent = value;

        searchHistoryEl.append(listEl);
    }
}