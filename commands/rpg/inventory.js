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
    return message.channel.send("Une erreur est survenue en accédant à tes données.");
  }

  if (!data[id]) {
    return message.channel.send("Tu n'as pas encore de personnage. Commence l'aventure avec !start.");
  }

  const inventoryEmbed = new MessageEmbed()
    .setTitle(`${message.author.username}, ton inventaire`)
    .setColor("#00ff00")
    .setDescription("Voici les minerais que tu as dans ton inventaire :");

  const inventory = data[id].inventory;
  if (Object.keys(inventory).length === 0) {
    return message.channel.send("Tu n'as aucun minerai dans ton inventaire.");
  }

  for (const [ore, quantity] of Object.entries(inventory)) {
    inventoryEmbed.addField(ore, `${quantity}`, true);
  }

  message.channel.send(inventoryEmbed);
};
