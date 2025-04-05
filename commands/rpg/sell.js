const { MessageEmbed } = require("discord.js");
const fs = require("fs").promises;
const rpgFilePath = "./json/rpg.json";

const orePrices = {
  "Pierre": 2,
  "Fer": 5,
  "Or": 10,
  "Argent": 8,
  "Cuivre": 3,
  "Platine": 15,
  "Diamant": 25,
  "Émeraude": 20,
  "Saphir": 18,
  "Rubis": 22,
  "Améthyste": 12,
  "Lapis-lazuli": 7,

  "Bois":5,
  "Essence-de-Chêne":10,
  "Essence-de-Sapin":15,
  "Essence-de-Pin":15
};

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

  // Si l'utilisateur tape !sell all
  if (args[0] === "all") {
    let totalPrice = 0;
    let anyOreSold = false;

    // Parcours chaque minerai dans l'inventaire du joueur
    for (let ore in orePrices) {
      if (data[id].inventory[ore] && data[id].inventory[ore] > 0) {
        const quantity = data[id].inventory[ore];
        const price = orePrices[ore];
        totalPrice += price * quantity;

        // Réduire l'inventaire du joueur pour ce minerai
        delete data[id].inventory[ore];
        anyOreSold = true;
      }
    }

    if (!anyOreSold) {
      return message.channel.send("Tu n'as aucun minerai à vendre.");
    }

    // Ajouter l'or au joueur
    data[id].gold += totalPrice;

    // Sauvegarder les données mises à jour
    await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");

    const sellEmbed = new MessageEmbed()
      .setTitle(`${message.author.username}, vente réussie !`)
      .setColor("#ffcc00")
      .setDescription(`Tu as vendu tous tes minerais pour ${totalPrice} Or !`)
      .addField("Or actuel", data[id].gold, true)
      .setFooter("Continue à explorer !");
      
    message.channel.send(sellEmbed);

  } else if (args[1] === "all") {
    // Si l'utilisateur tape !sell [minerai] all
    const ore = args[0];

    // Vérifier si le minerai est valide
    if (!orePrices[ore]) {
      return message.channel.send("Ce minerai n'est pas disponible à la vente.");
    }

    // Vérifier si le joueur a le minerai spécifié
    if (!data[id].inventory[ore] || data[id].inventory[ore] <= 0) {
      return message.channel.send(`Tu n'as pas de ${ore} à vendre.`);
    }

    const quantity = data[id].inventory[ore];
    const totalPrice = orePrices[ore] * quantity;

    // Vendre le minerai
    data[id].gold += totalPrice;
    delete data[id].inventory[ore];

    // Sauvegarder les données mises à jour
    await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");

    const sellEmbed = new MessageEmbed()
      .setTitle(`${message.author.username}, vente réussie !`)
      .setColor("#ffcc00")
      .setDescription(`Tu as vendu toutes tes ${ore} pour ${totalPrice} Or !`)
      .addField("Or actuel", data[id].gold, true)
      .setFooter("Continue à explorer !");

    message.channel.send(sellEmbed);

  } else {
    return message.channel.send("Usage : !sell all pour vendre tous tes minerais ou !sell [minerai] all pour vendre un type de minerai spécifique.");
  }
};
