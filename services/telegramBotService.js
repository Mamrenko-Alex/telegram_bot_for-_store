import { Telegraf } from "telegraf";
import { findRowByPhoneNumber } from "./googleSheetsService.js";
import { configDotenv } from "dotenv";

configDotenv();

const { BOT_TOKEN } = process.env;

export const bot = new Telegraf(BOT_TOKEN);

bot.on("message", (ctx) => {
  findRowByPhoneNumber(ctx.message.text)
    .then((result) => {
      if (result.length) {
        result.forEach((client) => {
          ctx.reply(
            `Клиент и общая информация
            
    Дата обращения: ${client[0]}
    Номер телефона: ${client[1]}
    Статус заказа: ${client[2]}
    Социальная сеть где написали: ${client[3]}
    Имя: ${client[4]}
    Модель телефона: ${client[5]}
    Проблема: ${client[6]}
    Сайт с которого заказывают: ${client[7]}

Сумма финансов

    Залог: ${client[8]}
    Цена запчасти: ${client[9]}
    Цена доставки: ${client[10]}
    Цена работы: ${client[11]}
    Всего: ${client[12]}
            `
          );
        });
      } else {
        ctx.reply("Данные не найдены.");
      }
    })
    .catch((err) => {
      ctx.reply(`Error: ${err}`);
      console.error("Error: ", err);
    });
});
