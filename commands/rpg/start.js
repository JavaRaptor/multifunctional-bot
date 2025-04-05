const { MessageEmbed } = require("discord.js");
const fs = require("fs").promises;
const rpgFilePath = "./json/rpg.json";

const lang = require("../../json/options.json");
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json");
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json");

exports.run = async (client, message, args) => {
  let id = message.guild.id;

  let error1;
  let hasAccount;
  let error2;
  let startAdventure;
  let desc;
  let niveau;
  let requiredXp;
  let gold;
  let force;
  let agilite;
  let intelligence;
  let charisme;
  let footer;
  let error3;
  let error4;

  if (lang[id].lang === "fr") {
    error1 = FRphrase.start.error1;
    hasAccount = FRphrase.start.hasAccount;
    error2 = FRphrase.start.error2;
    startAdventure = FRphrase.start.startAdventure;
    desc = FRphrase.start.desc;
    niveau = FRphrase.start.niveau;
    requiredXp = FRphrase.start.requiredXp;
    gold = FRphrase.start.gold;
    force = FRphrase.start.force;
    agilite = FRphrase.start.agilite;
    intelligence = FRphrase.start.intelligence;
    charisme = FRphrase.start.charisme;
    footer = FRphrase.start.footer;
    error3 = FRphrase.start.error3;
    error4 = FRphrase.start.error4;
  } else if (lang[id].lang === "en") {
    error1 = ENphrase.start.error1;
    hasAccount = ENphrase.start.hasAccount;
    error2 = ENphrase.start.error2;
    startAdventure = ENphrase.start.startAdventure;
    desc = ENphrase.start.desc;
    niveau = ENphrase.start.niveau;
    requiredXp = ENphrase.start.requiredXp;
    gold = ENphrase.start.gold;
    force = ENphrase.start.force;
    agilite = ENphrase.start.agilite;
    intelligence = ENphrase.start.intelligence;
    charisme = ENphrase.start.charisme;
    footer = ENphrase.start.footer;
    error3 = ENphrase.start.error3;
    error4 = ENphrase.start.error4;
  }

  let Author = message.author.id;
  let data;

  try {
    // Lire le fichier JSON contenant les données des joueurs
    data = JSON.parse(await fs.readFile(rpgFilePath, "utf8"));
  } catch (error) {
    return message.channel.send(error1);
  }

  // Vérifier si le joueur existe déjà dans les données
  if (data[Author]) {
    return message.channel.send(hasAccount);
  }

  // Créer le personnage initial du joueur
  data[Author] = {
    level: 1,
    xp: 0,
    requiredxp: 100,
    gold: 10,
    inventory: {
      stone: 0,
      iron: 0,
    },
    stats: {
      hp: 100,
      mana: 10,
      force: 1,
      agilite: 1,
      intelligence: 1,
      charisme: 1,
    },
    quest: null, // Le joueur commence sans quête
    equipped: null, // Le joueur commence sans équipement
  };
  try {
    // Sauvegarder les données du joueur dans le fichier JSON
    await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    return message.channel.send(error2);
  }

  // Création de l'embed pour accueillir le joueur et commencer l'aventure
  let embed = new MessageEmbed()
    .setTitle(`${message.author.username}, ${startAdventure}`)
    .setColor("#00ff00")
    .setDescription(desc)
    .addField(niveau, "1", true)
    .addField("XP", "0", true)
    .addField(requiredXp, "100", true)
    .addField(gold, "10", false)
    .addField(
      "Stats",
      `${force}: 1 | ${agilite}: 1 | ${intelligence}: 1 | ${charisme}: 1`,
      false
    )
    .setFooter(footer);

  // Log des informations de l'embed avant envoi

  // Vérification du contenu de l'embed avant l'envoi
  if (!embed || !embed.fields || embed.fields.length === 0) {
    return message.channel.send(
      error3
    );
  }

  // Envoi de l'embed du profil du joueur avec la méthode différente
  try {
    await message.channel.send(embed); // Utilisation directe de l'embed sans tableau
  } catch (error) {
    message.channel.send(error4);
  }
};
