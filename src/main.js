import { HfInference } from "@huggingface/inference";
import { Telegraf } from "telegraf";

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})





const hf = new HfInference('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');
const bot = new Telegraf('7281464980:AAGc3PyU1MCdrmt40W2AScXEgMtP9-D9fis');

bot.start(ctx => ctx.reply(`Hola ${ctx.message.chat.first_name} soy OmmiEye`))



// Recibe las imágenes enviadas por el usuario
bot.on('photo', async (ctx) => {
    try {
        const fileId = ctx.message.photo.pop().file_id;
        const fileUrl = await ctx.telegram.getFileLink(fileId);



       const response = await fetch(fileUrl);
       const blob = await response.blob();

       // Envía la imagen a Hugging Face para descripción
       const description = await hf.imageToText({
           data: blob,
           model: 'Salesforce/blip-image-captioning-large'
        });

       // Envía la descripción al usuario
       if (description) {  
           const { generated_text } = description;
           const {translation_text} = await hf.translation({
            model: 'Helsinki-NLP/opus-mt-en-es',
            inputs: generated_text
          })
          console.log(translation_text)
    
        ctx.reply(translation_text)   
        } else {
            ctx.reply('Lo siento, no pude describir la imagen.');
        }  
    } catch (error) {
        console.log(error);
        ctx.reply('Ha ocurrido un error')
    }       
});

// Inicia el bot
bot.launch();

console.log('Bot está funcionando...');

// Crear un servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
