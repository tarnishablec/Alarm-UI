"use strict";

import Vue from 'vue';
import Router from '../router/router'
import axios from 'axios'
import Store from "../store"
import {getToken} from "../utils/tokenAuth";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem("alarmToken");
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
	baseURL: process.env.baseURL || process.env.apiUrl || "http://172.16.10.140:8080/alarm",
	// timeout: 60 * 1000, // Timeout
	withCredentials: true, // Check cross-site Access-Control
	headers: {
		"Token": getToken()
	},
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
);

// Add a response interceptor
_axios.interceptors.response.use(
		function (response) {
			// Do something with response data
			return response;
		},
		function (error) {
			// Do something with response error
			return Promise.reject(error);
		}
);

Plugin.install = function (Vue, options) {
	Vue.axios = _axios;
	window.axios = _axios;
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios;
			}
		},
		$axios: {
			get() {
				return _axios;
			}
		},
	});
};

Vue.use(Plugin);

export default Plugin;
