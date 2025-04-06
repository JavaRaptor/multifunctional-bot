const Discord = require("discord.js");
const config = require("../config.json")
module.exports = async (client, guild) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#008000")
    .setTitle("Nouveau Serveur")
    .addField("Nom du Serveur", guild.name)
    .addField(`Créateur du Serveur`, `${guild.owner} | ${guild.ownerID}`)
    .addField("Nombre de Membre", guild.memberCount)
    .addField("Serveurs", client.guilds.cache.size)
    .addField(`Nitro Level`, guild.premiumTier)
    .addField(`Nitro boost`, guild.premiumSubscriptionCount);
  let channel = client.channels.cache.get(config.guildCreateChannel)
  channel.send(embed)

  const fs = require('fs');
  const data = require('../json/options.json');
  data[guild.id] = {
            prefixes: "!",
            lang: "fr",
            logsID: 0,
            welcID: 0,
            blacklist: false,
            welcome: false,
            log: false
        };
  fs.writeFileSync('./json/options.json', JSON.stringify(data));
}
