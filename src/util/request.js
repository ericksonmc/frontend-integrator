/* eslint-disable no-undef */
import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;
export const appendBase = (url) => `${API_URL}${url}`;

export const get = (url) => {
    return axios.get(appendBase(url));
};
export const post = (url, payload, config = {}) => {
    return axios.post(appendBase(url), payload, config);
};
export const put = (url, payload) => {
    return axios.put(appendBase(url), payload);
};
export const destroy = (url, payload) => {
    return axios.delete(appendBase(url), payload);
};

export const setAuthToken = (token) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

export const deleteAuthToken = () => {
    delete axios.defaults.headers.common.Authorization;
};

const request = { get, post, put, destroy };

export default request;
