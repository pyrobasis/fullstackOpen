import axios from 'axios'

const countryBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => axios.get(countryBaseUrl + `all`).then(res => res.data)

export default {
    getAll
}