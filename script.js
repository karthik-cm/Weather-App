window.addEventListener('load', () => {
    let latitude;
    let longitude;

    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');

    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            let proxy = 'https://cors-anywhere.herokuapp.com/';

            // Open Weather Map API
            let apiKey = '35fd045b71d4a57ffeb9f73d6e9c145c';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data);

                    const country = data.sys.country;
                    const city = data.name;
                    const icon = data.weather[0].icon;

                    let temperature = data.main.temp;
                    temperature = temperature - 273.15; // Convert Kelvin to Celcius
                    temperature = Number.parseFloat(temperature).toFixed(2); // Truncate upto 2 decimals

                    const {main, description} = data.weather[0];


                    // Set respective values in DOM API
                    locationTimezone.textContent = city +'/' +country;
                    weatherIcon.innerHTML = `<img src="icons/${icon}.png" />`;

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = main +' (' +description +')';
                });
        });
    }
});

function toggleTemperature(){
    let temperatureUnit = document.querySelector('.temperature-unit');
    let temperatureDegree = document.querySelector('.temperature-degree');

    let temperature = temperatureDegree.textContent;

    if(temperatureUnit.getAttribute('value') == 'C'){
        temperatureUnit.setAttribute('value', 'F');
        temperatureUnit.textContent = 'F';

        // Change C to F
        let fahrenheit = convertCelciusToFahrenheit(temperature);
        temperatureDegree.textContent = fahrenheit;
    }
    else{
        temperatureUnit.setAttribute('value', 'C');
        temperatureUnit.textContent = 'C';

        // Change F to C
        let celcius = convertFahrenheitToCelcius(temperature);
        temperatureDegree.textContent = celcius;
    }
}

function convertCelciusToFahrenheit(c){
    // f = (c * 9/5) + 32;
    return Number.parseFloat((c * (9/5)) + 32).toFixed(2);
}

function convertFahrenheitToCelcius(f){
    // c = (f - 32) * (5/9);
    return Number.parseFloat((f - 32) * (5/9)).toFixed(2);
}
