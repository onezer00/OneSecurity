const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login('');

const responseObject = {
    ">oi": "Oi, eu sou o OneBot e estou aqui para ajuda-lo!",
    ">fb": "https://www.facebook.com/OneZer00",
    ">twitch": "https://www.twitch.tv/0nezer0",
    ">java": "https://github.com/onezer00/Exemplos-Java",
    ">dev": "OneZer0 & Samuel Novaes"
};

const helpObject = {
    ">oi": "Comprimentar o bot",
    ">fb": "Mostrar link do Facebook",
    ">twitch": "Mostrar link do Twitch",
    ">java": "Exemplos de código em Java",
    ">ban": ">ban @nomedousuario diasBanidos motivo",
    ">dev": "OneZer0 & Samuel Novaes"
}

const banRoles = [
    'Moderação',
    'Pai de todos'
]

bot.on('message', msg => {
    const args = msg.content.split(/\s+/)
    if (msg.content == '>help') {
        let text = `\n\n**OneSecurity BOT - O BOT PARA PROTEGER O SEU SERVIDOR**

**EM FUNCIONAMENTO**
*   Validação para ban de membros, que dificulta ação em massa!

**EM IMPLEMENTAÇÃO**

Este bot foi criado com a finalidade de proteger servidores, contra ataques de comandos massivos!
Caso alguém tente tomar o controle do seu servidor, e kickar ou banir os membros, será retirado as TAGS deste usuário.

Será adicionado comando para limpeza do chat.

**MODO DE USO**
DESABILITE OS BANs ATRAVÉS DE OUTROS CARGOS PERMITINDO BAN SOMENTE ATRAVÉS DE COMANDOS DO ONESECURITY BOT!
DESTA FORMA VOCÊ GARANTE QUE UM BOT OU MEMBRO COM PRIVILÉGIOS CONSIGA BANIR SEUS USUÁRIOS COM CONTROLE!


**Aqui estão listados todos os comandos do bot**

        \`\`\``
        let spaces = ''
        for (key in helpObject) {
            for (let i = 0; i < 10 - key.length; i++) {
                spaces += ' '
            }
            text += `${key}${spaces}${helpObject[key]}\n`
            spaces = ''
        }
        text += '```@here\n\nEste bot foi desenvolvido por @OneZer0 e @Samuel Novaes! Pedimos que os creditos sejam dados para os mesmos!'
        msg.reply(text)
        
    }
    else if (msg.content.startsWith('>ban')) {
        if (msg.member.roles.some(r => banRoles.includes(r.name))) {
            const member = msg.mentions.members.first()
            const days = parseInt(args[2])
            const reason = args[3]
            if (reason == undefined) msg.reply('Digite o motivo do ban! É muito importante para que o ban seja mantido.')
            else if (!member) msg.reply('O membro digitado não existe! Está tentando invocar um membro no servido do além?')
            else if (isNaN(days)) msg.reply('Digite uma quantidade de dias válido! Fugiu da escola seu bobinho?')
            else {
                member.ban({ days, reason })
                    .then(() => {
                        msg.channel.send(`${member.user.username} foi banido por ${days} dias, devido ao seguinte motivo: ${reason}.`)
                        member.send(`Você foi banido do servidor ${msg.guild.name} por ${days} dias, devido ao seguinte motivo: ${reason}.\nApós o prazo de banimento, contatar algum dos administradores.`)
                        console.log(reason)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
        else {
            msg.reply('Você não tem permissão para banir esta pessoa!')
        }
    }
    else if (msg.content.startsWith('>')) {
        if (msg.content in responseObject) {
            msg.reply(responseObject[msg.content])
        }
        else {
            msg.reply("Você digitou um comando inválido, por favor tente novamente!")
        }
    }
})

bot.on('guildBanAdd', (guild, member) => {
    console.log(guild)
})

//nodemon