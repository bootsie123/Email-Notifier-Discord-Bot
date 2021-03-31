require("dotenv-flow").config();

const MailListener = require("mail-listener4");
const Discord = require("discord.js");

const client = new Discord.Client();
const mailListener = new MailListener({
  username: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  },
  searchFilter: ["UNSEEN"],
  markSeen: true,
  mailbox: "INBOX",
  attachments: false
});

client.on("ready", () => {
  console.log(`Client ready! Logged in as ${client.user.tag}`);
});

client.on("error", err => {
  console.error("Encountered an error with Discord: ", err);
});

mailListener.on("server:connected", () => {
  console.log("Connected to IMAP!");
});

mailListener.on("mail", (mail, seqno, attributes) => {
  if (mail.headers.from.includes(process.env.WHITELIST) && mail.to.length > process.env.THRESHOLD) {
    client.guilds.cache.each(guild => {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor(7506394)
        .setTitle("New Email!")
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

      guild.roles
        .fetch()
        .then(roles => {
          const roleId = roles.cache.find(role => role.name === process.env.MENTION_ROLE);

          guild.systemChannel.send(roleId, embed);
        })
        .catch(err => {
          console.error("Error fetching roles: ", err);

          guild.systemChannel.send(embed);
        });
    });
  }
});

mailListener.on("error", err => {
  console.error("Encountered an error with IMAP: ", err);
});

mailListener.on("server:disconnected", () => {
  console.warn("IMAP disconnect. Retrying...");

  mailListener.start();
});

client.login(process.env.TOKEN);
mailListener.start();
