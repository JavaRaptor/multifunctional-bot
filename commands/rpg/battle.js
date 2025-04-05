const { MessageEmbed } = require("discord.js");
const fs = require("fs").promises;
const rpgFilePath = "./json/rpg.json";

const monsters = [
  { name: "Gobelin", hp: 30, damage: 5 },
  { name: "Orc", hp: 50, damage: 10 },
  { name: "Dragon", hp: 100, damage: 20 }
];

exports.run = async (client, message, args) => {
  let id = message.author.id;
  let data;

  try {
    data = JSON.parse(await fs.readFile(rpgFilePath, "utf8"));
  } catch (error) {
    console.error("Erreur de lecture du fichier JSON:", error);
    return message.channel.send("Une erreur est survenue en accédant à tes données de combat.");
  }

  if (!data[id]) {
    return message.channel.send("Tu n'as pas encore de personnage. Commence l'aventure avec !start.");
  }

  // Sélectionner un monstre aléatoire
  const monster = monsters[Math.floor(Math.random() * monsters.length)];

  let playerHp = data[id].stats.hp + data[id].stats.force; // La vie du joueur dépend de sa force
  let monsterHp = monster.hp;


  // Simuler un combat simple
  while (playerHp > 0 && monsterHp > 0) {
    // Le joueur attaque le monstre
    let playerDamage = Math.floor(Math.random() * (data[id].stats.force / 2)) + 5; // Dégâts du joueur
    monsterHp -= playerDamage;

    // Vérifie si le monstre est mort après l'attaque du joueur
    if (monsterHp <= 0) {
      break;
    }

    // Le monstre attaque le joueur
    let monsterDamage = Math.floor(Math.random() * monster.damage) + 5; // Dégâts du monstre
    playerHp -= monsterDamage;

    // Vérifie si le joueur est mort après l'attaque du monstre
    if (playerHp <= 0) {
      break;
    }
  }

  let resultEmbed;

  if (playerHp > 0) {
    // Le joueur gagne
    data[id].xp += 10; // Le joueur gagne de l'XP
    data[id].stats.hp = playerHp; // Mettre à jour les points de vie du joueur dans les données
    await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");

    resultEmbed = new MessageEmbed()
      .setTitle(`${message.author.username}, tu as gagné le combat !`)
      .setColor("#00ff00")
      .setDescription(`Tu as vaincu un ${monster.name} et gagné 10 XP !`)
      .addField("Points de vie restants", playerHp, true) // Montre les points de vie restants du joueur
      .addField("XP total", data[id].xp, true)
      .setFooter("Continue à te battre !");
  } else {
    // Le monstre gagne

    // Mettez les points de vie du joueur à 0 après la défaite
    data[id].stats.hp = 0; // Le joueur a perdu, donc les points de vie sont 0
    await fs.writeFile(rpgFilePath, JSON.stringify(data, null, 2), "utf8");

    resultEmbed = new MessageEmbed()
      .setTitle(`${message.author.username}, tu as perdu le combat !`)
      .setColor("#ff0000")
      .setDescription(`Tu as été vaincu par un ${monster.name}.`)
      .addField("Points de vie restants", 0, true) // Le joueur a perdu, donc les points de vie restants sont 0
      .setFooter("Essaye encore !");
  }

  // Affichage du résultat
  message.channel.send(resultEmbed);
};
