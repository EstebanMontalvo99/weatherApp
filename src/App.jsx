import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import SearchCity from "./components/SearchCity";
import WeatherCard from "./components/WeatherCard";
function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [searchErr, setsearchErr] = useState(false);
  const [weatherbg, setWeatherbg] = useState();

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
  const [newcity, setnewCity] = useState("");
  useEffect(() => {
    setsearchErr(false);
    if (coords) {
      const APIkey = `914f4e0f2e43cc5d9615086325703b64
`;
      let url = "";

      if (newcity === "") {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${APIkey}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&appid=${APIkey}`;
      }

      axios
        .get(url)
        .then((res) => {
          setIsLoading(true);
          setWeather(res.data);
          setWeatherbg(handlebg(weather));
          const obj = {
            celsius: (res.data.main.temp - 273).toFixed(2),
            farenheit: (((res.data.main.temp - 273) * 9) / 5 + 32).toFixed(2),
          };

          setTemp(obj);
        })
        .catch((err) => setsearchErr(true))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [coords, newcity]);

  const handlebg = (weather) => {
    let bg = "images/atmosphere.jpg";
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
  const handleNewCity = (e) => {
    e.preventDefault();
    setnewCity(e.target.city.value.trim());
  };
  return (
    <div className="App" style={{ backgroundImage: `url(${weatherbg})` }}>
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
        <>
          <WeatherCard weather={weather} temp={temp} />

          {searchErr ? (
            <>
              <h2 className="searchErrFailed">
                The city you introduced is not valid. Please introduce a valid
                city.
              </h2>
              <SearchCity handleNewCity={handleNewCity} />
            </>
          ) : (
            <SearchCity handleNewCity={handleNewCity} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
