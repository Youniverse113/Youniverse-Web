import axios from 'axios';

//439 Chien
const baseURL = 'http://10.1.1.4:8080/api/'
//host
// const baseURL = '/api'

const api = axios.create({
    baseURL
})

export default api;