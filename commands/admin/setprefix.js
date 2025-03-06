const {
    MessageEmbed
} = require('discord.js')
const fs = require("fs")
const lang = require("../../json/options.json");
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = (bot, message, args) =>
{
    let manage;
    let error;
    let prefix;
    let success;

    let id = message.guild.id
    if (lang[id].lang === "fr")
    {
        manage = FRperm.MANAGE_GUILD
        error = FRphrase.setprefix.error
        prefix = FRphrase.setprefix.prefix
        success = FRphrase.setprefix.success
    } else if (lang[id].lang === "en")
    {
        manage = ENperm.MANAGE_GUILD
        error = ENphrase.setprefix.error
        prefix = ENphrase.setprefix.prefix
        success = ENphrase.setprefix.success
    }

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(manage)

    if(!args[0]) return message.channel.send(error)

    if(args[0].length >= 2) return message.channel.send(prefix)

    let prefixes = JSON.parse(fs.readFileSync("./json/options.json"), "utf8")
    prefixes[message.guild.id].prefixes = args[0]

    fs.writeFile("./json/options.json", JSON.stringify(prefixes), err => {
         if(err) return console.log(err)
    })
    message.channel.send(success + " " + args[0])

}
