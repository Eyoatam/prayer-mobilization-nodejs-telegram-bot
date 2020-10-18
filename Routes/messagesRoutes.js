const express = require("express");
const router = express.Router();
const botApi = require("../botController/BotController");
const botApiCtl = new botApi();

router.post("/", (req, res, next) => {
	const botId = req.query.bot_id;
	const data = req.body;
	console.log("Data:", data);
	botApiCtl.sendMessage(
		data["chat_id"],
		data["message"],
		data["menu_buttons"],
		data["message_buttons"],
		function (error, response, body) {
			if (error) {
				res.status(500).json({
					status: true,
					message: "whoops! failed to send Message",
					error: error,
				});
			} else {
				res.status(200).json({
					status: true,
					result: body,
					message: "message sent successfully",
				});
			}
		}
	);
});

module.exports = router;
