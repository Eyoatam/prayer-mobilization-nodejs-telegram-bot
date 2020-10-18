const Markup = require("telegraf/markup");
const fs = require("fs");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const https = require("https");
const request = require("request");
const { sendPostRequest } = require("./botController/BotRequest");
const telgramMessager = require("./Routes/messagesRoutes");

const bot = new Telegraf("1362797784:AAGSw88xsIT-EiazAPV3WH9oOEZdCjUlq-U");

// bot.use(Telegraf.log());

// bot.command("prayertime", (ctx) => {
// 	return ctx.reply(
// 		"Choose your preffered prayer date",
// 		Extra.HTML().markup((m) =>
// 			m.inlineKeyboard([
// 				m.callbackButton("MON", "1pm"),
// 				m.callbackButton("TUE", "10am"),
// 				m.callbackButton("THU", "3pm"),
// 				m.callbackButton("FRI", "5pm"),
// 				m.callbackButton("SAT", "4pm"),
// 			])
// 		)
// 	);
// });

// bot.action(/.+/, (ctx) => {
// 	return ctx.reply("Good Choice");
// });

bot.command("start", (ctx) => {
	return ctx.reply(
		"welcome to prayer mobilzation",
		Extra.markup((markup) => {
			return markup
				.resize()
				.keyboard([markup.contactRequestButton("Send contact")]);
		})
	);
});

bot.on("contact", (ctx) => {
	let userObject = {
		first_name: ctx.update.message.chat.first_name,
		last_name: ctx.update.message.chat.last_name,
		username: ctx.update.message.chat.username,
		Chat_Id: ctx.update.message.chat.id,
		phone_number: ctx.update.message.contact.phone_number,
	};
	const api_url = "https://instant-prayer-api.herokuapp.com/api/users";
	var options = {
		uri: api_url,
		method: "POST",
		json: userObject,
	};
	request(options, function (error, response, body) {
		if (error) {
			console.log(error);
		} else {
			ctx.reply("Welcome Dear User");
		}
	});
});

// bot.on("location", (ctx) => {
// 	ctx.reply(
// 		`Latitde: ${ctx.update.message.location.latitude}, Longitude: ${ctx.update.message.location.longitude}`
// 	);
// 	let userObject = {
// 		latitude: ctx.update.message.location.latitude,
// 		longitude: ctx.update.message.location.longitude,
// 	};
// 	const api_url = "https://instant-prayer-api.herokuapp.com/api/users";
// 	var options = {
// 		uri: api_url,
// 		method: "POST",
// 		json: userObject,
// 	};
// 	request(options, function (error, response, body) {
// 		callback(error, response, body);
// 	});
// });

bot.launch();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { markup } = require("telegraf/extra");

app.use(bodyParser.urlencoded({ exteded: false }));
app.use(bodyParser.json());
app.use("/telegram_message", telgramMessager);
app.use((req, res, next) => {
	console.log("request acepted");
	res.status(200).json({ error: "error" });
});

// app.listen(3000, "192.168.0.20", function () {});
