const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Connected to Discord! Logged in as ${client.user.tag}`);
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
