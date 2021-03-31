const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Connected to Discord! Logged in as ${client.user.tag}`);

  client.user
    .setActivity("v" + require("../package.json").version)
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(err => console.error("Error setting bot activity", err));
});

client.on("disconnect", () => {
  console.log("Disconnect from Discord");
});

client.on("reconnecting", () => {
  console.log("Reconnecting to Discord");
});

client.on("error", err => {
  console.error("Encountered an error with Discord: ", err);
});

module.exports = client;
