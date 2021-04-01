const MailListener = require("mail-listener4");

const client = require("./client");
const utils = require("./utils");

const mailListener = new MailListener({
  username: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  },
  searchFilter: ["ALL"],
  markSeen: false,
  mailbox: "INBOX",
  attachments: false
});

mailListener.on("mail", (mail, seqno, attributes) => {
  console.log(`Email received - ${mail.subject}`);

  utils.log(mail);

  if (
    mail.headers.from.includes(process.env.WHITELIST) &&
    (mail.to.length > process.env.THRESHOLD || mail.cc.length > process.env.THRESHOLD)
  ) {
    console.log(`Notified - ${mail.subject}`);

    const embed = utils.buildEmbed(mail);

    client.guilds.cache.each(guild => {
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

mailListener.on("server:connected", () => {
  console.log("Connected to IMAP!");
});

mailListener.on("error", err => {
  console.error("Encountered an error with IMAP: ", err);
});

mailListener.on("server:disconnected", () => {
  console.warn("IMAP disconnect. Retrying...");

  mailListener.start();
});

module.exports = mailListener;
