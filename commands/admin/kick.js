const Discord = require("discord.js")
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = async (bot, message, args) =>
{
    let id = message.guild.id

    let kick;
    let succes;
    let cannot;
    let server;
    let mention;

    if (lang[id].lang === "fr")
    {
        kick = FRperm.KICK_MEMBERS
        succes = FRphrase.kick.succes
        cannot = FRphrase.kick.error_cannot
        server = FRphrase.kick.error_server
        mention = FRphrase.kick.error_mention
    } else if (lang[id].lang === "en")
    {
        kick = ENperm.KICK_MEMBERS
        succes = ENphrase.kick.succes
        cannot = ENphrase.kick.error_cannot
        server = ENphrase.kick.error_server
        mention = ENphrase.kick.error_mention
    }
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(kick);
    var memberInfo = message.mentions.users.first();
    if (memberInfo)
    {
        var memberToBeKicked = message.guild.member(memberInfo)

        if (memberToBeKicked)
        {
            memberToBeKicked.kick().then(() =>
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
