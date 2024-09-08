# OmmiEye Bot

OmmiEye es un bot de Telegram que utiliza Hugging Face para describir imágenes enviadas por los usuarios y traducir las descripciones del inglés al español. 

## Características
- Recibe imágenes de los usuarios.
- Utiliza el modelo Salesforce/blip-image-captioning-large de Hugging Face para generar descripciones en inglés de las imágenes.
- Traduce las descripciones al español utilizando el modelo Helsinki-NLP/opus-mt-en-es.
- Responde al usuario con la descripción traducida de la imagen.

## Requisitos

- Node.js 14 o superior.
- Una cuenta en [Hugging Face](https://huggingface.co/) con acceso a la API de Inference.
- Un bot de Telegram configurado (con el token del bot).

## Instalación

.1 Ejecuta los siguientes comandos
    npm i @huggingface/inference telegraf

    npm i nodemon -D

.2 Inicia el servidor
    
    npm run dev

    

