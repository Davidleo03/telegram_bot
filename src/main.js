import express from 'express'
import bot from './bot.js';

const app = express()


app.use(bot.webhookCallback('/bot'))

app.get('/', (req, res) => res.send('Servidor Corriendo'));

bot.telegram.setWebhook('https://telegram-bot-1-kbv2.onrender.com');

const port = 3000 || process.env.PORT;

app.listen(port, () => console.log('Server Active'))



console.log('Bot está funcionando...');

