const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user.')
		.addUserOption(option => option.setRequired(true).setName('user').setDescription('Member youd like to kick')),
	async execute(interaction, client) {

		if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({content:"You can't use this command.",  ephemereal: false })

		const target = interaction.guild.members.cache.get(interaction.options.getUser('user').id) || await interaction.guild.members.fetch(interaction.options.getUser('user').id);

		if (!target) return interaction.reply('Target not found')

		if (!target.kickable) return interaction.reply('Cannot kick this user')
		
		const user = interaction.options.getUser('user');
		interaction.guild.members.kick(user);
		await interaction.reply(`Kicked ${user}`);
    },
};