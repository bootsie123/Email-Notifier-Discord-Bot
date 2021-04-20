# Email Notifier Discord Bot

[![](https://opengraph.githubassets.com/358c7e5c6794985a2eb22081197492f0245be78df6fbfea731d7876181956630/bootsie123/Email-Notifier-Discord-Bot?width=400&height=200)](https://github.com/bootsie123/Email-Notifier-Discord-Bot)

A simple Discord bot that notifies you when you receive an email. 

By default, the bot will @everyone in the system messages channel, however, you can optionally mention any role of your choice. The primary use case is for clubs that frequently send emails and also have their own Discord server. This way, members can be notified and reminded to check their emails.

## Installation

Clone the repository using [git](https://git-scm.com/) and then use [npm](https://www.npmjs.com/) to install the node modules.

```bash
# Clone the repository
git clone https://github.com/bootsie123/Email-Notifier-Discord-Bot.git

# Enter the directory
cd Email-Notifier-Discord-Bot

# Install the dependencies
npm install
```

## Configuration

To setup the bot, rename the `.env.example` file to `.env` and either set the following values in the file or set the corresponding environment variables.

**NOTE:** You must enable IMAP for your email address. Your provider should give you the necessary details

| Name         | Type    | Example             | Description                                                                                                            |
| ------------ | ------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| TOKEN        | String  | XXYYZZ.XYZ.XXYZ     | The token of the Discord bot (can be seen in the Discord Developer Portal under your application)                      |
| WHITELIST    | String  | example@example.com | The email address used to look for incoming notifications                                                              |
| THRESHOLD    | Integer | 5                   | The minimum number of emails on the `to` or `cc` section of the email needed for a notification to be sent             |
| MENTION_ROLE | String  | Email Notifications | The name of the Discord role to mention for notifications. Defaults to `@everyone`                                     |
| LOGS         | Boolean | true                | Whether a logs file `mail_log.json` should be generated (shows information about incoming emails). Defaults to `false` |
| LOG_MAX      | Integer | 25                  | The maximum number of emails to keep in the log file. Defaults to `25`                                                 |
| EMAIL_USER   | String  | test@example.com    | The IMAP username of your email account                                                                                |
| EMAIL_PASS   | String  | password            | The IMAP password of your email account                                                                                |
| EMAIL_HOST   | String  | imap.example.com    | The IMAP host for your email provider                                                                                  |
| EMAIL_PORT   | Integer | 993                 | The port your email provider uses for IMAP                                                                             |

## Usage

To start the bot simply run:

```bash
npm start
```

or during development you can start [nodemon](https://nodemon.io/) using:

```bash
npm run dev
```

For best results use [PM2](https://pm2.keymetrics.io/) to manage the node app. A quick start guide to set that up can be found [here](https://pm2.keymetrics.io/docs/usage/quick-start/)

## Contributing

Pull requests are welcome. Any changes are appreciated!

## License

[ISC](https://choosealicense.com/licenses/isc/)
