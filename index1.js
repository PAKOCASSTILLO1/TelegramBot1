const TelegramBot = require('node-telegram-bot-api');
const token = '1003576470:AAHmyEcHysH6uU7kNpqW6xpKby-ZHDY1rfw';
const bot = new TelegramBot(token, {polling:true});
const request = require('request');

bot.on('polling_error', function(error){
    console.log(error);
});

// --------------------- LOGICA DEL BOT ---------------------

bot.onText(/^hola/,(msg) => {
    bot.sendMessage(msg.chat.id, "Hola "+msg.from.first_name);
});

bot.onText(/^\/start1/,(msg) => {
    bot.sendMessage(msg.chat.id, "Bienvenido "+msg.from.first_name);
});

bot.onText(/^como estas?/,(msg) => {
    bot.sendMessage(msg.chat.id, "Muy bien "+msg.from.first_name+" y tu?");
});

// Regresa el id del chat
bot.onText(/^\/chatid/,(msg) => {
    const chatid = msg.chat.id;
    bot.sendMessage(chatid, "El id del chat es: "+chatid);
});

// Regresa mi id
bot.onText(/^\/myid/,(msg) => {
    const chatid = msg.chat.id;
    const myid = msg.from.id;
    bot.sendMessage(chatid, "Tu id es: "+myid);
});

// Borrar mensaje pero no el comando
bot.onText(/^\/borrar/,(msg) => {
    if (msg.reply_to_message == undefined) {
        return;
    }
    bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
})

// Borrar mensaje y comando que mandas
bot.onText(/^\/borrartodo/,(msg) => {
    if (msg.reply_to_message == undefined) {
        return;
    }
    bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
    bot.deleteMessage(msg.chat.id, msg.message_id);
})

// Enviar una imagen con un texto abajo
bot.onText(/^\/testfoto/, (msg) =>{
    var url = "https://tecnonucleous.com/2017/11/16/como-mandar-archivos-audio-localizaciones-texto-mediante-nuestro-bot-de-telegram-en-nodejs/"
    var comment = "Esto es un comentario abajo de la foto"
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendPhoto(msg.chat.id, url,{caption: comment});
});

// enviar audio .ogg
bot.onText(/^\/testaudio/, (msg) => {
    var url = "https://archive.org/download/soy-lisa/soy-lisa.ogg"
    var comment = "Esto es un comentario abajo del audio"
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendAudio(msg.chat.id, url, {caption: comment});
});

// enviar archivo .mp3
bot.onText(/^\/testmp3/, (msg) => {
    var url = "https://archive.org/download/soy-lisa/soy-lisa.mp3";
    var comment = "Esto es un comentario abajo del audio"
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendAudio(msg.chat.id, url, {caption: comment});
});

// enviar audio como nota de voz y con texto abajo
bot.onText(/\/voice/, (msg) => {
    const url = 'https://archive.org/download/soy-lisa/soy-lisa.ogg';
    const audio = request(url);
    var comment = "Esto es un comentario abajo de la nota de voz ";
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendVoice(msg.chat.id,audio,{caption: comment});  
});

// enviar audio como nota de voz y con texto abajo
bot.onText(/\/mp3voice/, (msg) => {
    const url = 'https://archive.org/download/soy-lisa/soy-lisa.mp3';
    const audio = request(url);
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendVoice(msg.chat.id,audio);  
});

// enviar ubicacion de casa
/*
bot.on('message', (msg) => {
    var localizacion = "casa";
    if (msg.text.indexOf(localizacion) === 0){
        bot.sendLocation(msg.chat.id,0,0);
    }
});
*/
// enviar foto desde url
bot.onText(/\/fotoWeb/, (msg) => {
    var url = "https://tecnonucleous.com/content/images/2017/05/foro-flarum-tecnonucleous-1.png";
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendPhoto(msg.chat.id, url); 
});

// enviar foto desde path
bot.onText(/\/fotoDir/, (msg) => {
    var path = "./foro-flarum-tecnonucleous-1.png";
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendPhoto(msg.chat.id, path);
});

// obtiene ubucacion
bot.onText(/getLocation/, (msg) => {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{text: 'Ubicacion', request_location: true}],
          [{text: 'Numero', request_contact: true}],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }),
    };
    bot.sendMessage(msg.chat.id, 'Enviar ubicacion o numero', opts);
});
  
bot.on('location', (msg) => {
    console.log(msg.location.latitude);
    console.log(msg.location.longitude);
});

// -------------------------- ENCUESTA --------------------------

// Iniciar encuesta
bot.onText(/^\!encuesta|^\/encuesta/, (msg) => {

    var	poll_options = ["Si","No"]; // Mínimo 2 y máximo 10 opciones 
    bot.sendPoll(msg.chat.id, "Encuesta #1: Te gusta el curso de ADMON?",poll_options);
    
});

