export default {
	promiseResponseHandler(response) {
		return response.data.resultDesc === "操作成功";
	},
}