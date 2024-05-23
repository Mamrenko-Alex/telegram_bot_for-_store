import { google } from "googleapis";
import { client } from "../app.js";
import { configDotenv } from "dotenv";

configDotenv();

const { SHEED_Id, RANGE } = process.env;

export async function findRowByPhoneNumber(findData) {
  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = SHEED_Id;
  const range = RANGE;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows.length) {
      const foundRows = [];

      rows.forEach((row) => {
        if (row[1] === findData || row[4] === findData) {
          foundRows.push(row);
        }
      });
      return foundRows;
    } else {
      return "Данные не найдены.";
    }
  } catch (err) {
    console.error("Ошибка при чтении данных:", err);
    throw err;
  }
}
