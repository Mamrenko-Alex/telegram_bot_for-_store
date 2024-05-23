import { google } from "googleapis";
import { bot } from "./services/telegramBotService.js";
import { configDotenv } from "dotenv";

configDotenv();

const { CLIENT_EMAIL, PRIVATE_KEY } = process.env;

export const client = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

async function startBot() {
  bot.launch();
  await client.authorize();
  console.log("Server is running.");
}

startBot();
