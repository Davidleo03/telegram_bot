import { HfInference } from "@huggingface/inference";
import { Telegraf } from "telegraf";

// Cargar el módulo HTTP de Node.js
import http from 'http'




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
const servidor = http.createServer((req, res) => {
  // Configurar la cabecera de la respuesta
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Enviar respuesta al cliente
  res.end('Hola, Mundo desde Node.js\n');
});

// El servidor escucha en el puerto 3000
const puerto = 3000 || process.env.PORT;
servidor.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
})