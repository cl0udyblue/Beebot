const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js')
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('lesbian')
		.setDescription('Apply a lesbian flag ring to a user\'s avatar')

		.addUserOption((o) => 
		o.setRequired(false)
		.setName('user')
		.setDescription('User ID or mention')),
	async execute(interaction, client) {
		
		let user = interaction.options.getUser ('user') || interaction.user

		let av = `https://some-random-api.ml/canvas/lesbian?avatar=${user.avatarURL({ size: 4096, dynamic: true,format: 'png' })}`    

		const res = await request(av) //basically the image url
	
	if (res.statusCode !== 200) { //check if it isnt 200 OK
			console.log(JSON.parse(res.body)) //console.log the error
			await interaction.reply(`\n\nError: ${(JSON.parse(res.body)).error}`) //send error message
			return
		}
		let attachment = new MessageAttachment(res.body, `${interaction.user.username}-pride.png`) //make attachment using the buffer
		await interaction.reply({ files: [attachment]}); //send attachment
	},
};
