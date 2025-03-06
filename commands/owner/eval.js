const {
    MessageEmbed
} = require('discord.js')
const lang = require("../../json/options.json");
const FRperm = require("../../json/fr/perms.json");
const ENperm = require("../../json/en/perms.json");

module.exports.run = (bot, message) =>
{
    const args = message.content.split(" ").slice(1);
    let coding = args.join(' ');
    try {
        let owner;
        let id = message.guild.id
        if (lang[id].lang === "fr")
        {
            owner = FRperm.OWNER
        } else if (lang[id].lang === "en")
        {
            owner = ENperm.OWNER
        }
        let Admin = [`544853657896615937`]
        if (!Admin.includes(message.author.id)) return message.channel.send(owner);

        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        let embed = new MessageEmbed()
            .setColor('#867E88')
            .setTitle('Eval')
            .addField('**Input**', '```js\n' + coding + '```')
            .addField('**Output**', '```js\n' + evaled + '```')
        message.channel.send(embed)

    } catch (err)
    {
        let embed = new MessageEmbed()
            .setColor('#867E88')
            .setTitle('Eval')
            .addField('**Input**', '```js\n' + coding + '```')
            .addField('**Output**', `\`\`\`js\n${err}\n\`\`\``)
        message.channel.send(embed)
    }
}
