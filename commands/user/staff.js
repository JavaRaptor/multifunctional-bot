const {
    MessageEmbed
} = require('discord.js')
const lang = require("../../json/options.json");
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")
const staff = require("../../json/staff.json")

module.exports.run = (bot, message, args) =>
{
    let admin;
    let error;
    let succes;
    let title;
    let id = message.guild.id
    if (lang[id].lang === "fr")
    {
        admin = FRperm.ADMINISTRATOR
        error = FRphrase.staff.error
        title = FRphrase.staff.title
    } else if (lang[id].lang === "en")
    {
        admin = ENperm.ADMINISTRATOR
        error = ENphrase.staff.error
        title = ENphrase.staff.title
    }
    if (!message.member.hasPermission(admin))
    {
        message.channel.send(admin);
    }

    if (!args[0]) return message.channel.send(error);

    if (args[0] === 'list')
    {
        const embed = new MessageEmbed();
        embed.setTitle(title);
        message.channel.send(staff.User);
    }

}
