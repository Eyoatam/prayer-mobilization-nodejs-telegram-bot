const express = require("express");
const request = require("request");
const telgramMessager = require("./Routes/messagesRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/telegram_message", telgramMessager);
app.use((req, res, next) => {
	console.log("request acepted");
	res.status(200).json({ error: "error" });
	next();
});

app.listen(process.env.PORT || 3000, function () {});
