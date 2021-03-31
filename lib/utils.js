const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  log: mail => {
    if (!process.env.LOGS) return;

    if (fs.existsSync("mail_log.json")) {
      fs.readFile("mail_log.json", (err, data) => {
        if (err) return console.error("Error reading to mail log", err);

        const json = JSON.parse(data);

        if (json.length >= process.env.LOG_MAX) json.slice(1);

        json.push(mail);

        fs.writeFile("mail_log.json", JSON.stringify(json), err => {
          if (err) return console.log("Error writting to mail log", err);

          console.log(`Logged - ${mail.subject}`);
        });
      });
    } else {
      fs.writeFile("mail_log.json", JSON.stringify([mail]), err => {
        if (err) return console.log("Error writting to mail log", err);

        console.log(`Logged - ${mail.subject}`);
      });
    }
  },
  buildEmbed: mail => {
    const embed = new Discord.MessageEmbed()
      .setColor(7506394)
      .setTitle(mail.inReplyTo ? "New Reply!" : "New Email!")
      .setDescription("A new email has been sent out. A few details about the email can be seen below")
      .addField("Subject", mail.subject, true)
      .setFooter("Recieved")
      .setTimestamp();

    const words = mail.text.split(" ").length;
    const label = words > 1 ? " words" : " word";

    embed.addField("Length", words + label, true);

    if (mail.attachments) {
      embed.addField("Attachments", mail.attachments.length, true);
    }

    embed.addField("Email Preview (500 words)", mail.text.substring(0, 500) + "...");

    return embed;
  }
};
