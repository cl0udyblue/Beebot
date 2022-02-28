const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js')
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('panda')
		.setDescription('Generate a random panda photo!'),
	async execute(interaction, client) {
		
		const panData = await request(`https://some-random-api.ml/animal/panda`)
		const panda = await panData.body.json()
		await interaction.reply({ embeds: [
			new MessageEmbed()
			.setImage(panda.image)
			.setColor(`#36393f`)
		]});
	},
};
