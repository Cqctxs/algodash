import axios from 'axios';
const BASE_URL = 'http://34.16.144.18'; //SERVER

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});