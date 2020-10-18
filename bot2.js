const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const { writeDataUsers } = require("../utils");
const bot = new Telegraf("1362797784:AAGSw88xsIT-EiazAPV3WH9oOEZdCjUlq-U");

bot.use(Telegraf.log());

bot.command("prayerTime", (ctx) => {
	return ctx.reply(
		"Choose your preffered prayer time",
		Extra.HTML().markup((m) =>
			m.inlineKeyboard([
				m.callbackButton("1pm", "1pm"),
				m.callbackButton("10am", "10am"),
				m.callbackButton("3pm", "3pm"),
				m.callbackButton("5pm", "5pm"),
			])
		)
	);
});

bot.action(/.+/, (ctx) => {
	return ctx.reply(`Your prayer time is, ${ctx.match[0]}`);
});

bot.command("start", (ctx) => {
	return ctx.reply(
		"Welcome to prayer bot",
		Extra.markup((markup) => {
			return markup
				.resize()
				.keyboard([
					markup.contactRequestButton("contact"),
					markup.locationRequestButton("location"),
				]);
		})
	);
});

bot.on("contact", (ctx) => {
	writeDataUsers("./data/users.json", `${ctx.update.message.chat.first_name}`);
	ctx.reply(
		`first_name: ${ctx.update.message.chat.first_name}, last_name: ${ctx.update.message.chat.last_name}, username: ${ctx.update.message.chat.username}, chat_id: ${ctx.update.message.chat.id}, phone_number:${ctx.update.message.contact.phone_number}`
	);
	bot.on("location", (ctx) => {
		ctx.reply(
			`Latitde: ${ctx.update.message.location.latitude}, Longitude: ${ctx.update.message.location.longitude}`
		);
	});
});

bot.hears("prayer time", (ctx) =>
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
