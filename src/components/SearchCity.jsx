import React from "react";

const SearchCity = ({ handleNewCity }) => {
  return (
    <div className="search">
      {
        <form onSubmit={handleNewCity} className="search__Form">
          <input
            id="city"
            type="text"
            placeholder="Introduce a city"
            className="search__Input"
          />
          <button className="search__btn">Search city</button>
        </form>
      }
    </div>
  );
};

export default SearchCity;
