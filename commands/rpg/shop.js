const { MessageEmbed } = require("discord.js");
const fs = require("fs").promises;
const rpgFilePath = "./json/rpg.json";

const shopItems = [
  { name: "Potion de Vie", price: 5, effect: "Restaure 20 HP", type: "health" },
  { name: "Épée en Fer", price: 20, effect: "Augmente la Force de 5", type: "stats" },
  { name: "Bouclier de Bronze", price: 15, effect: "Augmente l'Agilité de 5", type: "stats" }
];

exports.run = async (client, message, args) => {
  let id = message.author.id;
  let data;

  try {
    data = JSON.parse(await fs.readFile(rpgFilePath, "utf8"));
  } catch (error) {
    console.error("Erreur de lecture du fichier JSON:", error);
    return message.channel.send("Une erreur est survenue en accédant à la boutique.");
  }

  if (!data[id]) {
    return message.channel.send("Tu n'as pas encore de personnage. Commence l'aventure avec !start.");
  }

  let embed = new MessageEmbed()
    .setTitle("Bienvenue dans la boutique !")
    .setColor("#00ff00")
    .setDescription("Voici les objets disponibles à l'achat :");

  shopItems.forEach((item) => {
    embed.addField(`${item.name} - ${item.price} Or`, item.effect, true);
  });

  embed.setFooter("Pour acheter, utilise !buy [nom de l'objet].");

  message.channel.send(embed);
};

exports.buy = async (client, message, args) => {
  let id = message.author.id;
  let data;

  try {
    data = JSON.parse(await fs.readFile(rpgFilePath, "utf8"));
  } catch (error) {
    console.error("Erreur de lecture du fichier JSON:", error);
    return message.channel.send("Une erreur est survenue lors de ton achat.");
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

  // Soustraire l'or et ajouter l'objet
  data[id].gold -= item.price;

  if (item.type === "stats") {
    // Augmenter les stats du joueur en fonction de l'objet
    if (item.name === "Épée en Fer") {
      data[id].stats.force += 5;
    } else if (item.name === "Bouclier de Bronze") {
      data[id].stats.agilite += 5;
    }
  }

  // Si c'est une potion de vie, l'ajouter à l'inventaire
  if (item.type === "health") {
    if (!data[id].inventory.HealthPotions) {
      data[id].inventory.HealthPotions = 0;
    }
    data[id].inventory.HealthPotions += 1;
  }

  try {
    await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Erreur d'écriture dans le fichier JSON:", error);
    return message.channel.send("Une erreur est survenue lors de l'enregistrement de ton achat.");
  }

  message.channel.send(`Tu as acheté un(e) ${item.name} !`);
};
