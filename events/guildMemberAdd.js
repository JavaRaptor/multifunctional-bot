const Discord = require("discord.js")
const fs = require("fs")

module.exports = async (client, member) => {
    const jsonData = JSON.parse(fs.readFileSync("./json/blacklist.json", 'utf8'));
    if (jsonData[member.id] && jsonData[member.id].status !== undefined) {
        const status = jsonData[member.id].status;
        console.log(`Le status de l'ID ${targetId} est : ${status ? 'true' : 'false'}`);
        if(status == true) {
            member.ban({reasony: "Blacklist Logger"})
        }
    }
}