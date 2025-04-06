const region = require("../../json/region.json");
const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  let online = message.guild.members.cache.filter(
    ({ presence }) => presence.status === "online"
  ).size;
  let offline = message.guild.members.cache.filter(
    ({ presence }) => presence.status === "offline"
  ).size;
  let idle = message.guild.members.cache.filter(
    ({ presence }) => presence.status === "idle"
  ).size;
  let dnd = message.guild.members.cache.filter(
    ({ presence }) => presence.status === "dnd"
  ).size;
  moment.locale("fr");
  const DateServ = moment.utc(message.guild.createdAt).format(" Do MMMM YYYY ");
  let si = new Discord.MessageEmbed()
    .setTitle(`Serveur Info ${message.guild.name}`)
    .setDescription(
      `Propriétaire: ${message.guild.owner} | ${message.guild.ownerID}\nId : ${
        message.guild.id
      }\nRegion : ${message.guild.region} ${
        region[message.guild.region]
      }\nCréation du serveur : ${DateServ}\nSalon : ${
        message.guild.channels.cache.size
      }\nRôle : ${message.guild.roles.cache.size}`
    )
    .addField(
      `Membre: ${message.guild.memberCount}`,
      `Connecté: ${online}\nDéconnecté: ${offline}\nInactif: ${idle}\nNe pas dérangé: ${dnd}`
    )
  message.channel.send(si);
};