import { useState, useEffect } from 'react'
import countryServices from './services/country.js'
import axios from 'axios'


const Weather = ({country}) => {
  const [weatherData, setWeatherData] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${api_key}&q=`
  const cityQuery = `${country.capital[0]},${country.cca2}`
  useEffect(() => {
    async function fetch() {
      await axios.get(baseUrl + cityQuery).then(res => setWeatherData(res.data));
    }
    fetch();
  }, [])

  if(weatherData){
    return (
    <div>
      <h2>{`Weather in ${country.capital[0]}`}</h2>
      <p>Temperature: {weatherData.main.temp} ℃</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
      <p>Wind: {weatherData.wind.speed} m/s</p>
    </div>)
  }
}

const CountryDetail = ({country}) => {
  const countryLanguages = []
  Object.keys(country.languages).forEach((l, i) => {
    countryLanguages.push(<li key={l}>{country.languages[l]}</li>)
  })

  return (<>
          <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {countryLanguages}
          </ul>
          <img src={country.flags.png} />
          <Weather country={country} />
        </div>
  </>)
}

const SearchResult = ({countries, countryName, setAllCountryList, setCountryName}) => {
  const [countryNum, setCountryNum] = useState(null)
  useEffect(() => setCountryNum(null), [countryName])

  if(countries) {
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(countryName.toLowerCase()))
   
    // when viewing a specific country's details
    if(countryNum != null){
      const viewedCountry = countries.filter(c => c.cca2.includes(countryNum))
      return (
        <div>
          <div>{viewedCountry[0].name.common}<button onClick={() => setCountryNum(null)}> hide</button></div>
          <CountryDetail country={viewedCountry[0]} />
        </div>
      )
    }

 
    // if there's only one country show details of it
    if(filteredCountries.length === 1){
        const country = filteredCountries[0]      
      return (
        <div>
          <CountryDetail country={country}/>
        </div>
      )    
    }
    
    // by default list all the filtered countries
    return (
      <div>
        {filteredCountries.map((c, i) => {
            return (
              <div key={c.name.common}>{c.name.common} <button onClick={() => setCountryNum(c.cca2)}>show</button></div>)
          })
        }
      </div>
    )
  }
}

function App() {
  const [countryName, setCountryName] = useState('')
  const [allCountryList, setAllCountryList] = useState(null)
  const typeCountryInput = (e) => { 
    setCountryName(e.target.value) }
  
  useEffect(() => {countryServices.getAll().then(res => {
    res.map(r => r.detailToggle = false)
    setAllCountryList(res)
  })},[])

  if(allCountryList)
  return (
    <>
    <div>
      find countries <input value={countryName} onChange={typeCountryInput}></input>
    </div>
    <SearchResult countries={allCountryList} countryName={countryName} setAllCountryList={setAllCountryList} setCountryName={setCountryName} />
    </>
  )
}

export default App
