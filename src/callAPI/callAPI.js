import axios from 'axios'

const callAPI = axios.create({
  baseURL: 'http://localhost:5000/api'
})
export default callAPI
