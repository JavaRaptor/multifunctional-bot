const {
    MessageEmbed
} = require('discord.js')
const lang = require("../../json/options.json");
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = (bot, message, args) =>
{
    let admin;
    let error;
    let id = message.guild.id
    if (lang[id].lang === "fr")
    {
        admin = FRperm.ADMINISTRATOR
        error = FRphrase.setlang.error
        already =FRphrase.setlang.already
    } else if (lang[id].lang === "en")
    {
        admin = ENperm.ADMINISTRATOR
        error = ENphrase.setlang.error
        already = ENphrase.setlang.already
    }
    if (!message.member.hasPermission(admin))
    {
        message.channel.send(admin);
    }

    if (!args[0]) return message.channel.send(error);

    
    if (args[0] === 'en')
    {
        if(lang[id].lang == "en"){
        return message.channel.send(ENphrase.setlang.already)
        }
        message.channel.send(ENphrase.setlang.succes)
    }
    

    if (args[0] === 'fr')
    {
        if(lang[id].lang == "fr"){
        return message.channel.send(FRphrase.setlang.already)
        }
        message.channel.send(FRphrase.setlang.succes)
    }
       
    const fs = require('fs');
    lang[message.guild.id].lang = args[0]
    fs.writeFileSync('./json/options.json', JSON.stringify(lang))
}
