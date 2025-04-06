const fs = require("fs");
const Discord = require("discord.js");
const lang = require("../json/options.json");
const FRphrase = require("../json/fr/phrase.json")
const ENphrase = require("../json/en/phrase.json")
module.exports = async (client, message) => {
    // Vérifie que c'est dans un serveur et pas un bot
    if (!message.guild || message.author?.bot) return;

    // Charge les options
    const options = JSON.parse(fs.readFileSync("./json/options.json", "utf8"));
    const guildID = message.guild.id;

    // Vérifie que les logs sont activés
    if (!options[guildID] || options[guildID].log !== true) return;

    // Récupère le salon de logs
    const logChannel = message.guild.channels.cache.get(options[guildID].logsID);
    if (!logChannel) return console.log(`[LOG] Salon introuvable : ${options[guildID].logsID}`);

    // Vérifie si le message est lisible (dans certains cas il ne l'est pas)
    const content = message.content || "*Message vide ou embed non récupérable*";
    const author = message.author ? `${message.author.tag} (${message.author.id})` : "*Auteur inconnu*";

    let title;
    let messages;
    let users;
    let channel;
    let messageID;

    const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor("#ff0000")
        .addField(users, author, true)
        .addField(messages, content.length > 1024 ? content.substring(0, 1021) + "..." : content)
        .addField(channel, `${message.channel} (${message.channel.id})`, true)
        .setFooter(`${messsageID} : ${message.id}`)
        .setTimestamp();

    logChannel.send(embed).catch(err => console.error("Erreur d'envoi du log :", err));
};
