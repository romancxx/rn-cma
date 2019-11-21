
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const API_URL = "http://myapi.com/"

export const client = axios.create({
    baseURL: API_URL,
    responseType: 'json',
});

const errorHandler = /*async*/ (res: AxiosError) => {
    
}

//INTERCEPTOR
