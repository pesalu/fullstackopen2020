import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({searchTextChangeHandler, newSearchQuery}) => {
    return (
        <div>
            Filter: <input value={newSearchQuery} onChange={searchTextChangeHandler}></input>
        </div>
    )
}

const Countries = ({countries, clickHandler, processIsReady}) => {
  if (countries.length === 0) return (<></>);
  if (countries.length > 10) return (<div>Too many countries!</div>);
  if (countries.length > 1) {
    return (countries.map(
      (country) => {
        if (!country.show) {
          return <Country key={country.id} country={country} clickHandler={clickHandler}></Country>
        } else {
          return <>
            <Country key={country.id} country={country} clickHandler={clickHandler}></Country>
            <CountryDetailed country={country} processIsReady={processIsReady}></CountryDetailed>
            <br/><br/>
          </>
        }
      }
    ));
  }
  if (countries.length === 1) return (<CountryDetailed country={countries[0]} processIsReady={processIsReady} />);
}

const Country = ({country, clickHandler}) => {
  return (<div><span>{country.name} <ShowCountryButton country={country} clickHandler={clickHandler}></ShowCountryButton></span></div>)
}

const ShowCountryButton = ({country, clickHandler}) => {
  return (<button onClick={() => clickHandler(country)}>Show {country.name}</button>);
}

const CountryDetailed = ({country, processIsReady}) => {

  var languages = country.languages.map((language,i) => <li key={i}>{language.name}</li>);
  return (
    <>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <br></br>
      <h3>Languages: </h3>
      <ul>{languages}</ul>
      <h3>Flag</h3>
      <img src={country.flag} alt="flag" height="42"></img>
      <Weather country={country} processIsReady={processIsReady}/>
    </>
  )
}

const Weather = ({country, processIsReady}) => {
  // Find weather of chosen country's capital
  console.log('COUNTRY', country)
  // var temperature = 'test';
  // var name = 'test2';
  const apiKey='aec310d24437fc886ee972b3dfdfac03';
  const url = 'http://api.weatherstack.com/current?';
  const hook = () => {
    console.log('COUNTRY 2')
    axios.get(url + 'access_key=' + apiKey + '&query=' + country.capital)
    .then(response => {
      console.log('DATA ', response.data);
      let weatherData = response.data;
      country.weatherData = weatherData;
      processIsReady(country);
    })
    .catch(console.log('Doesn\'t work'))
  };
  useEffect(hook, []);

  if (!country.weatherData) return (<></>);
  console.log('RENDER')
  return (
    <>
      <h3>Weather in {country.capital}</h3>
      <div><span><strong>temperature:</strong> {country.weatherData.current.temperature} Celsius</span></div>
      <div><img height="42" src={country.weatherData.current.weather_icons[0]} alt="weather "/></div>
      <div><span><strong>wind:</strong> {country.weatherData.current.wind_speed} kph, direction {country.weatherData.current.wind_dir}</span></div>
    </>
  )
  // <div><img height="42" src=/></div>
}

const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ newSearchQueryText, setNewSearchQueryText ] = useState('');
  const [ allClicks, setAllClicks ] = useState([]);

  const url2 = 'https://restcountries.eu/rest/v2/all';

  const hook = () => {
    axios.get(url2)
      .then(response => {
        console.log('effect');
        setCountries(response.data);
      }).catch(console.log('voih'));
  }
  useEffect(hook, []);

  const filteredCountryList = (countries) => {
    if (!newSearchQueryText) return [];
    return countries.filter(country => country.name.toLowerCase().includes(newSearchQueryText.toLowerCase()));
  }

  const searchTextChangeHandler = (event) => setNewSearchQueryText(event.target.value);
  const onClickHandler = (country) => {
    country.show = !country.show;
    setAllClicks(allClicks.concat(country.name));
  };
  const processIsReady = (country) => {
    country.hasWeather = !country.hasWeather;
    setAllClicks(allClicks.concat(country.name));
  }

  return (
    <div>
        <h1>Countries</h1>
        <h2>Find countries</h2>
        <Filter searchTextChangeHandler={searchTextChangeHandler} newSearchQuery={newSearchQueryText}></Filter>
        <Countries countries={filteredCountryList(countries)} clickHandler={onClickHandler} processIsReady={processIsReady}></Countries>
    </div>
  )
}

export default App