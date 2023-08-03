import React, { useEffect, useState } from 'react';
import { getCountries } from './services/getCountries';
import { getCities } from './services/getCities';
import { getCityWeather } from './services/getWeather';
import './css/weather.css'

const App = () => {

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {      //como quiero que esto se haga asincronicamente, entonces voy hacer una funcion autoinvocada, como es una promesa pendiente puedo ponerle un await
      setCountries(await getCountries());
   
      /*    console.log(temp._embedded["city:search-results"]) */
   
    })();
  }, []);




  const countryHandler = async e => {
    const countryCode = e.currentTarget.value
    const temp = await getCities(countryCode);
    setCities(temp._embedded["city:search-results"]) //cities.matching_full_name
    setWeather(null)
  }

    

  const cityHandler = async e => e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value))

//ordenar alfabeticamente tanto los paises como las ciudades 

  countries.sort((a, b) => a.name.common.localeCompare(b.name.common)) 
  cities.sort((a,b)=> a.matching_full_name.localeCompare(b.matching_full_name))

  return (
    <div className='wrapper'>
    <div className='conteiner'>
      <label>Elige el pais:</label>
      <select onChange={countryHandler} className='search' name=''>
        
         {countries.map((country) => <option className='optionSelect' value={country.name.common} key={country.name.common} >{country.name.common}</option>)}
      </select>
      {cities.length > 0 && (
        <div className='secondDiv'>
          <label>Elige una ciudad:</label>
          <select onChange={cityHandler} className='search' >
            <option value=''>Selecciona:</option>
            {cities.map((city) => <option className='optionSelect' key={city.matching_full_name}>{city.matching_full_name}</option>)}
          </select>
        </div>)
      }

      {weather && (
        <div className='wrapperWeather'>
          {  console.log(weather)}
        
          <h2 className='name'>{weather.name}</h2>
          <h3 className='weather'>{weather.weather[0].main}</h3>
          <h3 className='desc'>{weather.weather[0].description}</h3>
        
         
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather'></img>
          <h1>{weather.main.temp}°C</h1>
          <div className='maxmin'>
            <div className='first-child'>
              <p>Max</p>
              <p>{weather.main.temp_max}</p>
            </div>
            <div>
              <p>Min</p>
              <p>{weather.main.temp_min}</p>
            </div>
          </div>
     
         {/*  <pre>
            {JSON.stringify(weather.main,null,2)}
          </pre> truco para ver el JSON en la pagina grande*/}   
        </div>
      )}
      </div>
    </div>
  );
}





//URL https://restcountries.com/v3.1/all 
//https://api.openweathermap.org/data/2.5/weather?units=metric&appid=75bedce8c17dd89d7367342ac716cce8&q=Buenos Aires


export default App;

