const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Add a role to a user!')

        .addUserOption((o) => 
          o.setRequired(true)
          .setName('member')
          .setDescription('Member you\'d like to add the role to'))

          .addRoleOption((o) => 
             o.setRequired(true)
             .setName('role')
             .setDescription('Role to add the user')),
                        
          async execute (interaction) {
            if(!interaction.guild.me.permissions.has(['MANAGE_MEMBERS', 'MANAGE_ROLES'])) return await interaction.reply({ content:(`I don't have the \`MANAGE_MEMBERS\` and \`MANAGE_ROLES\` permissions!`), ephemeral: true });

            if (!interaction.member.permissions.has('MANAGE_ROLES', 'MANAGE_MEMBERS')) return await interaction.reply({content:"You can't use this command. If you believe this is in error, contact the moderators of your guild. If the issue persists, join the support server: https://support.froggie.cc",  ephemeral: true})

            const member = interaction.options.getMember('member')
            const role = interaction.options.getRole('role')
            try{
            member.roles.add(role)
            await interaction.reply({content:`Added the role ${role} to ${member}`, ephemeral: true})
        } catch(err){
        await interaction.reply({content:`This member already has the role ${role}`, ephemeral: true})
        console.log(err)
        }
    }
};