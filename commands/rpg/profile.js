const { MessageEmbed } = require("discord.js");
const fs = require("fs").promises;
const rpgFilePath = "./json/rpg.json";

exports.run = async (client, message, args) => {
  let id = message.author.id;
  let data;

  try {
    data = JSON.parse(await fs.readFile(rpgFilePath, "utf8"));
  } catch (error) {
    console.error("Erreur de lecture du fichier JSON:", error);
    return message.channel.send("Une erreur est survenue en accédant à ton inventaire.");
  }

  if (!data[id]) {
    return message.channel.send("Tu n'as pas encore de personnage. Commence l'aventure avec !start.");
  }

  const inventory = data[id].inventory;
  const stats = data[id].stats;

  // Création de l'embed pour l'inventaire
  let embed = new MessageEmbed()
    .setTitle(`${message.author.username},Statistique`)
    .setColor("#00ff00")
    .addField("Santé", stats.hp, true)
    .addField("Mana", stats.mana, true)
    .addField("Force", stats.force, true)
    .addField("Agilité", stats.agilite, true)
    .addField("Intelligence", stats.intelligence, true)
    .addField("Charisme", stats.charisme, true)
    .setFooter("Continue ton aventure !");
  
  message.channel.send(embed);
};