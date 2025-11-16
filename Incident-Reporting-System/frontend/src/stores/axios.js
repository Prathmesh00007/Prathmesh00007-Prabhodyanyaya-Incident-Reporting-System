import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://prathmesh00007-prabhodyanyaya-incident.onrender.com/api",
    withCredentials: true,
});