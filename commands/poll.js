const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Make a poll')
          .addStringOption((o) => 
          o.setRequired(true)
          .setName('question')
          .setDescription(`Ask a question!`)),
    async execute(interaction) {
        let string = interaction.options.getString('question')
            string = string.toLowerCase()
            const newString = string.split('')
            newString[0] = newString[0].toLocaleUpperCase()
            string = newString.join('')

            const pollname = interaction.options.getString('question')
        const exampleEmbed = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle(`${pollname}`)
        .setDescription('') 
        const message = await interaction.reply({ embeds: [exampleEmbed], fetchReply: true });
		message.react('👍');
        message.react('👎');
    }
};