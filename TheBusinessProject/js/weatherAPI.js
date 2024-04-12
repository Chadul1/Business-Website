//Reference: https://developer.accuweather.com/getting-started

    //Make a bunch of weather constants for the API:
      //the weather API url, for safe keeping (note: the location is set to Plover, WI)
      const url = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/341502?apikey=qU8aGdIAIQTz0n3xXkNrm4IuGSluPzMx"

      //Grab the HTML elements for the weather data:
      var weatherDisplayContainer = document.getElementById('weatherContainer');
      var weatherDisplayLocationText = document.getElementById('weatherLocationText');
      var weatherDisplaySymbol = document.getElementById('weatherSymbol');
      var weatherDisplayTemperatureMinimumText = document.getElementById('weatherTemperatureMinimumText');

//fetch the weather API from the url and use the data provided to generate content for the website
async function fetchWeather()
{

    try 
    {
      //gets the weather data
      const response = await fetch(url);

      //Checks to see if our fetch actually returned with data
      if(!response.ok){
          throw new error("Error: Unable to fetch weather data from URL.");
      } 

      //Transform the data to a JSON
      const weatherData = await response.json();

      //Get the JSON data we want
        //The array of daily forecasts
        var weatherDailyForecasts = weatherData["DailyForecasts"];

        //The first day (today) in the list of forecasts
        var weatherTodayForecast = weatherDailyForecasts[0];

        //The temperature data for today
        var weatherTodayTemperature = weatherTodayForecast["Temperature"];

        //The minimum temperature data for today
        var weatherTodayTemperatureMinimum = weatherTodayTemperature["Minimum"];

        //The value for the minimum temperature
        var weatherTodayTemperatureMinimumValue = weatherTodayTemperatureMinimum.Value;

        //The unit for the minimum temperature data
        var weatherTodayTemperatureMinimumUnit = weatherTodayTemperatureMinimum.Unit;

        //The maximum temperature for today
        var weatherTodayTemperatureMaximum = weatherTodayTemperature["Maximum"];

        //the value for the maximum temperature
        var weatherTodayTemperatureMaximumValue = weatherTodayTemperatureMaximum.Value;

        //the unit for the maximum temperature data
        var weatherTodayTemperatureMaximumUnit = weatherTodayTemperatureMaximum.Unit;

        //The data about the daytime forecast for today
        var weatherTodayDayForecast = weatherTodayForecast["Day"];

        // //The weather icon for today's daytime forecast
        var weatherTodayDayIcon = weatherTodayDayForecast["Icon"];

      //Assign the content of the HTML elements to the weather data
      weatherTemperatureMinimumText.textContent = ("Minimum Temp: " + weatherTodayTemperatureMinimumValue + '\u00B0' + weatherTodayTemperatureMinimumUnit);

      weatherTemperatureMaximumText.textContent = ("Maximum Temp: " + weatherTodayTemperatureMaximumValue + '\u00B0' + weatherTodayTemperatureMaximumUnit);

      weatherString = `../media/weather/${weatherTodayDayIcon}.png`;
      weatherDisplaySymbol.src = weatherString;
  }
  
  //If something went wrong, tell the console what went wrong
  catch(error)
  {
      console.log(error);
  }
}

//Fetch the weather data
fetchWeather();
