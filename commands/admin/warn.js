const Discord = require('discord.js');
const fs = require("fs");
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

exports.run = (client, message, args) => {
  let id = message.guild.id

  let warn;
  let success;
  let title;
  let mention;
  let reasons;
  let server;
  let raison;
  let warnedBy;
  let warnedIn;

  if (lang[id].lang === "fr") {
    warn = FRperm.MANAGE_CHANNELS
    success = FRphrase.warn.success
    title = FRphrase.warn.title
    mention = FRphrase.warn.error_mention
    reasons = FRphrase.warn.error_reason
    server = FRphrase.warn.error_server
    raison = FRphrase.warn.raison
    warnedBy = FRphrase.warn.warnedBy
    warnedIn = FRphrase.warn.warnedIn
  } else if (lang[id].lang === "en") {
    warn = ENperm.MANAGE_CHANNELS
    success = ENphrase.warn.success
    title = ENphrase.warn.title
    mention = ENphrase.warn.error_mention
    reasons = ENphrase.warn.error_reason
    server = ENphrase.warn.error_server
    raison = ENphrase.warn.raison
    warnedBy = ENphrase.warn.warnedBy
    warnedIn = ENphrase.warn.warnedIn
  }

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(warn);
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply(mention);
  if (reason.length < 1) return message.reply(reasons);
  let dmsEmbed = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor("#00ff00")
    .setDescription(`${warnedIn} \`${message.guild.name}\``)
    .addField(warnedBy, message.author.tag)
    .addField(raison, reason);
  user.send(dmsEmbed);
  message.delete();
  message.channel.send(`${success} ${user.tag}`)
}