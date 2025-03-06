const Discord = require('discord.js');
const {
  loadavg,
  cpus,
  totalmem
} = require('os');
const fs = require("fs");
const lang = require("../../json/options.json")
const FRphrase = require("../../json/fr/phrase.json")
const ENphrase = require("../../json/en/phrase.json")
exports.run = async (client, message, args) =>
{
  let id = message.guild.id

  let title;
  let processor;
  let ram;
  let userTitle;
  let user;

  if (lang[id].lang === "fr")
  {
    title = FRphrase.stats.title
    processor = FRphrase.stats.processor
    ram = FRphrase.stats.ram
    userTitle = FRphrase.stats.userTitle
    user = FRphrase.stats.user
  } else if (lang[id].lang === "en")
  {
    title = ENphrase.stats.title
    processor = ENphrase.stats.processor
    ram = ENphrase.stats.ram
    userTitle = ENphrase.stats.userTitle
    user = ENphrase.stats.user
  }
  let cpuCores = cpus().length;
  const randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  const embed = new Discord.MessageEmbed()
  embed.setColor(randomColor)
  embed.setTitle(title)
  embed.addField(userTitle, user + `\`${client.users.cache.size}\``, true)
    console.log(user + `\`${client.users.cache.size}\``)
    embed.addField(processor, `${(loadavg()[0]/cpuCores).toFixed(2)}% / 100%`, true)
    console.log(`${(loadavg()[0]/cpuCores).toFixed(2)}% / 100%`)
    embed.addField(ram, `${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB`, true)
    console.log(`${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB`)
  message.channel.send(embed)
}
