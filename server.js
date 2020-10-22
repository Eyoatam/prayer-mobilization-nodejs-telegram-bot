const Markup = require("telegraf/markup");
const fs = require("fs");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const https = require("https");
const request = require("request");
const telgramMessager = require("./Routes/messagesRoutes");

const bot = new Telegraf("1332949002:AAFjeTqA4zoMfwg3AGk1ykG1g--FgWqDmrA");

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { markup } = require("telegraf/extra");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/telegram_message", telgramMessager);
app.use((req, res, next) => {
	console.log("request acepted");
	res.status(200).json({ error: "error" });
});

app.listen(process.env.PORT || 3000, function () {});
