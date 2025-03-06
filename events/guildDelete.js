const Discord = require("discord.js");
module.exports = async (client, guild) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Ancien Serveur")
    .addField("Nom du Serveur", guild.name)
    .addField(`Créateur du Serveur`, `${guild.owner} | ${guild.ownerID}`)
    .addField("Nombre de Membre", guild.memberCount)
    .addField("Serveurs", client.guilds.cache.size)
    .addField(`Nitro Level`, guild.premiumTier)
    .addField(`Nitro boost`, guild.premiumSubscriptionCount);
  //let channel = client.channels.cache.get("875508494474829874")
  //channel.send(embed)
}