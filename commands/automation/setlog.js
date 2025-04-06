const fs = require("fs");
const path = "./json/options.json";

const lang = require("../../json/options.json");
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = (client, message, args) => {

    let administrator;
    let error1;
    let on;
    let error2;
    let off;
    let set;
    let error3;

    let id = message.guild.id
    if (lang[id].lang === "fr")
    {
        administrator = FRperm.ADMINISTRATOR
        error1 = FRphrase.setlog.error1
        on = FRphrase.setlog.on
        error2 = FRphrase.setlog.error2
        off = FRphrase.setlog.off
        set = FRphrase.setlog.set
        error3 = FRphrase.setlog.error3
    } else if (lang[id].lang === "en")
    {
        administrator = ENperm.ADMINISTRATOR
        error1 = ENphrase.setlog.error1
        on = ENphrase.setlog.on
        error2 = ENphrase.setlog.error2
        off = ENphrase.setlog.off
        set = ENphrase.setlog.set
        error3 = ENphrase.setlog.error3
    }

    if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.reply(administrator);
    }

    if (!args[0]) {
        return message.reply(error1);
    }

    let data = JSON.parse(fs.readFileSync(path, "utf8"));
    const guildID = message.guild.id;

    if (!data[guildID]) {
        data[guildID] = {
            prefixes: "!",
            lang: "fr",
            logsID: 0,
            welcID: 0,
            blacklist: false,
            welcome: false,
            log: false
        };
    }

    // Activer la fonction welcome
    if (args[0].toLowerCase() === "on") {
        if(data[id].logsID != 0){
            data[guildID].log = true;
            fs.writeFileSync(path, JSON.stringify(data, null, 2));
            return message.channel.send(on);
        } else {
            return message.channel.send(error2)
        }
        
    }

    if (args[0].toLowerCase() === "off") {
        data[guildID].log = false;
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        return message.channel.send(off);
    }

    // Définir le salon de bienvenue
    const channel = message.mentions.channels.first();
    if (channel) {
        data[guildID].logsID = channel.id;
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        return message.channel.send(`${set} <#${channel.id}>.`);
    }

    return message.reply(error3);
};
