require("dotenv-flow").config();

const client = require("./lib/client");
const mail = require("./lib/mail");

client.login(process.env.TOKEN);
mail.start();
