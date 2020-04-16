const TelegramBot = require('node-telegram-bot-api');
const token = '1003576470:AAHmyEcHysH6uU7kNpqW6xpKby-ZHDY1rfw';
const bot = new TelegramBot(token, {polling:true});
const mysql = require('mysql2/promise');

// Funcion main
async function main(bot) {

    // Si ocurre algun error muestrelo en pantalla
    bot.on('polling_error', function(error){
        console.log(error);
    });

    // Commando de inicio de conversacion del bot
    bot.onText(/^\/start/, function(msg){
        // Obtenemos los datos necesarios
        console.log(msg);
        const chatId = msg.from.id;
        const msgId = msg.message_id;
        const userId = msg.from.id
        const username = msg.from.first_name+" "+msg.from.last_name;
        // Preparamos mesaje con imagen
        let mensaje = `Hola ${msg.from.first_name}!\nQueremos saber el nivel de satisfaccion de los servicios brindados en nuestra cede Boca del Monte\n\nNos gustaria que respondas unas cuantas preguntas\n\nEscribe SI para INICIAR o NO para CANCELAR`
        let url = 'https://scontent.fgua1-1.fna.fbcdn.net/v/t1.0-9/41671160_2147260612263493_8211593109033713664_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=TXAaKYekE_4AX8RaXbq&_nc_ht=scontent.fgua1-1.fna&oh=67689172143d917e79558ff93e27087c&oe=5EF5F184';
        bot.sendPhoto(chatId, url,{caption: mensaje}); // enviamos mensaje
        borrar(chatId, msgId); // borramos comando de inicio
    })

    // se esspera respuesta del usuario
    bot.on('message', (msg) => {
        si(msg, 1);
        no(msg);
    });

    // Obtencion de respuestas
    bot.on('callback_query', function onCallbackQuery(accionboton){
        respuesta(accionboton);
    });
}

main(bot);

// Funcion de respuesta elegida
async function respuesta(accionboton) {
    // Obtenemos datos necesarios
    const accionId = accionboton.id;
    let userId = accionboton.from.id;
    let tipo = accionboton.data.split(':');
    let questionId = tipo[0];
    let answerId = tipo[1];
    const messageId = accionboton.message.message_id;
    let username = (accionboton.from.first_name+' '+accionboton.from.last_name);
    let chatId = (accionboton.message.chat.id);
    // Verificamos que el usuario exista, sino se agrega en la base de datos
    let exist = `select encuesta.UsuarioExiste(${userId}, ${questionId}, ${answerId}, '${username}') AS active;`;
    let resultado = ((await query(exist))[0])[0].active;
    console.log('resultado = '+resultado); // mostraos log del resultado
    await borrar(chatId, messageId);  // borramos el emnsaje
    await notificacion("Gracias por responder!\nContinua con la encuesta", accionId); // mostramos notificacion
    let msg = `${chatId}:${userId}:${username}`; // se prepara el mensaje con los datos
    questionId = Number(questionId); // se pasa a entero
    // buscamos la siguiente pregunta
    exist = `select encuesta.nextQuestion(${(questionId+1)}) AS found;`
    resultado = ((await query(exist))[0])[0].found; // ejecuta el query
    await si(msg,resultado); // ejecutamos funcion si con los datos preparados
}
// Si responde SI
async function si(msg, contador) {
    if (contador==1) { // Si es la primera pregunta
        // Obtenemos los datos necesarios
        let userId = msg.from.id
        let chatId = userId;
        let username = msg.from.first_name+" "+msg.from.last_name;
        if (msg.text.includes("SI")) { // Si la espuesta es SI
            prepararBotones(chatId, userId, username, contador); // prepare los botones
            return;
        }
        return;
    } else if(contador>1) { // Si es la pregunta 2 en adelante
        let datos = msg.split(':') // Obetnemos los datos
        let chatId = Number(datos[0]);
        let userId = Number(datos[1]);
        prepararBotones(chatId, userId, datos[2], contador); // preparamos los botones
        return;
    }else if(contador==-1){ // si la pregunta es negativa
        let datos = msg.split(':') // Obtenemos los datos
        let chatId = Number(datos[0]);
        // Enviamos mensaje de agradecimiento
        bot.sendMessage(chatId, `Has respondido todas las preguntas\nGracias por realizar la encuesta! 😁👍`)
        return;
    }else{ // Cualquier otro caso
        console.log("\nERROR!\nERROR!\nERROR!\n"); // Muestre error
        return;
    }
}

// Prepara los botones que se mostraran
async function prepararBotones(chatId, userId, username, contador) {
    let question = ""
    let questionId = 0
    let respuestas = 0
    // Verificamos si ya esta encuestado o no
    let sql = `select encuesta.encuestado(${userId}, '${username}', 1, 11) AS active;`
    let data = await query(sql);
    console.error('VALIDAR RETORNO DE ENCUESTADOS');
    // Obtenemos la pregunta
    let queryPregunta = `SELECT id_pregunta, pregunta FROM pregunta WHERE estado =1 AND id_pregunta = ${contador}`
    question = ((await query(queryPregunta))[0])[0].pregunta;
    questionId = ((await query(queryPregunta))[0])[0].id_pregunta;
    // Obtenemos las respuestas
    let queryRespuesta = `SELECT id_respuesta, respuesta FROM respuesta WHERE estado = 1 AND pregunta_id_pregunta = ${contador}`;
    respuestas = ((await query(queryRespuesta))[0]);
    // Creamos los botones con las respuestas
    let boton = []
    for (let i = 0; i < respuestas.length; i++) {
        const objeto = { // Objeto q alamacena al boton
            text: respuestas[i].respuesta, // texto
            callback_data: questionId+':'+respuestas[i].id_respuesta // orden del boton
        }
        let data = [objeto]; // se agrega en un array
        boton.push(data); // se agrega al listdo de botones
    }
    // Le pasamos todos los botones creados
    let botones = {
        reply_markup: {
            inline_keyboard: boton
        }
    }
    // Enviamos el mensaje con los botones
    bot.sendMessage(chatId, `${questionId}/11. ${question}\nRespuestas:`,botones)
}

// Si la respuesta es no
async function no(msg) {
    // Obtenemos los datos necesarios del mensaje
    const userId = msg.from.id
    const chatId = userId;
    const username = msg.from.first_name+" "+msg.from.last_name;
    // Si el mensaje es NO
    if (msg.text.includes("NO")) {
        // Guardelo en la base de datos
        let sql = `select encuesta.encuestado(${userId}, '${username}', 0, 11) AS active`
        console.error('VALIDAR RETORNO DE ENCUESTADOS');
        let data = ((await query(sql))[0])[0].active;
        // Enviar mensaje
        bot.sendMessage(chatId, "Gracias por tu tiempo!\nQue tengas un feliz dia.");
        console.log("NO\n"+data); // mostrar log
    }
}

// Ejecucion de querys
async function query (sql) {
    // Reliza conexion a la base de datos
    const conn = await mysql.createConnection({
        host     : 'localhost',
        user     : 'encuestador',
        password : '551598753210',
        database : 'encuesta'
    });
    let data =  await conn.execute(sql); // Ejecuta el sql
    conn.end(); // cierra la conexion
    return data; // retornamos los datos obteneidos
}

// Borrar mensaje
async function borrar(chatId, msgId) {
    bot.deleteMessage(chatId, msgId);
}

// Ejecuta una notificacion silenciosa
async function notificacion(texto, accionId) {
    bot.answerCallbackQuery({
        callback_query_id: accionId, // a quien se le envia
        text: texto, // texto que se envia
        show_alert: false
    })
}