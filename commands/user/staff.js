const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const lang = require("../../json/options.json");
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json");
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json");
const staffFilePath = "./json/staff.json";

// Remplacer par l'ID Discord du propriétaire du bot
const ownerID = "544853657896615937"; // Mettez ici votre ID Discord

module.exports.run = (bot, message, args) => {
    let admin;
    let error;
    let title;
    let id = message.guild.id;

    if (lang[id].lang === "fr") {
        admin = FRperm.ADMINISTRATOR;
        error = FRphrase.staff.error;
        title = FRphrase.staff.title;
    } else if (lang[id].lang === "en") {
        admin = ENperm.ADMINISTRATOR;
        error = ENphrase.staff.error;
        title = ENphrase.staff.title;
    }

    // Vérifie si l'utilisateur a la permission d'administrateur
    if (!message.member.hasPermission(admin)) {
        return message.channel.send(error);
    }

    // Charger les données de staff.json
    let staffData = JSON.parse(fs.readFileSync(staffFilePath, "utf8"));

    // Vérifie si le bot est en maintenance
    if (staffData.maintenance) {
        const maintenanceEmbed = new MessageEmbed()
            .setTitle("Bot en maintenance")
            .setColor("RED")
            .setDescription(`Le bot est actuellement en maintenance. Raison : ${staffData.reason}`);
        return message.channel.send(maintenanceEmbed);
    }

    if (!args[0]) return message.channel.send(error); // Si aucun argument n'est fourni

    // Afficher la liste des membres du staff
    if (args[0] === 'list') {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor('GREEN');
        if (staffData.staff.length > 0) {
            embed.setDescription(`Liste des membres du staff : ${staffData.staff.join(', ')}`);
        } else {
            embed.setDescription("Aucun membre dans le staff.");
        }
        message.channel.send(embed);
    }

    // Ajouter un membre au staff
    if (args[0] === 'add') {
        if (message.author.id !== ownerID) {
            return message.channel.send("Vous n'êtes pas autorisé à ajouter des membres au staff.");
        }

        if (!args[1]) return message.channel.send("Veuillez spécifier un ID utilisateur à ajouter au staff.");

        const userId = args[1];

        // Vérifier si l'utilisateur est déjà dans le staff
        if (staffData.staff.includes(userId)) {
            return message.channel.send("Cet utilisateur est déjà dans le staff.");
        }

        // Ajouter l'utilisateur au tableau staff
        staffData.staff.push(userId);
        fs.writeFileSync(staffFilePath, JSON.stringify(staffData, null, 2)); // Sauvegarder les modifications

        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor('GREEN')
            .setDescription(`L'utilisateur <@${userId}> a été ajouté au staff.`);
        message.channel.send(embed);
    }

    // Retirer un membre du staff
    if (args[0] === 'remove') {
        if (message.author.id !== ownerID) {
            return message.channel.send("Vous n'êtes pas autorisé à retirer des membres du staff.");
        }

        if (!args[1]) return message.channel.send("Veuillez spécifier un ID utilisateur à retirer du staff.");

        const userId = args[1];

        // Vérifier si l'utilisateur fait partie du staff
        if (!staffData.staff.includes(userId)) {
            return message.channel.send("Cet utilisateur ne fait pas partie du staff.");
        }

        // Retirer l'utilisateur du tableau staff
        staffData.staff = staffData.staff.filter(id => id !== userId);
        fs.writeFileSync(staffFilePath, JSON.stringify(staffData, null, 2)); // Sauvegarder les modifications

        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor('RED')
            .setDescription(`L'utilisateur <@${userId}> a été retiré du staff.`);
        message.channel.send(embed);
    }

    // Activer la maintenance
    if (args[0] === 'maintenance') {
        if (message.author.id !== ownerID) {
            return message.channel.send("Vous n'êtes pas autorisé à activer ou désactiver la maintenance.");
        }

        if (!args[1]) return message.channel.send("Veuillez spécifier si la maintenance doit être activée (true/false).");

        const maintenanceStatus = args[1].toLowerCase() === 'true';

        if (maintenanceStatus) {
            // Vérifier si une raison est donnée
            const reason = args.slice(2).join(' ') || "Aucune raison spécifiée";
            staffData.maintenance = true;
            staffData.reason = reason;
            fs.writeFileSync(staffFilePath, JSON.stringify(staffData, null, 2)); // Sauvegarder les modifications

            const embed = new MessageEmbed()
                .setTitle("Maintenance activée")
                .setColor('RED')
                .setDescription(`Le bot est maintenant en maintenance. Raison : ${reason}`);
            message.channel.send(embed);
        } else {
            // Désactiver la maintenance
            staffData.maintenance = false;
            staffData.reason = "";
            fs.writeFileSync(staffFilePath, JSON.stringify(staffData, null, 2)); // Sauvegarder les modifications

            const embed = new MessageEmbed()
                .setTitle("Maintenance désactivée")
                .setColor('GREEN')
                .setDescription("La maintenance du bot a été désactivée.");
            message.channel.send(embed);
        }
    }
};
