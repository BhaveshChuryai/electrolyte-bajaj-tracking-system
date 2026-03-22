import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export const getKPIs = () => API.get('/kpis')
export const getStatus = () => API.get('/status')
export const getComponents = () => API.get('/components')

export default API

