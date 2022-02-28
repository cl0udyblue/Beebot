const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js')
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Generate a random dog photo!'),
	async execute(interaction, client) {
		
		const dogData = await request(`https://some-random-api.ml/animal/dog`)
		const dog = await dogData.body.json()
		await interaction.reply({ embeds: [
			new MessageEmbed()
			.setImage(dog.image)
			.setColor(`#36393f`)
		]});
	},
};
