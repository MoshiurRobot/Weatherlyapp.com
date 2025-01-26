import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/sunny.png";
import snow_icon from "../assets/snow.png";
import rain_icon from "../assets/rain.png";
import cloudy_icon from "../assets/cloudy.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import sunrise_icon from "../assets/sunrise.png";
import sunset_icon from "../assets/sunset.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": cloudy_icon,
    "04n": cloudy_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11n": rain_icon,
    "11d": rain_icon,
    "13n": snow_icon,
    "13d": snow_icon,
  };

  const search = async (city) => {
    if (
      city === "" ||
      city === null ||
      city === undefined ||
      city === " " ||
      city === "  "
    ) {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        description: data.weather[0].description,
        sunRise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunSet: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data");
    }
  };

  useEffect(() => {
    search("bangladesh");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}&deg;C</p>
          <p className="location">{weatherData.location}</p>
          <p className="description-wD">{weatherData.description}</p>
          <div className="weather-data-info-1">
            <p className="description">
              <img src={sunrise_icon} />
              <br></br>
              Sunrise: {weatherData.sunRise}
            </p>
            <p className="description">
              <img src={sunset_icon} /> <br></br>
              Sunset: {weatherData.sunSet}
            </p>
          </div>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Windspeed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
