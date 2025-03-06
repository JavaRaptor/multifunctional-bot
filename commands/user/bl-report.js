const Discord = require("discord.js");

const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = (client, message, args) => {

    let id = message.guild.id

    let owner;
    let error_id;
    let error_proof;
    let error_reason
    let success;

    if (lang[id].lang === "fr")
    {
        error_id = FRphrase.blReport.error_id
        error_proof = FRphrase.blReport.error_proof
        error_reason = FRphrase.blReport.error_reason
        success = FRphrase.blReport.success
    } else if (lang[id].lang === "en")
    {
        error_id = ENphrase.blReport.error_id
        error_proof = ENphrase.blReport.error_proof
        error_reason = ENphrase.blReport.error_reason
        success = ENphrase.blReport.success
    }

    if(!args[0]) return message.channel.send(error_id)
    if(!args[1]) return message.channel.send(error_proof)
    if(!args.slice(2).join(" ")) return message.channel.send(error_reason)
  
    var embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Report")
    .addField("Auteur", message.author.username)
    .addField("Personne report", `<@${args[0]}>`)
    .addField("Preuve", args[1])
    .addField("Raison", args.slice(2).join(" "))

    message.channel.send(success)

    client.channels.cache.get('1097895182273364088').send(embed)

}