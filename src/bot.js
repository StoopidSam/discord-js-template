const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const config = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`I have logged in as ${client.user.tag}`);
    client.user.setActivity(config.status.content, { type: config.status.type });
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.channel.send(':warning: There was an error executing your command! :warning:').catch(() => { return });
    }
});

client.login(config.token);