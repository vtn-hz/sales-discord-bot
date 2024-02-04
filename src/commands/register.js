const fs    = require('node:fs');
const path  = require('node:path');

const { token, clientId, guildId  } = require('../etc/config.json');
const { Collection, REST, Routes  } = require('discord.js');

const rest = new REST().setToken(token);


module.exports = { 
    register (client) {
        const apiCommands = [];
        client.commands = new Collection();

        const foldersPath = path.join(__dirname, this.commandsPath);
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    apiCommands.push(command.data.toJSON());
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }

        notifyApi(apiCommands);
    }, 
    commandsPath: '/util'
}

async function notifyApi (commands){
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}
