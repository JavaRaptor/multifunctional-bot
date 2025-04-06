const Discord = require("discord.js");
const config = require("../../config.json")
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = async (client, message, args) =>
{
    let id = message.guild.id

    let succes;
    let deny;
    let title;
    let bugs;
    let reportIn;
    let reportBy;
    let images;

    if (lang[id].lang === "fr")
    {
        succes = FRphrase.bug.succes
        deny = FRphrase.bug.deny
        title = FRphrase.bug.title
        bugs = FRphrase.bug.bugs
        reportIn = FRphrase.bug.reportIn
        reportBy = FRphrase.bug.reportBy
        images = FRphrase.bug.images
    } else if (lang[id].lang === "en")
    {
        succes = ENphrase.bug.succes
        deny = ENphrase.bug.deny
        title = ENphrase.bug.title
        bugs = ENphrase.bug.bugs
        reportIn = ENphrase.bug.reportIn
        reportBy = ENphrase.bug.reportBy
        images = ENphrase.bug.images
    }

    //Variable
    let bug = args.join(" ").slice(0);
    let user = message.author.username;
    let guild = message.guild.name;
    let channel = client.channels.cache.get(config.bugChannel)
    let embed = new Discord.MessageEmbed()

    if (!bug) return message.reply(deny);

    //Embed
    embed.setTitle(title)
    embed.setThumbnail(images)
    embed.addField(bugs, bug)
    embed.addField(reportBy, user)
    embed.addField(reportIn, guild)
    embed.setColor("#f49542")

    //Message
    message.channel.send(succes)
    channel.send(embed).then(i => i.react("✔") && i.react("❌"))

}
