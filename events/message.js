const Discord = require("discord.js");
const fs = require("fs")
const Enmap = require("enmap");
const db = new Enmap({ name:"xp1" });

module.exports = async (client, message) => {
  if (message.author.bot) return;
  message.guild === null;

  if (message.channel.type === "dm") {
    return message.channel.send("Vous ne pouvez pas me parler pas message privé")
  }

  let prefixes = JSON.parse(fs.readFileSync("./json/options.json"), "utf8")

  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: "!"
    }
  }

  let data = JSON.parse(fs.readFileSync("./json/level.json"), "utf8")

  if(!data[`${message.guild.id}-${message.author.id}`]) {
    data[`${message.guild.id}-${message.author.id}`] = {
      level: 1,
      xp: 0,
      xpMax: 100
    }
  }

  if(data[`${message.guild.id}-${message.author.id}`]) {
    data[`${message.guild.id}-${message.author.id}`].xp = data[`${message.guild.id}-${message.author.id}`].xp + 1;
  }

  if(data[`${message.guild.id}-${message.author.id}`].xp >= data[`${message.guild.id}-${message.author.id}`].xpMax) {
    let xpMaxNew = Math.floor(1.7 * data[`${message.guild.id}-${message.author.id}`].xpMax);
    data[`${message.guild.id}-${message.author.id}`].xpMax = xpMaxNew;
    data[`${message.guild.id}-${message.author.id}`].xp = 0;
    data[`${message.guild.id}-${message.author.id}`].level = data[`${message.guild.id}-${message.author.id}`].level + 1;
    message.reply(`Tu viens de monté level ${data[`${message.guild.id}-${message.author.id}`].level}`);
  }

  fs.writeFileSync('./json/level.json', JSON.stringify(data));
  
  let prefix = prefixes[message.guild.id].prefixes
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (message.content.startsWith(prefix)) {
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);
  }
  client.user.setActivity(`${client.guilds.cache.size} Servers`)

  if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
    message.channel.send(`Mon prefix est \`${prefix}\``)
  }
}