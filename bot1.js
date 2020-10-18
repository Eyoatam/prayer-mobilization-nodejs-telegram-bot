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
