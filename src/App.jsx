import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const success = (position) => {
      const obj = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      setCoords(obj);
    };
    const error = (err) => {
      setErr(true);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  useEffect(() => {
    if (coords) {
      const APIkey = `914f4e0f2e43cc5d9615086325703b64
`;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${APIkey}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 237).toFixed(2),
            farenheit: (((res.data.main.temp - 237) * 9) / 5 + 32).toFixed(2),
          };
          setTemp(obj);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    }
  }, [coords]);

  const handlebg = (weather) => {
    let bg = "/atmosphere.jpg";
    if (weather?.weather[0].main === "Clouds")
      return (bg = "images/clouds.jpg");
    if (weather?.weather[0].main === "Clear") return (bg = "images/clear.jpg");
    if (weather?.weather[0].main === "Drizzle")
      return (bg = "images/drizzle.jpg");
    if (weather?.weather[0].main === "Rain") return (bg = "images/rain.jpg");
    if (weather?.weather[0].main === "Snow") return (bg = "images/snow.jpg");
    if (weather?.weather[0].main === "Thunderstorm")
      return (bg = "images/clouds.jpg");
    return bg;
  };
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${handlebg(weather)})` }}
    >
      {err ? (
        <div className="error">
          <div className="errorCard">
            <h2>You need to provide location</h2>
          </div>
        </div>
      ) : isLoading ? (
        <div className="loading-screen">
          <div className="sky"></div>
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
        </div>
      ) : (
        <WeatherCard weather={weather} temp={temp} />
      )}
    </div>
  );
}

export default App;
