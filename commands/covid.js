const covid = require('covid19-api');
const Discord = require('discord.js')
const jaro = require('jaro-winkler');
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    // slash cmd builder format
    data: new SlashCommandBuilder()
        .setName('covid')
        .setDescription('TW, death counts: Get COVID-19 Statistics')
        .addStringOption(option =>
            option.setName('country')
                .setDescription('The country you want to search')
                .setRequired(false)
        ),
    // Depends on what handler you use.
    async execute(interaction, client) {
        try {// If you already have "args" handled in your interactionCreate event, ignore this part.
            const args = [];
            interaction.options.data.map(x => args.push(x.value));
            // ------------------------------------------------------

            // This little bit with the confirm button was written by Skye. https://github.com/Lisenaaaa
            // And improved on by Cloud. https://www.youtube.com/watch?v=iik25wqIuFo
            await interaction.reply({
                content: "Hey! This command contains information that you may find disturbing (including ||death||, ||major illness||, and ||America||.). Are you sure you want to continue?\nYou have 60 seconds to press one of the two buttons.",
                components: [
                    {
                        type: 'ACTION_ROW',
                        components: [
                            { type: 'BUTTON', style: 'SUCCESS', label: 'Yes', customId: 'covidYes' },
                            { type: 'BUTTON', style: 'DANGER', label: 'No', customId: 'covidNo' },
                        ],
                    },
                ],
                ephemeral: true
            })

            const confirmButton = await awaitButton(interaction.user.id, interaction.channel)

            if (!confirmButton) {
                return await interaction.editReply({ content: "The 60 seconds has expired, I won't display the embed.", components: [] })
            }

            await confirmButton.deferUpdate()

            if (confirmButton.customId === 'covidNo') {
                return await interaction.editReply({ content: "Okay, I won't display the embed.", components: [] })
            }
            // end of what Skye wrote

            let res;
            let country;
            let covidImg = 'https://media.discordapp.net/attachments/239446877953720321/691020838379716698/unknown.png'

            res = await covid.getReports(); // Fetching the Data
            res = res[0][0];

            if (!args.length || ['world', 'global', 'earth'].includes(args[0].toLowerCase())) country = 'World';
            else {
                let search = [];
                res.table[0].forEach(v => {
                    search.push({ country: v.Country, match: jaro(v.Country, args[0], { caseSensitive: false }) });
                });
                search.sort((a, b) => {
                    if (a.match < b.match) return 1;
                    else if (a.match > b.match) return -1;
                    else return 0;
                });
                country = search[0].country || 'World';
            }

            let data = res.table[0].find(v => v.Country == country);

            // await interaction.deleteReply()
            await interaction.followUp({
                ephemeral: true,
                components: [],
                embeds: [
                    new Discord.MessageEmbed()
                        .setAuthor({ name: 'COVID-19 Statistics', iconURL: covidImg })
                        // .setAuthor('COVID-19 Statistics', covidImg) //deprecated
                        .setTitle(data.Country)
                        .setThumbnail(res.flag ?? covidImg)
                        .setColor('RED')
                        .addFields(
                            { name: 'Total Cases', value: data.TotalCases || 'No Data', inline: true },
                            { name: 'Total Deaths', value: data.TotalDeaths || 'No Data', inline: true },
                            { name: 'Total Recoveries', value: data.TotalRecovered || 'No Data', inline: true },
                            { name: 'Active Cases', value: data.ActiveCases || 'No Data', inline: true },
                            { name: 'Mild Condition', value: (+(data.ActiveCases || 0).replaceAll(',', '') - +(data.Serious_Critical || 0).replaceAll(',', '')).toLocaleString(), inline: true },
                            { name: 'Critical Condition', value: data.Serious_Critical || 'No Data', inline: true },
                            { name: 'Cases Today', value: data.NewCases || 'No Data', inline: true },
                            { name: 'Deaths Today', value: data.NewDeaths || 'No Data', inline: true },
                            { name: 'Recoveries Today', value: data.NewRecovered || 'No Data', inline: true },
                            { name: 'Closed Cases', value: (+(data.TotalCases || 0).replaceAll(',', '') - +(data.ActiveCases || 0).replaceAll(',', '')).toLocaleString(), inline: true },
                        )
                        .setTimestamp()
                ]
            })
        } catch (err) {
            if (err.message === "Collector received no interactions before ending with reason: time") {
                return await interaction.editReply({ content: "The 60 seconds has expired, so I won't show you information about COVID.", components: [] })
            }
        }
    }
}

// This was made by Skye. https://github.com/Lisenaaaa
async function awaitButton(user, channel) {
    return await channel.awaitMessageComponent({ componentType: 'BUTTON', filter: (b) => b.user.id === user, time: 60000 })
}