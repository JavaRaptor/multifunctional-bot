const Discord = require("discord.js");
const fs = require("fs")
const lang = require("../json/options.json")
const FRperm = require("../json/fr/perms.json");
const FRphrase = require("../json/fr/phrase.json")
const ENperm = require("../json/en/perms.json");
const ENphrase = require("../json/en/phrase.json")
module.exports = async (client, message) => {
  let id = message.guild.id
  
  let title;
  let messages;
  let users;
  
  if (lang[id].lang === "fr") {
    title = FRphrase.messageDelete.title
    messages = FRphrase.messageDelete.messages
    users = FRphrase.messageDelete.users
  } else if (lang[id].lang === "en") {
    title = ENphrase.messageDelete.title
    messages = ENphrase.messageDelete.messages
    users = ENphrase.messageDelete.users
  }

  const logs = message.guild.channels.cache.find(channel => channel.name === "logs");

  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    await message.guild.channels.create('logs', {
      type: 'text'
    });
  }
  if (!logs) {
    return console.log('The logs channel does not exist and cannot be created');
  }
  const entry = await message.guild.fetchAuditLogs({
    type: 'MESSAGE_DELETE'
  }).then(audit => audit.entries.first())
  let user;

  let embed = new Discord.MessageEmbed()
    embed.setTitle(title)
    embed.setColor("#00ff00")
    embed.addField(users, message.author.username)
    embed.addField(messages, message);
  logs.send(embed)
}