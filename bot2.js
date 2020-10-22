const Markup = require("telegraf/markup");
const fs = require("fs");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const { writeDataUsers } = require("../utils");
const https = require("https");
const telgramMessager = require("./Routes/messagesRoutes");

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
	return ctx.reply("Good Choice");
});

bot.command("start", (ctx) => {
	return ctx.reply(
		"welcome to prayer mobilzation",
		Extra.markup((markup) => {
			return markup
				.resize()
				.keyboard([
					markup.contactRequestButton("Send contact", "contact"),
					markup.locationRequestButton("Send location", "location"),
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
