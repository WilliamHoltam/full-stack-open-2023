import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'
import countryService from './services/countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect run, country is now', value)

    // skip if country is not defined
    if (value) {
      console.log('fetching countries information...')
      countryService
        .getAll()
        .then(
          initialCountries => {
            setCountries(initialCountries.filter(country => country.name.common.toLowerCase().includes(value)))
          }
        )

    }
  }, [value])

  const handleChange = (event) => {
    console.log(event.target)
    setValue(event.target.value)
  }

  return (
    <div>
      <form >
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <SearchResult countries={countries} />
    </div>
  )
}

export default App
