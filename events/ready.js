module.exports = async (client) => {
  console.log(`${client.user.username} Log activate`);
  client.user.setActivity(`${client.guilds.cache.size} Servers`);
  client.user.setStatus("idle");
};
