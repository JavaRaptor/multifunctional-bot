const Discord = require("discord.js")
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = async (bot, message, args) =>
{
    let id = message.guild.id

    let ban;
    let succes;
    let cannot;
    let server;
    let mention;

    if (lang[id].lang === "fr")
    {
        ban = FRperm.BAN_MEMBERS
        succes = FRphrase.ban.succes
        cannot = FRphrase.ban.error_cannot
        server = FRphrase.ban.error_server
        mention = FRphrase.ban.error_mention
    } else if (lang[id].lang === "en")
    {
        ban = ENperm.BAN_MEMBERS
        succes = ENphrase.ban.succes
        cannot = ENphrase.ban.error_cannot
        server = ENphrase.ban.error_server
        mention = ENphrase.ban.error_mention
    }
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(ban);
    var memberInfo = message.mentions.users.first();
    if (memberInfo)
    {
        var memberToBeBaned = message.guild.member(memberInfo)

        if (memberToBeBaned)
        {
            memberToBeBaned.ban().then(() =>
            {
                message.channel.send(succes + memberInfo.tag);
            }).catch(err =>
              {
                message.channel.send(cannot)
                console.log(err);
            });
        } else
        {
            message.channel.send(server)
        }
    } else
    {
        message.channel.send(mention)
    }
}
