//  ----------First test********
const Telegraf = require("telegraf");
const { MenuTemplate, MenuMiddleware } = require("telegraf-inline-menu");

const menuTemplate = new MenuTemplate(
	() => "Welcome\n" + "I am a dummy bot that will do nothing"
);

menuTemplate.interact("I am excited!", "a", {
	do: async (ctx) => {
		ctx.reply("As am I!");
		return false;
	},
});

menuTemplate.interact("This is awesome", "b", {
	do: async (ctx) => {
		ctx.reply("Yea this is awesome");
		ctx.reply("😎");
		return true;
	},
});

const bot = new Telegraf("1362797784:AAEFtx3gwW7UGRVkPXO8xhkIPq2Sp6Oan94");

const menuMiddleware = new MenuMiddleware("/", menuTemplate);
bot.start((ctx) => ctx.reply(`Deep link payload: ${ctx.startPayload}`));
bot.command("start", (ctx) => menuMiddleware.replyToContext(ctx));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.hears("hi", (ctx) => ctx.reply("👋"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.use(menuMiddleware);

bot.launch();

// ----------Second Test************

const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");

const keyboard = Markup.inlineKeyboard([
	Markup.loginButton({
		bot_username: "somero_bot",
		request_write_access: true,
	}),
	Markup.urlButton("❤️", "http://telegraf.js.org"),
	Markup.callbackButton("Delete", "delete"),
]);

const bot = new Telegraf("1362797784:AAGSw88xsIT-EiazAPV3WH9oOEZdCjUlq-U");
bot.start((ctx) => ctx.reply("Hello"));
bot.action("delete", ({ deleteMessage }) => deleteMessage());
bot.launch();

const Telegraf = require("telegraf");
const { Extra, Markup } = Telegraf;

const keyboard = Markup.keyboard([
	Markup.pollRequestButton("Create poll", "regular"),
	Markup.pollRequestButton("Create quiz", "quiz"),
]);

const bot = new Telegraf("1362797784:AAGSw88xsIT-EiazAPV3WH9oOEZdCjUlq-U");

bot.on("poll", (ctx) => console.log("Poll update", ctx.poll));
bot.on("poll_answer", (ctx) => console.log("Poll answer", ctx.pollAnswer));

bot.start((ctx) =>
	ctx.reply("supported commands: /poll /quiz", Extra.markup(keyboard))
);

bot.command("poll", (ctx) =>
	ctx.replyWithPoll("Your favorite math constant", ["x", "e", "π", "φ", "γ"], {
		is_anonymous: false,
	})
);
bot.command("quiz", (ctx) =>
	ctx.replyWithQuiz("2b|!2b", ["True", "False"], { correct_option_id: 0 })
);

bot.launch();
// Third Test***********##########

const Telegraf = require("telegraf");

function sendLiveLocation(ctx) {
	let lat = 42.0;
	let lon = 42.0;
	ctx.replyWithLocation(lat, lon, { live_period: 60 }).then((message) => {
		const timer = setInterval(() => {
			lat += Math.random() * 0.001;
			lon += Math.random() * 0.001;
			ctx.telegram
				.editMessageLiveLocation(lat, lon, message.chat.id, message.message_id)
				.catch(() => clearInterval(timer));
		}, 1000);
	});
}

const bot = new Telegraf("1362797784:AAGSw88xsIT-EiazAPV3WH9oOEZdCjUlq-U");
bot.start(sendLiveLocation);
bot.launch();
