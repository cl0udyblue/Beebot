const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js')
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('catfact')
		.setDescription('Generate a random cat fact!'),
	async execute(interaction, client) {
		
		const catData = await request(`https://some-random-api.ml/animal/cat`)
		const cat = await catData.body.json()
		await interaction.reply({ content: `${cat.fact}`});
	},
};
