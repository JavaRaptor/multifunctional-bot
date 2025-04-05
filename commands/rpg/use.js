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
    return message.channel.send("Une erreur est survenue lors de l'utilisation de l'objet.");
  }

  if (!data[id]) {
    return message.channel.send("Tu n'as pas encore de personnage. Commence l'aventure avec !start.");
  }

  const itemName = args.join(" ").toLowerCase();
  if (itemName === "potion de vie") {
    if (data[id].inventory.HealthPotions > 0) {
      data[id].inventory.HealthPotions -= 1;
      data[id].stats.hp = data[id].stats.hp + 20; // Restaure les points de vie du joueur
      try {
        await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");
      } catch (error) {
        console.error("Erreur d'écriture dans le fichier JSON:", error);
        return message.channel.send("Une erreur est survenue lors de l'enregistrement de l'objet utilisé.");
      }
      message.channel.send("Tu as utilisé une potion de vie et restauré tes points de vie !");
    } else {
      message.channel.send("Tu n'as pas de potion de vie dans ton inventaire.");
    }
  } else {
    message.channel.send("Cet objet n'existe pas.");
  }
};
