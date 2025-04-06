const Discord = require("discord.js")
module.exports.run = async (client, message) => {
  const Goodping = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("Ping")
  .setDescription(`La latence du bot est de : ${client.ws.ping} ms\nLa latence est : Bonne`)
  if(client.ws.ping < 20) return message.channel.send(Goodping)
  const Badping = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Ping")
  .setDescription(`La latence du bot est de : ${client.ws.ping} ms\nLa latence est : Mauvaise`)
  if(client.ws.ping > 20) return message.channel.send(Badping)
  }