const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const ENperm = require("../../json/en/perms.json");

exports.run = (client, message, args) =>
{
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
  message.channel.send("Redémarrage du bot.")
  setTimeout(() =>
  {
    client.destroy()
            setTimeout(() =>
            {
    process.exit(1);
      },2000)
    },2000)
};
