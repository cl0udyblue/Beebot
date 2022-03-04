const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('perms')
		.setDescription('See the required perms for the bot!'),
	async execute(interaction, client) {
		await interaction.reply({ content:`**Froggie needs the following permissions in order to function properly:**
        - \`CREATE_INSTANT_INVITE\`
        - \`KICK_MEMBERS\`
        - \`BAN_MEMBERS\`
        - \`MANAGE_CHANNELS\`
        - \`MANAGE_GUILD\`
        - \`ADD_REACTIONS\`
        - \`VIEW_AUDIT_LOG\`
        - \`VIEW_CHANNEL\`
        - \`SEND_MESSAGES\`
        - \`MANAGE_MESSAGES\`
        - \`EMBED_LINKS\`
        - \`ATTACH_FILES\`
        - \`READ_MESSAGE_HISTORY\`
        - \`USE_EXTERNAL_EMOJIS\`
        - \`CONNECT\`
        - \`SPEAK\`
        - \`MUTE_MEMBERS\`
        - \`MOVE_MEMBERS\`
        - \`CHANGE_NICKNAME\`
        - \`MANAGE_NICKNAMES\`
        - \`MANAGE_ROLES\`
        - \`MANAGE_WEBHOOKS\`
        - \`MANAGE_EMOJIS_AND_STICKERS\`
        - \`USE_APPLICATION_COMMANDS\`
        - \`MANAGE_EVENTS\`
        - \`MANAGE_THREADS\`
        - \`START_EMBEDDED_ACTIVITIES\`
        - \`MODERATE_MEMBERS\`
To quickly give Froggie permissions, kick the bot and re-add it with this link: <https://invite.froggie.cc>
Froggie also needs it's role at the top of the list, either at the very top or below the administrator role. This is so that Froggie can moderate members.
        ` })
	},
};
