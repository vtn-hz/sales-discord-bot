const { Client } = require('discord.js');
const { token  } = require('./config.json');

console.log(token);
const client = new Client({ intents: [] });
client.login(token);

