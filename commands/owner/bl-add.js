const Discord = require("discord.js");
const fs = require("fs")

const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = (client, message, args) => {

    let id = message.guild.id

    let owner;
    let error_id;
    let success;

    if (lang[id].lang === "fr")
    {
        owner = FRperm.OWNER
        error_id = FRphrase.blAdd.error_id
        success = FRphrase.blAdd.success
    } else if (lang[id].lang === "en")
    {
        owner = ENperm.OWNER
        error_id = ENphrase.blAdd.error_id
        success = ENphrase.blAdd.success
    }

    let Admin = [`544853657896615937`]
    if (!Admin.includes(message.author.id)) return message.channel.send(owner);
    if (!args[0]) return message.channel.send(error_id);

    let blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json"), "utf8")

    blacklist[args[0]] = {
        status: true,
        proof: args[1],
        reason: args.slice(2).join(" ")
    }
    fs.writeFileSync('./json/blacklist.json', JSON.stringify(blacklist));
    message.channel.send(`<@${args[0]}>` + " " + success)
}