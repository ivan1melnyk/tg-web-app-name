const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config(); // Add this at the top of your file
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = "https://peaceful-dodol-c7fe60v.netlify.app";
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
  } else if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg.web_app_data.data);
      console.log(data);

      await bot.sendMessage(chatId, "Thank you for your order!\n");
      await bot.sendMessage(
        chatId,
        `Your address is ${data?.country}, ${data?.city}, ${data?.street}\n`
      );

      setTimeout(async () => {
        await bot.sendMessage(
          chatId,
          "You will receive all the information about your order in this chat"
        );
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  } else {
    await bot.sendMessage(chatId, "Received your message");
  }
});
