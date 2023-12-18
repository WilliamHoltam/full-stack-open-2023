const TooManyMatches = () => <div>Too many matches, specify another filter</div>

const CountryNames = ({ countries }) =>
    countries.map(
        country =>
            <div key={country.id}>{country.name.common}</div>
    )

const CountryInfo = ({ name, capital, area, languages, flags }) =>
    <div>
        <h1>{name}</h1>
        <p>
            <div>capital {capital} </div>
            <div>area {area}</div>
        </p>
        <h2>languages:</h2>
        <p>
            <ul>
                {Object.values(languages).map(
                    language =>
                        <li key={language}>{language}</li>
                )}
            </ul>
        </p>
        <img src={flags.png} alt={flags.alt} />
    </div>

const SearchResult = ({ countries }) => {
    console.log(countries)
    if (countries.length > 10) {
        return <TooManyMatches />
    } else if (countries.length > 1) {
        return <CountryNames countries={countries} />
    } else {
        const country = countries[0]
        return <CountryInfo name={country.name.common} capital={country.capital} area={countries[0].area} languages={country.languages} flags={country.flags} />
    }
}

export default SearchResult
