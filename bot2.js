const Markup = require("telegraf/markup");
const fs = require("fs");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const { writeDataUsers } = require("../utils");
const https = require("https");
const telgramMessager = require("./Routes/messagesRoutes");

// sendPostRequest(methodName, jsonObject, callback) {
// 	var options = {
// 		uri: "https://dashboard.heroku.com/apps/instant-prayer-api",
// 		method: "POST",
// 		json: jsonObject,
// 	};
// 	request(options, function (error, response, body) {
// 		callback(error, response, body);
// 	});
// }
const bot = new Telegraf("1362797784:AAGSw88xsIT-EiazAPV3WH9oOEZdCjUlq-U");

bot.use(Telegraf.log());

bot.command("prayertime", (ctx) => {
	return ctx.reply(
		"Choose your preffered prayer date",
		Extra.HTML().markup((m) =>
			m.inlineKeyboard([
				m.callbackButton("MON", "1pm"),
				m.callbackButton("TUE", "10am"),
				m.callbackButton("THU", "3pm"),
				m.callbackButton("FRI", "5pm"),
				m.callbackButton("SAT", "4pm"),
			])
		)
	);
});

bot.action(/.+/, (ctx) => {
	return ctx.reply(
		`You have chosen ${ctx.match[0]}, as your prayer date Now choose your prayer time`,
		Extra.HTML().markup((m) =>
			m.inlineKeyboard([
				m.callbackButton("1:00", "1pm"),
				m.callbackButton("2:00", "2am"),
				m.callbackButton("3:00", "3pm"),
				m.callbackButton("4:00", "4pm"),
				m.callbackButton("5:00", "5pm"),
				m.callbackButton("6:00", "6pm"),
			])
		)
	);
});

bot.command("start", (ctx) => {
	return ctx.reply(
		"Welcome Top prayer mobilization",
		Extra.markup((markup) => {
			return markup
				.resize()
				.keyboard([
					markup.contactRequestButton("Send contact"),
					markup.locationRequestButton("Send location"),
				]);
		})
	);
});

bot.on("contact", (ctx) => {
	ctx.reply(
		`first_name: ${ctx.update.message.chat.first_name}, last_name: ${ctx.update.message.chat.last_name}, username: ${ctx.update.message.chat.username}, chat_id: ${ctx.update.message.chat.id}, phone_number:${ctx.update.message.contact.phone_number}, user_id:${ctx.update.message.contact.user_id}`
	);
	bot.on("location", (ctx) => {
		ctx.reply(
			`Latitde: ${ctx.update.message.location.latitude}, Longitude: ${ctx.update.message.location.longitude}`
		);
	});
});

bot.hears("prayertime", (ctx) =>
	ctx.reply(
		"Choose your preffered prayer time",
		Extra.HTML().markup((m) =>
			m.inlineKeyboard([
				m.callbackButton("1pm", "1pm"),
				m.callbackButton("10am", "10am"),
				m.callbackButton("3pm", "3pm"),
				m.callbackButton("5pm", "5pm"),
			])
		)
	)
);

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

app.listen(3000, "192.168.0.20", function () {});
