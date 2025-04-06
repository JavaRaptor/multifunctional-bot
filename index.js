const {
  MessageEmbed,
  WebhookClient,
  Client,
  Collection,
} = require("discord.js");
const fs = require("fs");
const client = new Client();
const { QuickDB } = require("quick.db");
require('dotenv').config();
const discordToken = process.env.TOKEN;

const lang = require("./json/options.json")
const FRperm = require("./json/fr/perms.json");
const FRphrase = require("./json/fr/phrase.json")
const ENperm = require("./json/en/perms.json");
const ENphrase = require("./json/en/phrase.json")

client.commands = new Collection();
client.login(process.env.TOKEN);

//events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event]${eventName}`)
    client.on(eventName, event.bind(null, client));
  });
});

//commands admin
fs.readdir("./commands/admin/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/admin/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[Commande | Admin]${commandName}`);
    client.commands.set(commandName, props);
  });
});

//commands owner
fs.readdir("./commands/owner/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/owner/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[Commande | Owner]${commandName}`);
    client.commands.set(commandName, props);
  });
});

//commands owner
fs.readdir("./commands/rpg/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/rpg/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[Commande | Rpg]${commandName}`);
    client.commands.set(commandName, props);
  });
});

//commands user
fs.readdir("./commands/user/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/user/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[Commande | User]${commandName}`);
    client.commands.set(commandName, props);
  });
});

//JSON CONFIG
fs.readdir("./json/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".json")) return;
    let props = require(`./json/${file}`);
    let fileName = file.split(".")[0];
    console.log(`[Json]${fileName}`);
  });
});

//LANG EN
fs.readdir("./json/en/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".json")) return;
    let props = require(`./json/en/${file}`);
    let fileName = file.split(".")[0];
    console.log(`[Anglais]${fileName}`);
  });
});

//LANG FR
fs.readdir("./json/fr/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".json")) return;
    let props = require(`./json/fr/${file}`);
    let fileName = file.split(".")[0];
    console.log(`[Francais]${fileName}`);
  });
}); 