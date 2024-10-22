import axios from "axios";

export const BaseUrl = 'http://192.168.1.2:8080/api/v1/';
// export const BaseUrl = 'http://192.168.1.3:8080/api/v1/';
// export const BaseUrl = 'http://192.168.0.105:8080/api/v1/';
// export const BaseUrl = 'http://172.20.10.9:8080/api/v1/';
// export const BaseUrl = `http://170.205.36.252/api/v1/`;

let token = localStorage.getItem('token');

export default axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/form-data',
        'Authorization': `Bearer ${token}`
    },
});

const ApiManager = {
    get: async (end_point: any, object?: any) => {
        return await (await fetch(`${BaseUrl}${end_point}`, {
            method: 'GET',
            headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
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
        return await (await fetch(`${BaseUrl}${end_point}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(object)
        })).json();
    },
    FormDataPOST: async (end_point: any, formdata?: any) => {
        return await (await fetch(`${BaseUrl}${end_point}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formdata
        })).json();
    },
};

export { ApiManager };
