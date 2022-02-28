const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js')
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('koala')
		.setDescription('Generate a random koala photo!'),
	async execute(interaction, client) {
		
		const kData = await request(`https://some-random-api.ml/animal/koala`)
		const koala = await kData.body.json()
		await interaction.reply({ embeds: [
			new MessageEmbed()
			.setImage(koala.image)
			.setColor(`#36393f`)
		]});
	},
};
