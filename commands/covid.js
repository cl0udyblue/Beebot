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
    async execute (interaction, client) {
        // If you already have "args" handled in your interactionCreate event, ignore this part.
        const args = [];
        interaction.options.data.map(x => args.push(x.value));
        // ------------------------------------------------------

        interaction.deferReply();
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

        interaction.editReply({
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
    }
}