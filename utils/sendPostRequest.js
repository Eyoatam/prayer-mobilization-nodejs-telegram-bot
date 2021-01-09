const request = require("request");

class postRequest {
	constructor(methodName, api_url, jsonObject, callback) {
		var options = {
			url: api_url,
			method: methodName,
			json: jsonObject,
		};
		request(options, function (error, response, body) {
			callback(error, response, body);
		});
	}
}

module.exports = postRequest;
