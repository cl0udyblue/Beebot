const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js')
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('redpanda')
		.setDescription('Generate a random red panda photo!'),
	async execute(interaction, client) {
		
		const rpData = await request(`https://some-random-api.ml/animal/red_panda`)
		const rp = await rpData.body.json()
		await interaction.reply({ embeds: [
			new MessageEmbed()
			.setImage(rp.image)
			.setColor(`#36393f`)
		]});
	},
};
