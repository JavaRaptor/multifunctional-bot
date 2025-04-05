const { MessageEmbed } = require("discord.js");
const fs = require("fs").promises;
const rpgFilePath = "./json/rpg.json";

const resources = [
  { name: "Bois", chance: 60, min: 1, max: 5 },  // 60% de chance de trouver du bois
  { name: "Essence-de-Chêne", chance: 20, min: 1, max: 3 }, // 20% de chance de trouver de l'essence de chêne
  { name: "Essence-de-Sapin", chance: 10, min: 1, max: 2 }, // 10% de chance de trouver de l'essence de sapin
  { name: "Essence-de-Pin", chance: 10, min: 1, max: 2 }  // 10% de chance de trouver de l'essence de pin
];

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

  let minedResources = [];

  // Calculer quelles ressources le joueur trouve
  resources.forEach(resource => {
    if (Math.random() * 100 < resource.chance) { // Si le joueur trouve cette ressource
      let quantity = Math.floor(Math.random() * (resource.max - resource.min + 1)) + resource.min;
      minedResources.push({ name: resource.name, quantity });
      // Ajouter la ressource à l'inventaire
      if (!data[id].inventory[resource.name]) data[id].inventory[resource.name] = 0;
      data[id].inventory[resource.name] += quantity;
    }
  });

  if (minedResources.length === 0) {
    return message.channel.send("Tu n'as rien trouvé lors de ton exploration.");
  }

  // Sauvegarder les données mises à jour
  await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");

  // Création de l'embed avec les ressources trouvées
  const mineEmbed = new MessageEmbed()
    .setTitle(`${message.author.username}, tu as miné des ressources !`)
    .setColor("#00ff00")
    .setDescription(`Voici ce que tu as trouvé durant ton exploration :`);

  minedResources.forEach(resource => {
    mineEmbed.addField(`${resource.name}`, `+${resource.quantity}`, true);
  });

  mineEmbed.setFooter("Bonne chance pour la suite de ton aventure !");

  message.channel.send(mineEmbed);
};
