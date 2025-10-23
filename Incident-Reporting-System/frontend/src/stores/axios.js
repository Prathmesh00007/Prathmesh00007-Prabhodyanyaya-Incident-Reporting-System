import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://prathmesh00007-prabhodyanyaya-incident-ostr.onrender.com/api",
    withCredentials: true,
});