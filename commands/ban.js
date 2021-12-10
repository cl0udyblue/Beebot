const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user.')
		.addUserOption(option => option.setRequired(true).setName('user').setDescription('Member youd like to ban')),
	async execute(interaction) {
		const target = interaction.guild.members.cache.get(interaction.options.getUser('user').id) || await interaction.guild.members.fetch(interaction.options.getUser('user').id);

		if (!target) return interaction.reply('Target not found')

		if (!target.bannable) return interaction.reply('Cannot ban this user')
		
		const user = interaction.options.getUser('user');
		interaction.guild.members.ban(user);
		await interaction.reply(`Banned ${user}`);
    },
};