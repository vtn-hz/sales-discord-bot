const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sold')
		.setDescription('React to mentioned message.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        console.log (interaction)
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};
