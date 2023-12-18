import { useState, useEffect } from 'react'
import SearchResult from './components/SearchResult'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log('effect run, country is now', value)
    // skip if country is not defined
    if (value) {
      console.log('fetching countries information...')
      countryService
        .getAll()
        .then(initialCountries => initialCountries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase())))
        .then(countriesResult => {
          if (countriesResult.length === 1) {
            weatherService
              .getWeather(countriesResult[0].latlng[0], countriesResult[0].latlng[1])
              .then(weatherResult => {
                console.log("Weather:", weatherResult)
                setWeather(weatherResult)
              })
          }
          console.log("Countries", countriesResult)
          setCountries(countriesResult)
        })
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClick = (event) => {
    setCountries([event])
  }

  return (
    <div>
      <form >
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <SearchResult countries={countries} weather={weather} onClick={handleClick} />
    </div>
  )
}

export default App
