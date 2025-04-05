const fs = require("fs");
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")
module.exports.run = (client, message, args) => {

let id = message.guild.id

    let permissions;
    let retour;
    
    if (lang[id].lang === "fr")
    {
        permissions = FRphrase.endMaintenanceCommande.permissions
        retour = FRphrase.endMaintenanceCommande.retour
    } else if (lang[id].lang === "en")
    {
        permissions = ENphrase.endMaintenanceCommande.permissions
        retour = ENphrase.endMaintenanceCommande.retour
    }

    // Vérifier si l'utilisateur est dans la liste du staff
    const maintenanceData = JSON.parse(fs.readFileSync("./json/staff.json", "utf8"));
    if (!maintenanceData.staff.includes(message.author.id)) {
      return message.channel.send(permissions);
    }

    // Désactiver la maintenance
    maintenanceData.maintenance = false;
    maintenanceData.reason = ""; // Réinitialiser la raison

    // Sauvegarder les données dans le fichier
    fs.writeFileSync("./json/staff.json", JSON.stringify(maintenanceData, null, 2), "utf8");

    // Répondre au message
    message.channel.send(retour);
};
