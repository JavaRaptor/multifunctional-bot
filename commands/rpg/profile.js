const { MessageEmbed } = require("discord.js")
const Enmap = require("enmap");
const db = new Enmap({ name:"adventure" });

exports.run = (client, message, args) => {
    let id = message.author.id
    if(db.has(id)){
        let embed = new MessageEmbed()
            .setTitle("Profile")
            .setColor("#00ff00")
            .addField("Pierre", db.get(`${message.guild.id}-${message.author.id}`, "stone"), true)
            .addField("Fer", db.get(`${message.guild.id}-${message.author.id}`, "iron"), true)
        message.channel.send(embed)
    } else {
        db.ensure(`${message.guild.id}-${message.author.id}`, {
            user: message.author.id,
            guild: message.guild.id,
            stone: 0,
            iron: 0
          });

        let embed = new MessageEmbed()
            .setTitle("Profile")
            .setColor("#00ff00")
            .addField("Pierre", db.get(`${message.guild.id}-${message.author.id}`, "stone"), true)
            .addField("Fer", db.get(`${message.guild.id}-${message.author.id}`, "iron"), true)
        message.channel.send(embed)
    }
}