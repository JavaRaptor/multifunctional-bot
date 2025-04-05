const { MessageEmbed } = require("discord.js");
const fs = require("fs").promises;
const rpgFilePath = "./json/rpg.json";

// Liste des objets disponibles à la vente dans la boutique
const shopItems = [
  { name: "Potion de Vie", price: 5, effect: "Restaure 20 HP", type: "health" },
  { name: "Épée en Fer", price: 20, effect: "Augmente la Force de 5", type: "stats", stat: "force" },
  { name: "Bouclier de Bronze", price: 15, effect: "Augmente l'Agilité de 5", type: "stats", stat: "agilite" }
];

exports.run = async (client, message, args) => {
  let id = message.author.id;
  let data;

  // Lecture du fichier RPG pour obtenir les données du joueur
  try {
    data = JSON.parse(await fs.readFile(rpgFilePath, "utf8"));
  } catch (error) {
    console.error("Erreur de lecture du fichier JSON:", error);
    return message.channel.send("Une erreur est survenue en accédant à tes données.");
  }

  if (!data[id]) {
    return message.channel.send("Tu n'as pas encore de personnage. Commence l'aventure avec !start.");
  }

  const itemName = args.join(" ").toLowerCase();
  const item = shopItems.find(i => i.name.toLowerCase() === itemName);

  if (!item) {
    return message.channel.send("Cet objet n'est pas disponible dans la boutique.");
  }

  if (data[id].gold < item.price) {
    return message.channel.send("Tu n'as pas assez d'or pour acheter cet objet.");
  }

  // Soustraire l'or et ajouter l'objet à l'inventaire ou mettre à jour les stats
  data[id].gold -= item.price;

  if (item.type === "stats") {
    // Augmenter les statistiques du joueur
    data[id].stats[item.stat] += 5;
  } else if (item.type === "health") {
    // Ajouter des potions à l'inventaire
    if (!data[id].inventory.HealthPotions) {
      data[id].inventory.HealthPotions = 0;
    }
    data[id].inventory.HealthPotions += 1;
  }

  // Mise à jour du fichier JSON avec les nouvelles données
  try {
    await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Erreur d'écriture dans le fichier JSON:", error);
    return message.channel.send("Une erreur est survenue lors de l'enregistrement de ton achat.");
  }

  // Envoi d'un message de confirmation
  const embed = new MessageEmbed()
    .setTitle("Achat Réussi !")
    .setColor("#00ff00")
    .setDescription(`Tu as acheté ${item.name} pour ${item.price} Or.`);

  if (item.type === "stats") {
    embed.addField("Nouvelle Statistique", `${item.stat.charAt(0).toUpperCase() + item.stat.slice(1)} +5`, true);
  } else if (item.type === "health") {
    embed.addField("Nouvelle Potion", "Tu as ajouté une potion de vie à ton inventaire.", true);
  }

  message.channel.send(embed);
};
