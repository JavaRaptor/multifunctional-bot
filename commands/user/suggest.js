const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
var embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Suggestion de ${message.author.username}`)
.setDescription(args.join(" "))
client.channels.cache.get("722146038663872593").send(embed)
.then(msg =>{ 
  msg.react('✔️')
  msg.react('❌')
})
}