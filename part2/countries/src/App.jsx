import { useState, useEffect } from 'react'
import countryServices from './services/country.js'

const SearchResult = ({countries, countryName}) => {
  console.log(countries);
  if(countries) {
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(countryName.toLowerCase()))
    
    if(filteredCountries.length === 1){
        const country = filteredCountries[0]
        const countryLanguages = []
        Object.keys(country.languages).forEach((l, i) => {
          console.log(country.languages[l])
          countryLanguages.push(<li key={l}>{country.languages[l]}</li>)
        })
      
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {countryLanguages}
          </ul>
          <img src={country.flags.png} />
        </div>
      )    
    }
    
    return (   
      <div>
        {filteredCountries.map((c) => <p key={c.name.common}>{c.name.common}</p>)}
      </div>
    )
  }
}

function App() {
  const [countryName, setCountryName] = useState('')
  const [allCountryList, setAllCountryList] = useState(null)
  const typeCountryInput = (e) => setCountryName(e.target.value)
  
  useEffect(() => {countryServices.getAll().then(res => setAllCountryList(res))},[])

  if(allCountryList)
  return (
    <>
    <div>
      find countries <input value={countryName} onChange={typeCountryInput}></input>
    </div>
    <SearchResult countries={allCountryList} countryName={countryName} />
    </>
  )
}

export default App
