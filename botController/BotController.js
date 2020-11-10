const botRequestController = require("./BotRequest");
class BotController {
	constructor() {
		this.botAPI = new botRequestController(
			"1332949002:AAFjeTqA4zoMfwg3AGk1ykG1g--FgWqDmrA"
		);
	}

	sendMessage(chatId, message, menuButtons, messageButtons, callback) {
		if (chatId != null && message != null) {
			let sendMessage = {
				chat_id: chatId,
				text: message,
			};
			if (menuButtons != null && menuButtons.length > 0) {
				sendMessage = {
					chat_id: chatId,
					text: message,
					reply_markup: this.menuBuilder.getMenuKeyboard(menuButtons),
				};
			} else if (messageButtons != null && messageButtons.length > 0) {
				sendMessage = {
					chat_id: chatId,
					text: message,
					reply_markup: this.menuBuilder.getInlineKeyboard(messageButtons),
				};
			}
			return this.botAPI.sendPostRequest("sendMessage", sendMessage, function (
				error,
				response,
				body
			) {
				callback(error, response, body);
			});
		} else {
			callback(
				"Whoops! Invalid Format! chat_id and message fields are required",
				"sad",
				"sas"
			);
		}
	}
}
module.exports = BotController;
