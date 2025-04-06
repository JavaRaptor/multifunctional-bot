const Discord = require('discord.js');
const fs = require('fs');
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

exports.run = (client, message, args) =>
{
    let id = message.guild.id
    let error;
    let command;
    let group;
    let desc;
    let use;
    let example;

    if (lang[id].lang === "fr")
    {
        error = FRphrase.help.error
        command = FRphrase.help.command
        group = FRphrase.help.group
        desc = FRphrase.help.desc
        use = FRphrase.help.use
        example = FRphrase.help.example
    } else if (lang[id].lang === "en")
    {
        error = ENphrase.help.error
        command = ENphrase.help.command
        group = ENphrase.help.group
        desc = ENphrase.help.desc
        use = ENphrase.help.use
        example = ENphrase.help.example
    }

    const commands = message.content.split(' ');
    if (commands[1] != undefined) {
        fs.readFile('./json/commands.json', (err, dataJson) =>
        {
            if (err) throw err;
            let helpMe = JSON.parse(dataJson);
            let commandName = commands[1];
            try {
                const embed = new Discord.MessageEmbed()
                    .setColor("#FF4500")
                    .addField(`${command}: ,${helpMe[commandName].name}`, `${group}: ${helpMe[commandName].permissions}\n` + `${desc}: ${helpMe[commandName].desc}\n` + `${use}: ${helpMe[commandName].usage}\n` + `${example}: ${helpMe[commandName].example}\n`);
                message.channel.send(embed);
            } catch (error)
            {
                message.channel.send(error);
            }
        });
    } else
    {
        let embed = new Discord.MessageEmbed()
            .setTitle("Menu d'aide")
            .addField("Administration", "`ban`,`kick`,`warn`,`setlang`,`setprefix`")
            .addField("User", "`bug`,`user`,`help`,`stats`,`bl-report`,`checkid`,`staff`")
            .addField("Rpg", "`profile`,`level`,`battle`,`buy`,`inventory`,`levelup`,`mine`,`minewood`,`sell`,`shop`,`start`,`use`")
            .addField("Owner", "`reload`,`dm`,`eval`,`restart`,`bl-add`,`bl-del`,`maintenance`,`endmaintenance`")
            .setDescription(`[Serveur Support](https://discord.gg/k8YzNr9sf6) | [Invite Bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
        message.channel.send(embed);
    }
}
