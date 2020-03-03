const TelegramBot = require('node-telegram-bot-api');
const token = '1003576470:AAHmyEcHysH6uU7kNpqW6xpKby-ZHDY1rfw';
const bot = new TelegramBot(token, {polling:true});
const mysql = require('mysql2/promise');

async function main(bot) {

    bot.on('polling_error', function(error){
        console.log(error);
    });
    
    bot.onText(/^\/start/, function(msg){
        console.log(msg);
        const chatId = msg.from.id;
        const msgId = msg.message_id;
        const userId = msg.from.id
        const username = msg.from.first_name+" "+msg.from.last_name;
        let mensaje = `Hola ${msg.from.first_name}!\nQueremos saber el nivel de satisfaccion de los servicios brindados en nuestra cede Boca del Monte\n\nNos gustaria que respondas unas cuantas preguntas\n\nEscribe SI para INICIAR o NO para CANCELAR`
        let url = 'https://scontent.fgua1-1.fna.fbcdn.net/v/t1.0-9/41671160_2147260612263493_8211593109033713664_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=TXAaKYekE_4AX8RaXbq&_nc_ht=scontent.fgua1-1.fna&oh=67689172143d917e79558ff93e27087c&oe=5EF5F184';
        bot.sendPhoto(chatId, url,{caption: mensaje});
        borrar(chatId, msgId);
    })

    bot.on('message', (msg) => {
        si(msg, 1);
        no(msg);
    });
    
    bot.on('callback_query', function onCallbackQuery(accionboton){
        respuesta(accionboton); 
    });
}

main(bot);

async function respuesta(accionboton) {
    const accionId = accionboton.id; //
    let userId = accionboton.from.id // 
    let tipo = accionboton.data.split(':'); //
    let questionId = tipo[0]; //
    let answerId = tipo[1]; //
    const messageId = accionboton.message.message_id; //
    let username = (accionboton.from.first_name+' '+accionboton.from.last_name); // 
    let chatId = (accionboton.message.chat.id);
    let exist = `select encuesta.UsuarioExiste(${userId}, ${questionId}, ${answerId}, '${username}') AS active;`;
    let resultado = ((await query(exist))[0])[0].active;
    console.log('resultado = '+resultado);
    await borrar(chatId, messageId);
    await notificacion("Gracias por responder!\nContinua con la encuesta", accionId);
    let msg = `${chatId}:${userId}:${username}`;
    questionId = Number(questionId);
    exist = `select encuesta.nextQuestion(${(questionId+1)}) AS found;`
    resultado = ((await query(exist))[0])[0].found;
    await si(msg,resultado);
}

async function si(msg, contador) {
    if (contador==1) {
        let userId = msg.from.id
        let chatId = userId;
        let username = msg.from.first_name+" "+msg.from.last_name;
        if (msg.text.includes("SI")) {
            prepararBotones(chatId, userId, username, contador);
            return;
        }
        return;
    } else if(contador>1) {
        let datos = msg.split(':')
        let chatId = Number(datos[0]);
        let userId = Number(datos[1]);
        prepararBotones(chatId, userId, datos[2], contador);
        return;
    }else if(contador==-1){
        let datos = msg.split(':')
        let chatId = Number(datos[0]);
        bot.sendMessage(chatId, `Has respondido todas las preguntas\nGracias por realizar la encuesta! 😁👍`)
        return;
    }else{
        console.log("\nERROR!\nERROR!\nERROR!\n");
        return;
    }
}

async function prepararBotones(chatId, userId, username, contador) {
    let question = ""
    let questionId = 0
    let respuestas = 0
    let sql = `select encuesta.encuestado(${userId}, '${username}', 1, 11) AS active;`
    let data = await query(sql);
    console.error('VALIDAR RETORNO DE ENCUESTADOS');
    let queryPregunta = `SELECT id_pregunta, pregunta FROM pregunta WHERE estado =1 AND id_pregunta = ${contador}`
    let queryRespuesta = `SELECT id_respuesta, respuesta FROM respuesta WHERE estado = 1 AND pregunta_id_pregunta = ${contador}`;
    question = ((await query(queryPregunta))[0])[0].pregunta;
    questionId = ((await query(queryPregunta))[0])[0].id_pregunta;
    respuestas = ((await query(queryRespuesta))[0]);
    let boton = []
    for (let i = 0; i < respuestas.length; i++) {
        const objeto = {
            text: respuestas[i].respuesta,
            callback_data: questionId+':'+respuestas[i].id_respuesta
        }
        let data = [objeto];
        boton.push(data);
    }
    let botones = {
        reply_markup: {
            inline_keyboard: boton
        }
    }
    bot.sendMessage(chatId, `${questionId}/11. ${question}\nRespuestas:`,botones)
}

async function no(msg) {
    const userId = msg.from.id
    const chatId = userId;
    const username = msg.from.first_name+" "+msg.from.last_name;
    if (msg.text.includes("NO")) {
        let sql = `select encuesta.encuestado(${userId}, '${username}', 0, 11) AS active`
        console.error('VALIDAR RETORNO DE ENCUESTADOS');
        let data = ((await query(sql))[0])[0].active;
        bot.sendMessage(chatId, "Gracias por tu tiempo!\nQue tengas un feliz dia.");
        console.log("NO\n"+data);
    }
}

async function query (sql) {
    const conn = await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '551598753210',
        database : 'encuesta'
    });
    let data =  await conn.execute(sql);
    conn.end();
    return data;
}

async function borrar(chatId, msgId) {
    bot.deleteMessage(chatId, msgId);
}

async function notificacion(texto, accionId) {
    bot.answerCallbackQuery({
        callback_query_id: accionId,
        text: texto,
        show_alert: false
    })
}