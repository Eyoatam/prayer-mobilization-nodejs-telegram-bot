class BotMarkUpBuilder {
	constructor() {}

	getMenuKeyboard(menuArray) {
		const ReplyKeyboardMarkup = {
			keyboard: [],
			resize_keyboard: true,
			selective: true,
		};
		if (Array.isArray(menuArray)) {
			let rowMenus = [];
			let counter = 1;
			menuArray.forEach((menuItem) => {
				if (counter <= 3) {
					rowMenus.push(this.getMenuKeyboardButton(menuItem));
					counter++;
				} else {
					ReplyKeyboardMarkup.keyboard.push(rowMenus);
					rowMenus = [];
					rowMenus.push(this.getMenuKeyboardButton(menuItem));
					counter = 2;
				}
			});
			if (rowMenus.length > 0) {
				ReplyKeyboardMarkup.keyboard.push(rowMenus);
			}
		}
		return ReplyKeyboardMarkup;
	}
	getMenuKeyboardButton(
		title,
		requestcontact = false,
		requestlocation = false
	) {
		return {
			text: title,
			request_contact: requestcontact,
			request_location: requestlocation,
		};
	}
}
module.exports = BotMarkUpBuilder;
