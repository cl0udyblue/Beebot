const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Fetch a user\s avatar')

        .addUserOption((o) => 
          o.setRequired(false)
          .setName('user')
          .setDescription('User ID or mention of the person whose avatar you want to fetch')),

    async execute(interaction, client) {
      let user = interaction.options.getUser ('user') || interaction.user
      const embed = new MessageEmbed()
      .setTitle(`${user.tag}'s avatar:`)
      .setColor('RANDOM')
//        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setTimestamp()
        .addFields([
        { name: 'PNG', value: `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: 'png' })})`, inline: true },
        { name: 'JPG', value: `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: 'jpg' })})`, inline: true },
        { name: 'WEBP', value: `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: 'webp' })})`, inline: true }
      ])
      await interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
   
   }        
};