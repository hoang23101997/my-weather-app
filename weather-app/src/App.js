import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { icons } from "./data";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [image, setImg] = useState(icons);
  
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3e8b76bd3d47a474add1297b26ca6908`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log(response.data.name)
        icons.forEach((item, index) => {
          if (item.type === response.data.weather[0].main) {
            image[1] = item.img;
            console.log(image[1]);
          }
        });
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main && data.main ? (
              <h1>{data.main.temp.toFixed(0) - 273}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? (
              <div>
                <p>{data.weather[0].main}</p>
                <p>
                  <img src={image[1]}></img>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
