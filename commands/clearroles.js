const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearroles')
		.setDescription('Clear all of a member\'s roles')

        .addUserOption((o) => 
          o.setRequired(true)
          .setName('member')
          .setDescription('Member you\'d like to clear the roles of')),
                        
          async execute (interaction) {
            if(!interaction.guild.me.permissions.has(['MANAGE_MEMBERS', 'MANAGE_ROLES'])) return await interaction.reply({ content:(`I don't have the \`MANAGE_MEMBERS\` and \`MANAGE_ROLES\` permissions!`), allowedMentions: { repliedUser: false } });

            if (!interaction.member.permissions.has('MANAGE_ROLES', 'MANAGE_MEMBERS')) return await interaction.reply({content:"You can't use this command. If you believe this is in error, contact the moderators of your guild. If the issue persists, join the support server: https://support.froggie.cc",  allowedMentions: { repliedUser: false }})

            const member = interaction.options.getMember('member')
            try{
            // Remove all the roles from a member
            member.roles.set([])
            await interaction.reply({content: `Cleared ${member}'s roles!`, ephemeral: true})
        } catch(err){
        await interaction.reply({content:`An error occured:
        \`\`\`json
        ${err}
        \`\`\`
        Please join the support server to get help with this error! (https://support.froggie.cc)`, ephemeral: true})
        console.log(err)
        }
    }
};