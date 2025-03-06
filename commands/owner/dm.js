const Discord = require('discord.js');
const fs = require("fs");
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = (cliet, message, args) =>
{
    let id = message.guild.id
    if (lang[id].lang === "fr")
    {
        owner = FRperm.OWNER
        mention = FRphrase.dm.error_mention
        reason = FRphrase.dm.error_reason
        receive = FRphrase.dm.receive
        send = FRphrase.dm.send
    } else if (lang[id].lang === "en")
    {
        owner = ENperm.OWNER
        mention = ENphrase.dm.error_mention
        reason = ENphrase.dm.error_reason
        receive = ENphrase.dm.receive
        send = ENphrase.dm.send
    }

    let dUser = message.guild.member(message.mentions.users.first())
    if (!dUser) return message.channel.send(mention)
    if (!message.author.id === "544853657896615937") return message.reply(owner)
    let dMessage = args.join(" ").slice(22);
    if (dMessage.length < 1) return message.reply(reason)
    dUser.send(`${message.author.username} ${receive} ${dMessage}`)
    message.author.send(`${message.author} ${send} ${dUser}`)
}
