const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.config = require('./config.json')
client.commands = new Collection();
client.database = require('./database/sequelize').guilds
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	function presence() {
        let status = ['froggie.cc - /help', 'Fuck Putin', 'Trans rights']
        let rstatus = Math.floor(Math.random() * status.length);
        client.user.setPresence({
			activities:
			[{
				name: `${status[rstatus]}`,
				type: `PLAYING`
			}],
            status: "online",
        });
    }
	await require('./database/sequelize').connect()
    console.log(`${client.user.tag} is ready to serve!`);
    setInterval(presence, 100000)
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);