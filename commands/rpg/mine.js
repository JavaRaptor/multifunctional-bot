const { MessageEmbed } = require("discord.js");
const fs = require("fs").promises;
const rpgFilePath = "./json/rpg.json";

const ores = [
  { name: "Pierre", chance: 70, min: 1, max: 5 },      // 70% de chance de trouver de la pierre
  { name: "Fer", chance: 20, min: 1, max: 3 },         // 20% de chance de trouver du fer
  { name: "Or", chance: 10, min: 1, max: 2 },          // 10% de chance de trouver de l'or
  { name: "Argent", chance: 8, min: 1, max: 2 },       // 8% de chance de trouver de l'argent
  { name: "Cuivre", chance: 3, min: 1, max: 4 },       // 3% de chance de trouver du cuivre
  { name: "Platine", chance: 15, min: 1, max: 1 },     // 15% de chance de trouver du platine
  { name: "Diamant", chance: 25, min: 1, max: 1 },     // 25% de chance de trouver du diamant
  { name: "Émeraude", chance: 20, min: 1, max: 1 },    // 20% de chance de trouver de l'émeraude
  { name: "Saphir", chance: 18, min: 1, max: 1 },      // 18% de chance de trouver du saphir
  { name: "Rubis", chance: 22, min: 1, max: 1 },       // 22% de chance de trouver du rubis
  { name: "Améthyste", chance: 12, min: 1, max: 1 },   // 12% de chance de trouver de l'améthyste
  { name: "Lapis-lazuli", chance: 7, min: 1, max: 2 }  // 7% de chance de trouver du lapis-lazuli
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

  let minedOres = [];

  // Calculer quels minerais le joueur trouve
  ores.forEach(ore => {
    if (Math.random() * 100 < ore.chance) { // Si le joueur trouve ce minerai
      let quantity = Math.floor(Math.random() * (ore.max - ore.min + 1)) + ore.min;
      minedOres.push({ name: ore.name, quantity });
      // Ajouter le minerai à l'inventaire
      if (!data[id].inventory[ore.name]) data[id].inventory[ore.name] = 0;
      data[id].inventory[ore.name] += quantity;
    }
  });

  if (minedOres.length === 0) {
    return message.channel.send("Tu n'as rien trouvé lors de ton exploration.");
  }

  // Sauvegarder les données mises à jour
  await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");

  // Création de l'embed avec les ressources trouvées
  const mineEmbed = new MessageEmbed()
    .setTitle(`${message.author.username}, tu as miné des ressources !`)
    .setColor("#00ff00")
    .setDescription(`Voici ce que tu as trouvé durant ton exploration :`);

  minedOres.forEach(ore => {
    mineEmbed.addField(`${ore.name}`, `+${ore.quantity}`, true);
  });

  mineEmbed.setFooter("Bonne chance pour la suite de ton aventure !");

  message.channel.send(mineEmbed);
};
