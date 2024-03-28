import axios from 'axios';

//439 Chien
const baseURL = 'http://10.1.1.4:8080/api/'
//host
// const baseURL = '/api'

//chien iphone
// const baseURL = 'http://172.20.10.11:8080/api/'

// aAa
// const baseURL = 'http://192.168.1.138:8080/api/'

const api = axios.create({
    baseURL
})

export default api;