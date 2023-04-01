import React, { useState } from "react";

const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const handleChangetemp = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <article className="card">
      <h1 className="card__title">Weather App</h1>
      <h2 className="card__location">
        {weather?.name}, {weather?.sys.country}
      </h2>
      <div className="card__main">
        <img
          className="card__img"
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
          alt=""
        />
        <section className="card__info">
          <h3 className="card__description">
            {weather?.weather[0].description}
          </h3>
          <ul className="card__list">
            <li className="card__item">
              <span>Wind Speed: {weather?.wind.speed}m/s</span>
            </li>
            <li className="card__item">
              <span>Clouds: {weather?.clouds.all}%</span>
            </li>
            <li className="card__item">
              <span>Pressure: {weather?.main.pressure}hPa</span>
            </li>
          </ul>
        </section>
      </div>
      <footer className="card__footer">
        <h2 className="card__temp">
          {isCelsius ? temp?.celsius + `C` : temp?.farenheit + `F`}
        </h2>
        <button className="card__btn" onClick={handleChangetemp}>
          {isCelsius ? "Change to farenheit" : "Change to Celsius"}
        </button>
      </footer>
    </article>
  );
};

export default WeatherCard;
