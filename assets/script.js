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
            var listEl = document.createElement('li');

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
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInputcity + "&appid=" + APIKey;

    // SAVEs user's input to Local Storage
    localStorage.setItem(userInputcity, userInputcity)

    // clears the previous user input aka previous location
    clearPreviousSearch();

    // fetches the data
    fetchWeatherAPI(queryURL);
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
            day1_tempEl.innerText = '🌡️ Temp: ' + day1_TempDataFahrenheit.toFixed(2) + "°F";
            day1_windEl.innerText = '💨 Wind: ' + day1_windData + 'MPH'
            day1_humidityEl.innerText = '🥵 Humidity: ' + day1_humidityData + '%'
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
            day2_windEl.innerText = '💨 Wind: ' + day2_windData + 'MPH'
            day2_humidityEl.innerText = '🥵 Humidity: ' + day2_humidityData + '%'
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
            day3_windEl.innerText = '💨 Wind: ' + day3_windData + 'MPH'
            day3_humidityEl.innerText = '🥵 Humidity: ' + day3_humidityData + '%'
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
            day4_windEl.innerText = '💨 Wind: ' + day4_windData + 'MPH'
            day4_humidityEl.innerText = '🥵 Humidity: ' + day4_humidityData + '%'
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
            day5_windEl.innerText = '💨 Wind: ' + day5_windData + 'MPH'
            day5_humidityEl.innerText = '🥵 Humidity: ' + day5_humidityData + '%'
            // Apend Elements
            day5_dataEl.append(day5_tempEl);
            day5_dataEl.append(day5_windEl);
            day5_dataEl.append(day5_humidityEl);


            // CURRENT DAY WEATHER
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
            var currentTempDataFahrenheit = kelvinToFahrenheit(tempData);

            // Display the converted temperature in Fahrenheit
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

    locationNameEl.innerHTML = '';

    var tempEl = document.getElementById('temp');
    var windEl = document.getElementById('wind');
    var humidityEl = document.getElementById('humidity');

    tempEl.innerHTML = '';
    windEl.innerHTML = '';
    humidityEl.innerHTML = '';
}


// TODO create a function for each temp to convert it from K to F
// possible creating an array with those numbers and giving it the equation