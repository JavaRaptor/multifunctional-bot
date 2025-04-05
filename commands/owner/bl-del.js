const Discord = require("discord.js");
const fs = require("fs");

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
    let noInDb;

    if (lang[id].lang === "fr")
    {
        owner = FRperm.OWNER
        error_id = FRphrase.blDel.error_id
        success = FRphrase.blDel.success
        noInDb = FRphrase.blDel.noInDb
    } else if (lang[id].lang === "en")
    {
        owner = ENperm.OWNER
        error_id = ENphrase.blDel.error_id
        success = ENphrase.blDel.success
        noInDb = FRphrase.blDel.noInDb
    }

    let Admin = [`544853657896615937`]
    if (!Admin.includes(message.author.id)) return message.channel.send(owner);
    if (!args[0]) return message.channel.send(error_id);
    let blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json"), "utf8")

    const jsonData = JSON.parse(fs.readFileSync("./json/blacklist.json", 'utf8'));
    if (jsonData[args[0]] && jsonData[args[0]] !== undefined) {
        const status = jsonData[args[0]].status;
        if(status == true) {
            blacklist[args[0]] = {
                status: false
            }
            fs.writeFileSync('./json/blacklist.json', JSON.stringify(blacklist));
            message.channel.send(`<@${args[0]}>` + " " + success)
        } else {
            message.channel.send(noInDb)
        }
      } else {
        message.channel.send(noInDb)
      }

    
}