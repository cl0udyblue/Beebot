const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the bot\'s ping!'),
	async execute(interaction, client) {
		await interaction.reply({ content:'Pinging...' })
   		await interaction.editReply({ content:`My ping is ${client.ws.ping} ms!`, fetchReply: true })
	},
};
