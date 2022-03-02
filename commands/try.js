const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('try')
		.setDescription('Try out pronouns!')

        .addStringOption((o) => 
          o.setRequired(true)
          .setName('name')
          .setDescription('Name youd like to try'))

          .addStringOption((o) => 
             o.setRequired(true)
             .setName('object')
             .setDescription('e.g. "they"'))

             .addStringOption((o) => 
                o.setRequired(true)
                .setName('subject')
                .setDescription('e.g. "them"'))

                .addStringOption((o) => 
                  o.setRequired(true)
                  .setName('possessivedeterminer')
                  .setDescription('e.g. "their"'))
                  .addStringOption((o) => 
                     o.setRequired(true)
                     .setName('possessivepronoun')
                     .setDescription('e.g. "theirs"'))
                     .addStringOption((o) => 
                        o.setRequired(true)
                        .setName('reflexive')
                        .setDescription('e.g. "themself"')),
    async execute(interaction, client) {
           await interaction.reply({ embeds:[
              new MessageEmbed()
              .setDescription(`**Trying Pronouns** has moved to Pronoun Bot! Invite Pronoun Bot now for all your pronoun needs **[here](https://top.gg/bot/917522366710550648)**!`)
           ]})
            }
            
	};