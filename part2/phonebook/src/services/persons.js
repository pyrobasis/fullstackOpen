import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)
const create = person => axios.post(baseURL, person).then(response => response.data)
const remove = (id) => axios.delete(`${baseURL}/${id}`)

export default {
    getAll,
    create,
    remove
}
