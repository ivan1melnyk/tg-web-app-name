const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config(); // Add this at the top of your file
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = "http://www.google.com/";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text == "/start") {
    await bot.sendMessage(
      chatId,
      "A button will appear below, fill out the form",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Fill out the form",
                web_app: { url: webAppUrl + "/form" },
              },
            ],
          ],
        },
      }
    );

    await bot.sendMessage(chatId, "Go to our online store", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Make order", web_app: { url: webAppUrl } }],
        ],
      },
    });
  }

  await bot.sendMessage(chatId, "Received your message");
});
