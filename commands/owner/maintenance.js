const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

module.exports.run = (client, message, args) => {

  let id = message.guild.id
  let permissions;
  let noRaison;
  let title;
  let desc;
  let footer;
    if (lang[id].lang === "fr")
    {
        permissions = FRphrase.maintenanceCommande.permissions
        noRaison = FRphrase.maintenanceCommande.noRaison
        title = FRphrase.maintenanceCommande.title
        desc = FRphrase.maintenanceCommande.desc
        footer = FRphrase.maintenanceCommande.footer
    } else if (lang[id].lang === "en")
    {
        permissions = ENphrase.maintenanceCommande.permissions
        noRaison = ENphrase.maintenanceCommande.noRaison
        title = ENphrase.maintenanceCommande.title
        desc = ENphrase.maintenanceCommande.desc
        footer = ENphrase.maintenanceCommande.footer
    }
    
    // Vérifier si l'utilisateur est dans la liste du staff
    const maintenanceData = JSON.parse(fs.readFileSync("./json/staff.json", "utf8"));
    if (!maintenanceData.staff.includes(message.author.id)) {
      return message.channel.send(permissions);
    }

    // Vérifier s'il y a une raison dans les arguments
    if (!args.length) {
      return message.channel.send(noRaison);
    }

    // Joindre tous les arguments comme raison
    const reason = args.join(" ");

    // Mettre à jour l'état de la maintenance et la raison
    maintenanceData.maintenance = true; // Activer la maintenance
    maintenanceData.reason = reason;

    // Sauvegarder les données de maintenance dans le fichier
    fs.writeFileSync("./json/staff.json", JSON.stringify(maintenanceData, null, 2), "utf8");

    // Répondre au message
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(`${desc} ${reason}`)
      .setColor("#FF0000")
      .setFooter(footer);

    message.channel.send(embed);
};
