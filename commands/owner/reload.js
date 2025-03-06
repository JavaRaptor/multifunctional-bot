const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

exports.run = (client, message, args) =>
{
  let id = message.guild.id

  let owner;
  let arg;
  let command;
  let files;

  if (lang[id].lang === "fr")
  {
    owner = FRperm.OWNER
    arg = FRphrase.reload.arg
    command = FRphrase.reload.command
    files = FRphrase.reload.files
  } else if (lang[id].lang === "en")
  {
    owner = ENperm.OWNER
    arg = ENphrase.reload.arg
    command = ENphrase.reload.command
    files = ENphrase.reload.files
  }

  let Admin = [`544853657896615937`]
  if (!Admin.includes(message.author.id)) return message.channel.send(owner);
  if (!args || args.length < 1) return message.reply(arg);
  const commandName = args[0];
  if (!client.commands.has(commandName))
  {
    return message.reply(command);
  }
  delete require.cache[require.resolve(`./${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(files);
};
