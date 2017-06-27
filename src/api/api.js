import axios from 'axios';

let base = 'http://localhost:9876';

export const find = (url, params) => {
    return axios.get(base + url, {params: params}).then(res => res.data)
};
export const create = (url, params) => {
    return axios.post(base + url, {params: params}).then(res => res.data)
};
export const remove = (url, params) => {
    return axios.delete(base + url, {params: params}).then(res => res.data)
};
export const update = (url, params) => {
    return axios.patch(base + url, {params: params}).then(res => res.data)
};

export const requestLogin = params => {
    return axios.post(base + '/api/login', params).then(res => res.data);
};