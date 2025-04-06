const Discord = require("discord.js")
const fs = require("fs")

const lang = require("../json/options.json");
const FRphrase = require("../json/fr/phrase.json")
const ENphrase = require("../json/en/phrase.json")

module.exports = async (client, member) => {
    const jsonData = JSON.parse(fs.readFileSync("./json/blacklist.json", 'utf8'));
    const option = JSON.parse(fs.readFileSync("./json/options.json", 'utf8'));
    if (jsonData[member.id] && jsonData[member.id].status !== undefined && option[member.guild.id].blacklist == true) {
        const status = jsonData[member.id].status;
        console.log(`Le status de l'ID ${targetId} est : ${status ? 'true' : 'false'}`);
        if(status == true) {
            member.ban({reasony: "Blacklist Logger"})
        }
    }

    const guildID = member.guild.id;

    if (!option[guildID] || option[guildID].welcome == false) return;

    const channelID = option[guildID].welcID;
    const channel = member.guild.channels.cache.get(channelID);
    if (!channel) return;

    channel.send(`Bienvenue ${member} sur le serveur ! 🎉`);

}