const Discord = require("discord.js");
const fs = require("fs")

const blacklist = require("../../json/blacklist.json")
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = (client, message, args) => {

    let id = message.guild.id

    let error_id;
    let reported;
    let proof;
    let reason;
    let noId;

    if (lang[id].lang === "fr")
    {
        error_id = FRphrase.checkid.error_id
        reported = FRphrase.checkid.reported
        proof = FRphrase.checkid.proof
        reason = FRphrase.checkid.reason
        noId = FRphrase.checkid.no
    } else if (lang[id].lang === "en")
    {
        error_id = ENphrase.checkid.error_id
        reported = ENphrase.checkid.reported
        proof = ENphrase.checkid.proof
        reason = ENphrase.checkid.reason
        noId = ENphrase.checkid.no
    }

    if(!args[0]) return message.channel.send(error_id)
    
    let yesEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(":notepad_spiral: BlackList Info :notepad_spiral:")
        .addField(reported, args[0])
        .addField(proof, blacklist[args[0]].proof)
        .addField(reason, blacklist[args[0]].reason)

    let noEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(":notepad_spiral: BlackList Info :notepad_spiral:")
        .setDescription(args[0] + " " + noId)

    const targetId = args[0]; // Remplacez par l'ID que vous recherchez

    // Charger les données depuis le fichier JSON
    const jsonData = JSON.parse(fs.readFileSync("./json/blacklist.json", 'utf8'));
    if (jsonData[targetId] && jsonData[targetId].status !== undefined) {
        const status = jsonData[targetId].status;
        console.log(`Le status de l'ID ${targetId} est : ${status ? 'true' : 'false'}`);
        if(status == true) {
            message.channel.send(yesEmbed)
        } else {
            message.channel.send(noEmbed)
        }
      } else {
        message.channel.send(noEmbed)
      }

}