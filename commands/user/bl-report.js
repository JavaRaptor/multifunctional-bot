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
    let title;
    let auteur;
    let reporter;
    let proof;
    let reason;

    if (lang[id].lang === "fr")
    {
        error_id = FRphrase.blReport.error_id
        error_proof = FRphrase.blReport.error_proof
        error_reason = FRphrase.blReport.error_reason
        success = FRphrase.blReport.success
        title = FRphrase.blReport.title
        auteur = FRphrase.blReport.auteur
        reporter = FRphrase.blReport.reporter
        proof = FRphrase.blReport.proof
        reason = FRphrase.blReport.reason
    } else if (lang[id].lang === "en")
    {
        error_id = ENphrase.blReport.error_id
        error_proof = ENphrase.blReport.error_proof
        error_reason = ENphrase.blReport.error_reason
        success = ENphrase.blReport.success
        title = ENphrase.blReport.title
        auteur = ENphrase.blReport.auteur
        reporter = ENphrase.blReport.reporter
        proof = ENphrase.blReport.proof
        reason = ENphrase.blReport.reason
    }

    if(!args[0]) return message.channel.send(error_id)
    if(!args[1]) return message.channel.send(error_proof)
    if(!args.slice(2).join(" ")) return message.channel.send(error_reason)
  
    var embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(title)
    .addField(auteur, message.author.username)
    .addField(reporter, `<@${args[0]}>`)
    .addField(proof, args[1])
    .addField(reason, args.slice(2).join(" "))

    message.channel.send(success)

    client.channels.cache.get('1097895182273364088').send(embed)

}