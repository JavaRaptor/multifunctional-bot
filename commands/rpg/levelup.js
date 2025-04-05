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
    return message.channel.send("Une erreur est survenue en accédant à tes données de niveau.");
  }

  if (!data[id]) {
    return message.channel.send("Tu n'as pas encore de personnage. Commence l'aventure avec !start.");
  }

  // Vérifier si le joueur a suffisamment d'XP pour monter de niveau
  if (data[id].xp < data[id].requiredxp) {
    return message.channel.send("Tu n'as pas assez d'XP pour passer au niveau supérieur.");
  }

  // Augmenter le niveau et les statistiques
  data[id].level += 1;
  data[id].xp = 0; // Réinitialiser l'XP
  data[id].requiredxp = data[id].requiredxp *1.5;
  data[id].stats.force += 1;
  data[id].stats.agilite += 1;
  data[id].stats.intelligence += 1;
  data[id].stats.charisme += 1;

  // Sauvegarder les nouvelles données du joueur
  try {
    await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Erreur d'écriture dans le fichier JSON:", error);
    return message.channel.send("Une erreur est survenue lors de la mise à jour de tes données.");
  }

  // Créer l'embed de niveau
  let embed = new MessageEmbed()
    .setTitle(`${message.author.username}, tu as monté de niveau !`)
    .setColor("#00ff00")
    .addField("Nouveau Niveau", data[id].level, true)
    .addField("XP", data[id].xp, true)
    .addField("XP Requis", data[id].requiredxp, true)
    .addField("Force", data[id].stats.force, true)
    .addField("Agilité", data[id].stats.agilite, true)
    .addField("Intelligence", data[id].stats.intelligence, true)
    .addField("Charisme", data[id].stats.charisme, true)
    .setFooter("Félicitations pour ton évolution !");
  
  message.channel.send(embed);
};
