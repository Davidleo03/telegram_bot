import { createServer } from "http";
import bot from './bot.js';





const port = 3000 || process.env.PORT;

createServer(await bot.createWebhook({ domain: "https://telegram-ommieye.onrender.com" })).listen(port);




console.log('Bot está funcionando...');

