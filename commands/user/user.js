const Discord = require('discord.js');
const moment = require("moment");
const lang = require("../../json/options.json")
const FRperm = require("../../json/fr/perms.json");
const FRphrase = require("../../json/fr/phrase.json")
const ENperm = require("../../json/en/perms.json");
const ENphrase = require("../../json/en/phrase.json")

exports.run = (client, message, args) => {
    let id = message.guild.id

    let onlines;
    let idles;
    let dnds;
    let offlines;
    let acknow;
    let locale;
    let perm;
    let owner;
    let statu;
    let join;
    let permission;
    let roles;
    let attribut;

    if (lang[id].lang === "fr") {
        onlines = FRphrase.user.onlines
        idles = FRphrase.user.idles
        dnds = FRphrase.user.dnds
        offlines = FRphrase.user.offlines
        acknow = FRphrase.user.acknow
        locale = FRphrase.user.locale
        perm = FRphrase.user.perm
        owner = FRphrase.user.owner
        statu = FRphrase.user.statu
        join = FRphrase.user.join
        permission = FRphrase.user.permissions
        roles = FRphrase.user.roles
        attribut = FRphrase.user.attribut
    } else if (lang[id].lang === "en") {
        onlines = ENphrase.user.onlines
        idles = ENphrase.user.idles
        dnds = ENphrase.user.dnds
        offlines = ENphrase.user.offlines
        acknow = ENphrase.user.acknow
        locale = ENphrase.user.locale
        perm = ENphrase.user.perm
        owner = ENphrase.user.owner
        statu = ENphrase.user.statu
        join = ENphrase.user.join
        permission = ENphrase.user.permissions
        roles = ENphrase.user.roles
        attribut = ENphrase.user.attribut
    }

    const status = {
        online: `${onlines}`,
        idle: `${idles}`,
        dnd: `${dnds}`,
        offline: `${offlines}`
    };
    var permissions = [];
    var acknowledgements = acknow;

    moment.locale(locale)

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const randomColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });

    if (message.member.hasPermission("KICK_MEMBERS")) {
        permissions.push("Kick Members");
    }

    if (message.member.hasPermission("BAN_MEMBERS")) {
        permissions.push("Ban Members");
    }

    if (message.member.hasPermission("ADMINISTRATOR")) {
        permissions.push("Administrator");
    }

    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        permissions.push("Manage Messages");
    }

    if (message.member.hasPermission("MANAGE_CHANNELS")) {
        permissions.push("Manage Channels");
    }

    if (message.member.hasPermission("MENTION_EVERYONE")) {
        permissions.push("Mention Everyone");
    }

    if (message.member.hasPermission("MANAGE_NICKNAMES")) {
        permissions.push("Manage Nicknames");
    }

    if (message.member.hasPermission("MANAGE_ROLES")) {
        permissions.push("Manage Roles");
    }

    if (message.member.hasPermission("MANAGE_WEBHOOKS")) {
        permissions.push("Manage Webhooks");
    }

    if (message.member.hasPermission("MANAGE_EMOJIS")) {
        permissions.push("Manage Emojis");
    }

    if (permissions.length == 0) {
        permissions.push(perm);
    }

    if (member.user.id == message.guild.ownerID) {
        acknowledgements = owner;
    }

    const embed = new Discord.MessageEmbed()
        .setDescription(`<@${member.user.id}>`)
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor(randomColor)
        .setFooter(`ID: ${message.author.id}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setTimestamp()
        .addField(`${statu}`, `${status[member.user.presence.status]}`, true)
        .addField(`${join}:`, `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField('** **', '** **', true)
        .addField(`${permission}:`, `${permissions.join(', ')}`, true)
        .addField(`${roles} [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
        .addField(`${attribut}: `, `${acknowledgements}`, true);

    message.channel.send({
        embed
    });

}