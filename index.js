const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

require("dotenv").config(); // Add this at the top of your file
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = "https://peaceful-dodol-c7fe60v.netlify.app";
const bot = new TelegramBot(token, { polling: true });
const { sequelize } = require("./src/models/db.js");
const { Adress, Recipient, Commodity } = require("./src/models/models.js");
const app = express();

app.use(express.json());
app.use(cors());

async function createAdress(country, city, street, post_code) {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");

    const adress = await Adress.create({ country, city, street, post_code });
    console.log("Model creation test passed");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

async function createRecipient(name, email, username, phone_number) {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");

    const recipient = await Recipient.create({
      name,
      email,
      username,
      phone_number,
    });
    console.log("Model creation test passed");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

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

      await bot.sendMessage(chatId, `Delivery address: ${data?.country}, ${data?.city}, ${data?.street}\n Post code: ${data?.post_code}`);
      await createAdress(data?.country, data?.city, data?.street, data?.post_code);
      await bot.sendMessage( chatId, `Recipient: ${data?.first_name}, ${data?.last_name}, ${data?.phone_number}\n`);
      await createRecipient(data?.first_name + " " + data?.last_name, data?.email, data?.username, data?.phone_number);
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

app.post("/web-data", async (req, res) => {
  const { queryId, products, totalPrice } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Order Confirmation",
      input_message_content: {
        message_text: `Thank you for your order!\nTotal price: ${totalPrice}, ${products
          .map((item) => item.title)
          .join(", ")}`,
      },
    });
    return res.status(200).json({});
  } catch (e) {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "failed purchase",
      input_message_content: {
        message_text: `failed to purchased the product`,
      },
    });
    return res.status(500).json({});
  }
});
const PORT = 8000;
app.listen(PORT, () => console.log("server started on PORT " + PORT));
