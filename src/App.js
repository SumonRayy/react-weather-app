import './App.css';
import React, { useState } from 'react'
import Logo from './components/Logo';
import api from './components/Api';


function App() {


    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if(evt.key === 'Enter'){
            fetch(`${api.url_base}weather?q=${query}&units=metric&APPID=${api.api_key}`)
                .then(res => res.json())
                .then(result => {
                  setWeather(result);
                  setQuery('');
                })
        }
    }

    const dateCreator = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} , ${year}`;
    }

  return (
    <div id='body'>
    <div id='app'  className={(typeof weather.main != 'undefined' &&  weather.main.temp > 30 ? 'hot' : '') || (typeof weather.main != 'undefined' &&  weather.main.temp > 16 ? 'warm' : '' )}>
      <main>
        <Logo />
        <div className="search-box">
        <input type="text" 
        className="search-bar" 
        placeholder="Search Here. . . " 
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        />
        {/* <button type="submit"><i className="fa fa-search"></i></button> */}
        </div>
        {(typeof weather.main  != 'undefined') ? (
        <div className="weather-wrap" >
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country} </div>
          <div className="date">{dateCreator(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
      </div>
      ) : ('')}
        
      </main>
    </div>
    </div>
  )
}





export default App;
