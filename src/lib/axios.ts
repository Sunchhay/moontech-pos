import axios from "axios";
import Cookies from "js-cookie";

export const BaseUrl = 'http://192.168.0.109:8080/api/v1/';

export default axios.create({
    baseURL: BaseUrl
});


export const axiosToken = axios.create({
    baseURL: BaseUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});


const ApiManager = {
    get: async (end_point: any, object?: any) => {
        let token = Cookies.get('token');
        return await (await fetch(`${BaseUrl}${end_point}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(object)
        })).json();
    },
    post: async (end_point: any, object?: any) => {
        return await (await fetch(`${BaseUrl}${end_point}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })).json();
    },
    POST: async (end_point: any, object?: any) => {
        //   let token = await AsyncStorage.getItem('@token');
        let token = Cookies.get('token');
        return await (await fetch(`${BaseUrl}${end_point}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(object)
        })).json();
    },
    FormDataPOST: async (end_point: any, formdata?: any) => {
        //   let token = await AsyncStorage.getItem('@token');
        let token = Cookies.get('token');
        return await (await fetch(`${BaseUrl}${end_point}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formdata
        })).json();
    },
};

export { ApiManager };
