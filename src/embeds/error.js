const Discord = require('discord.js');
const config = require('../config.json');

const exampleError = new Discord.MessageEmbed()
    .setColor(config.colours.red)
    .setTitle('Oh dear...')
    .setDescription('This is an example error. Customize it to your needs.');

module.exports = { exampleError };