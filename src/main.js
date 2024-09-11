import express from 'express'
import bot from './bot.js';

const app = express()


app.use(bot.webhookCallback('/bot'))

app.get('/', (req, res) => res.send('Servidor Corriendo'));



const port = 3000 || process.env.PORT;

app.listen(port, () => console.log('Server Active'))

bot.telegram.setWebhook('https://telegram-ommieye.onrender.com');


console.log('Bot está funcionando...');

