import router from './router'
import {getToken} from "../utils/tokenAuth";

router.beforeEach((to, from, next) => {
	if (getToken()) {
		if (to.path === '/login') {
			next({path: '/'})
		} else {
		}
	}
});