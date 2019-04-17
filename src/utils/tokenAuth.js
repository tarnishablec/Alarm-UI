const alarmToken = 'alarmToken';

export function getToken() {
	return localStorage.getItem(alarmToken)
}

export function setToken(token) {
	return localStorage.setItem(alarmToken, token)
}

export function removeToken() {
	return localStorage.removeItem(alarmToken)
}