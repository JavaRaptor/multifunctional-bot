const Discord = require("discord.js");
const fs = require("fs")

const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

exports.run = async (client, message, args) => {

    let id = message.guild.id
    let xp;
    let level;

    if (lang[id].lang === "fr")
    {
        xp = FRphrase.level.xp
        level = FRphrase.level.level
    } else if (lang[id].lang === "en")
    {
        xp = ENphrase.level.xp
        level = ENphrase.level.level
    }
    let data = JSON.parse(fs.readFileSync("./json/level.json"), "utf8")
    const key = `${message.guild.id}-${message.author.id}`;
    return message.channel.send(`${level} ${data[`${message.guild.id}-${message.author.id}`].level}\n${xp} ${data[`${message.guild.id}-${message.author.id}`].xp}`);
};