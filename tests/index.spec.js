const postRequest = require("../utils/sendPostRequest");

test("Test for post requests", () => {
	const api_url = "https://google.com";
	const jsonObject = {
		name: "test",
	};
	new postRequest("POST", api_url, jsonObject, (error) => {
		if (error) {
			console.log(error);
		} else {
			return;
		}
	});
});
