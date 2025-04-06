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
        error1 = FRphrase.setwelcome.error1
        on = FRphrase.setwelcome.on
        error2 = FRphrase.setwelcome.error2
        off = FRphrase.setwelcome.off
        set = FRphrase.setwelcome.set
        error3 = FRphrase.setwelcome.error3
    } else if (lang[id].lang === "en")
    {
        administrator = ENperm.ADMINISTRATOR
        error1 = ENphrase.setwelcome.error1
        on = ENphrase.setwelcome.on
        error2 = ENphrase.setwelcome.error2
        off = ENphrase.setwelcome.off
        set = ENphrase.setwelcome.set
        error3 = ENphrase.setwelcome.error3
    }

    if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.reply(administrator);
    }

    if (!args[0]) {
        return message.reply(error1);
    }

    let data = JSON.parse(fs.readFileSync(path, "utf8"));

    if (!data[id]) {
        data[id] = {
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
        if(data[id].welcID != 0){
            data[id].welcome = true;
            fs.writeFileSync(path, JSON.stringify(data, null, 2));
            return message.channel.send(on);
        } else {
            return message.channel.send(error2)
        }
        
    }

    if (args[0].toLowerCase() === "off") {
        data[id].welcome = false;
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        return message.channel.send(off);
    }

    // Définir le salon de bienvenue
    const channel = message.mentions.channels.first();
    if (channel) {
        data[id].welcID = channel.id;
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        return message.channel.send(`${set} <#${channel.id}>.`);
    }

    return message.reply(error3);
};
