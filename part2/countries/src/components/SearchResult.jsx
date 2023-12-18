const TooManyMatches = () => <div>Too many matches, specify another filter</div>

const CountryNames = ({ countries, onClick }) =>
    countries.map(
        country =>
            <div key={country.name.common}>{country.name.common}
                <button onClick={() => onClick(country)}>show</button>
            </div >)

const WeatherInfo = ({ temp, icon_code, alt, wind_speed }) => {
    const baseUrl = "https://openweathermap.org/img/wn"
    return (
        <div>
            <div>temperature {temp} Celcius</div>
            <img src={`${baseUrl}/${icon_code}@2x.png`} alt={alt} />
            <div>wind {wind_speed} m/s</div>
        </div>
    )
}

const CountryInfo = ({ capital, area, languages, flags }) => {
    return (
        <div>
            <div>capital {capital} </div>
            <div>area {area}</div>
            <h2>languages:</h2>
            <ul>
                {Object.values(languages).map(
                    language =>
                        <li key={language}>{language}</li>
                )}
            </ul>
            <img src={flags.png} alt={flags.alt} />
        </div>
    )
}

const Info = ({ country, weather }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <CountryInfo
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                flags={country.flags} />
            <h2>Weather in {country.capital}</h2>
            <WeatherInfo
                icon_code={weather.current.weather[0].icon}
                alt={weather.current.weather[0].description}
                temp={weather.current.temp}
                wind_speed={weather.current.wind_speed} />
        </div >
    )
}

const SearchResult = ({ countries, weather, onClick }) => {
    if (weather && countries) {
        if (countries.length === 0) {
            console.log(countries)
            return <div></div>
        }
        if (countries.length > 10) {
            return <TooManyMatches />
        } else if (countries.length > 1) {
            return <CountryNames countries={countries} onClick={onClick} />
        } else {
            return <Info country={countries[0]} weather={weather} />
        }
    }
}

export default SearchResult