// Detener encuesta con comando "/detener"
bot.onText(/^\!detener|^\/detener/, (msg) => {
    var replyId_messageId = msg.reply_to_message.message_id;
    
    bot.stopPoll(msg.chat.id,replyId_messageId);

    for (let index = 1; index < 10; index++) {
    console.log(" Encuesta detenida");
    }
});

// Encuesta anonima o publica
bot.onText(/^\!lava|^\/lava/, (msg) => {

    // Variable en la que guardamos la pregunta de la encuesta
    var question = "¿La lava es más caliente que el SOL?";
    
    // Array donde guardas las respuestas a las preguntas
    var answers = ["Si", "No"]; // Mínimo 2 y máximo 10 opciones 
    
    // Objecto Json en el guardamos los distintos parametros que le podemos 
    // pasar a encuesta
    const opts = {
      'is_anonymous': false
    };

    // Método sendPoll nos permite enviar la encuesta
    bot.sendPoll(msg.chat.id, question, answers, opts);

});

// Multirespuesta
bot.onText(/^\!muti|^\/multi/, (msg) => {

    // Variable en la que guardamos la pregunta de la encuesta
    var question = "¿La lava es más caliente que el SOL?";
    
    // Array donde guardas las respuestas a las preguntas
    var answers = ["Si", "No", "No estoy seguro", "Ni idea"]; // Mínimo 2 y máximo 10 opciones 
    
    // Objecto Json en el guardamos los distintos parametros que le podemos 
    // pasar a encuesta
    const opts = {
        'is_anonymous': false,
        'allows_multiple_answers': true
    };

    // Método sendPoll nos permite enviar la encuesta
    bot.sendPoll(msg.chat.id, question, answers, opts);

});

 // QUIZ
bot.onText(/^\!quiz|^\/quiz/, (msg) => {

    // Variable en la que guardamos la pregunta de la encuesta
  var question = "¿La lava es más caliente que el SOL?";
    
    // Array donde guardas las respuestas a las preguntas
  var answers = ["Si", "No"]; // Mínimo 2 y máximo 10 opciones 
    
    // Objecto Json en el guardamos los distintos parametros que le podemos 
    // pasar a encuesta
  const opts = {

    'is_anonymous': false,
    'type': 'quiz', // Puede ser 'regular' o 'quiz'
    'correct_option_id': 0
  };

    // Método sendPoll nos permite enviar la encuesta
  bot.sendPoll(msg.chat.id, question, answers, opts);

});


// ---------------------------- BOTONES ----------------------------

// Almacenar los botones en variables
var botones = {
    reply_markup: {
        inline_keyboard: [
            [
                {text: "Boton 1", callback_data: 'boton1'},
                {text: "Boton 2", callback_data: 'boton2'}
            ]
        ]
    }
}

bot.onText(/^\/botones/, (msg) => {
    bot.sendMessage(msg.chat.id, "Este es un segundo mensaje con los botones dentro del mensaje",{
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Boton 3", callback_data: 'boton3'},
                    {text: "Boton 4", callback_data: 'boton4'}
                ]
            ]
        }
    })
});

// -------------------- ENCUESTA FUNCIONANDO RAPIDO --------------------

bot.onText(/^\/start/, function(msg){
    
    let chatId = msg.chat.id;

    let botones = {
        reply_markup: {
            inline_keyboard: [
                [{text: "Pajaro Millonario", callback_data: 'false'}],
                [{text: "Alcon Milenario", callback_data: 'true'}],
                [{text: "Gabilan milenario", callback_data: 'false'}],
                [{text: "Loro Millonario", callback_data: 'false'}]
            ]
        }
    }

    bot.sendMessage(chatId, "Pregunta: Como se llama la nave de HAN SOLO\nRespuestas:", botones);

    const names = []

    bot.on('callback_query', function onCallbackQuery(accionboton){
        const data = accionboton.data;
        const msg = accionboton.message;
        let name = (accionboton.from.first_name+' '+accionboton.from.last_name);
        let find = 0;
        for (let i = 0; i < names.length; i++) {
            if (name === names[i]) {
                bot.sendMessage(msg.chat.id, "Ya has respondido\nGracias por participar");
                find = 1
            }
        }
        if (find == 0) {
            switch (data) {
                case 'false':
                    bot.sendMessage(msg.chat.id, "Respuesta Incorrecta");
                    datos(name, names, data)
                break;
    
                case 'true':
                    bot.sendMessage(msg.chat.id, "Respuesta Correcta");
                    datos(name, names, data)
                break;
            }
        }     
    });
});

function datos(name, names, data) {
    console.log(name);
    names.push(name)
    console.log(" Data: "+data);
}