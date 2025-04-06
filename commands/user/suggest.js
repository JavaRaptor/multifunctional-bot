const Discord = require("discord.js");
const config = require("../../config.json")
module.exports.run = async (client, message, args) => {
var embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Suggestion de ${message.author.username}`)
.setDescription(args.join(" "))
client.channels.cache.get(config.suggestChannel).send(embed)
.then(msg =>{ 
  msg.react('✔️')
  msg.react('❌')
})
}