const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require("fs");

const client = new Client();

let valorGastoFixo = 0;
let valorGastoVariavel = 0;
let valorGanho = 0;
let Etapa = 0;


client.on('qr', (qr) => {
    console.log("solicitando qrcode");
    qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    var result = msg.body.split(' '); 
    console.log(result); 
    console.log(Etapa); 
    var valor = result[0].replace(",", ".");

    if (Etapa == 1) {
        valorGastoFixo += parseFloat(valor);
        msg.reply(`Gasto Registrado`);
        Etapa = 0;
        console.log(valorGastoFixo); 

    } else if (Etapa == 2) {
        valorGastoVariavel += parseFloat(valor);
        msg.reply(`Gasto Registrado`);
        Etapa = 0;
        console.log(valorGastoVariavel); 

    } else if (Etapa == 4) {
        valorGanho += parseFloat(valor);
        msg.reply(`Ganho Registrado`);
        Etapa = 0;
        console.log(valorGanho); 
    }  else if (Etapa == 6) {
        //client.sendMessage(msg.from, 'Está aqui seu relatório'); 
    } else {
        Etapa = 0;
    }

    if (msg.body.toLowerCase() == 'ajuda') {
        msg.reply(`Ok. Possuo a capacidade de te ajudar em:
        
    0️⃣ *Planejar seus sonhos.* 🎯
    1️⃣ *Cadastrar gastos fixos.* 💰
    2️⃣ *Cadastrar gasto variável.* 🛒
    3️⃣ *Cadastrar valores parcelados.* 💳
    4️⃣ *Cadastrar ganhos.* 💎
    5️⃣ *Visualizar o saldo.* ⚖️
    6️⃣ *Relatório de gastos.* 📈
    7️⃣ *Encontrar um banco.* 🏦
    8️⃣ *Acessar o fórum.* ⁉️
    `);
    } else if (msg.body.toLowerCase() == 'oi') {
        msg.reply(`Bem vindo ao 🤑 Manei Chatbot 🤑, vou lhe ajudar a cuidar de suas finanças 💸, para isso digite "ajuda" 💁🏻`);
    }

    switch (msg.body) {
        case '0':
            msg.reply(` 📝 Vamos planejar seu sonho 💭 ? Me informe o valor, tempo em meses e descrição do sonho.`);
            Etapa = 0;
            break;
        case '1':
            msg.reply(`💰 Por favor informe o valor e descrição do seu gasto fixo. 💰`);
            Etapa = 1;
            break;
        case '2':
            msg.reply(`🛒 Por favor informe o valor e descrição do seu gasto variável. 🛒`);
            Etapa = 2;
            break;
        case '3':
            msg.reply(`💳 Por favor informe o valor, número de parcelas e descrição do seu gasto parcelado. 💳`);
            Etapa = 3;
        break;
        case '4':
            msg.reply(`💎 Por favor informe o valor e descrição do seu ganho. 💎`); 
            Etapa = 4;
        break;
        case '5':
            msg.reply(`⚖️ *Saldo* ⚖️
            *Ganhos* + R$ ${parseFloat(valorGanho).toFixed(2).replace(".", ",")}
            *Gastos* - R$ ${parseFloat(valorGastoFixo).toFixed(2).replace(".", ",")}       
            *Saldo*  = R$ ${parseFloat(valorGanho - (valorGastoFixo)).toFixed(2).replace(".", ",")} 
            `);
            Etapa = 5;
        break;
        case '6':
            msg.reply(`📈 Olá Fulano, vou lhe enviar um relatório para que possa analisar os seus gastos de forma clara e objetiva: 📈`);            
            Etapa = 6;
        break;
        case '7':
            msg.reply(`🏦 Certo, vamos lá, vou exibir uma lista de banco parceiros, que tenho plena confiança em lhe indicar, segue:
            “Banco Inter”
            “Itaú”
            “Santander”
            “Bradesco”
            `);
            Etapa = 7;
        break;
        case '8':
            msg.reply(`⁉️ Para acessar o fórum de discussões acesso o link http://www.maneiforum.com ⁉️`);
            Etapa = 8;
        break;
        default:
    }
});

client.initialize();
