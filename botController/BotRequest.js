const request = require("request");
class BotRequest {
	constructor(botToken) {
		this.telegram_api = "https://api.telegram.org/bot";
		this.telegram_bot_api = this.telegram_api + botToken;
	}

	sendPostRequest(methodName, jsonObject, callback) {
		const api_url = this.telegram_bot_api + "/" + methodName;
		var options = {
			uri: api_url,
			method: "POST",
			json: jsonObject,
		};
		request(options, function (error, response, body) {
			callback(error, response, body);
		});
	}
}

module.exports = BotRequest;
