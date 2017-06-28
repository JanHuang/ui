import axios from 'axios';
import qs from 'qs';

let base = 'http://localhost:9876';

export const requestLogin = params => {
    return axios.post(base + '/api/login', params).then(res => res.data);
};
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
export const getUsers = (params) => {
    return axios.get(base + '/api/users', params).then(res => res.data);
};
export const addUser = (params) => {
    return axios.post(`${base}/api/users`, qs.stringify(params)).then(res => res.data);
};
export const editUser = (id, params) => {
    return axios.patch(`${base}/api/users/${id}`, qs.stringify(params)).then(res => res.data);
};
export const removeUser = (id) => {
    return axios.patch(`${base}/api/users/${id}`).then(res => res.data);
};
export const getGroups = (params) => {
    return axios.get(`${base}/api/groups`, qs.stringify(params)).then(res => res.data);
};
export const getPosts = (params) => {
    return axios.get(`${base}/api/posts`, qs.stringify(params)).then(res => res.data);
};
export const getTags = (params) => {
    return axios.get(`${base}/api/tags`, qs.stringify(params)).then(res => res.data);
};
export const getDiscussions = (params) => {
    return axios.get(`${base}/api/discussions`, qs.stringify(params)).then(res => res.data);
};
