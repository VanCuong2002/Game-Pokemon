import axios from 'axios'

const http = axios.create({
    baseURL: 'https://api-ecom.duthanhduoc.com',
    headers: {
        'Content-Type': 'application/json'
    }
})
http.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default http
