const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { request } = require('undici')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info on a user')

        .addUserOption((o) => 
          o.setRequired(true)
          .setName('user')
          .setDescription('User ID or mention')),

    async execute(interaction, client) {

    let member = interaction.options.getMember('user')
    let user = interaction.options.getUser('user')

    //TIMESTAMPS


    let stamp = Math.floor(user.createdTimestamp / 1000)
    stamp = `<t:${stamp}:R>`;
    let stamp2 = Math.floor(user.createdTimestamp / 1000)
    stamp2 = `<t:${stamp2}>`;



    //BADGES


    const flagEmojis = {
        'HOUSE_BALANCE': '<:BadgeBalance:938876196593225779>',
        'HOUSE_BRAVERY': '<:BadgeBravery:938875675916525598>',
        'HOUSE_BRILLIANCE': '<:BadgeBrilliance:938876118969253939>',
        'EARLY_SUPPORTER': '<:EarlySupporter:939222381753425931>',
        'DISCORD_CERTIFIED_MODERATOR': '<:CertMod:939222423239290912>'
      }




    //PRONOUNS


    const pronounMap = {                
        unspecified: 'Unspecified, has not signed up for pronoundb.',
        hh: 'he/him',
        hi: 'he/it',
        hs: 'he/she',
        ht: 'he/they',
        ih: 'it/him',
        ii: 'it/its',
        is: 'it/she',
        it: 'it/they',
        shh: 'she/he',
        sh: 'she/her',
        si: 'she/it',
        st: 'she/they',
        th: 'they/he',
        ti: 'they/it',
        ts: 'they/she',
        tt: 'they/them',
        any: 'Any pronouns',
        other: 'Other pronouns',
        ask: 'Ask me my pronouns',
        avoid: 'Avoid pronouns, use my name',
    }

    const pronounsData = await request(
        `https://pronoundb.org/api/v1/lookup?platform=discord&id=${user.id}`
    )
    const pronouns = await pronounsData.body.json()





// MEMBER SECTION

    
    if (member) {
        
        let joinstamp = Math.floor(member.joinedTimestamp / 1000)
        joinstamp = `<t:${joinstamp}:R>`

           let perms = member.permissions.toArray()
          
        let roles = []
        member.roles.cache.forEach(i => roles.push(`<@&${i.id}>`))
        if(member.permissions.has(`ADMINISTRATOR`)){
            await interaction.reply({
                 embeds:[new MessageEmbed()
                //.setColor(`RANDOM`)
                .setTitle(`Info on ${user.tag}.`)
                .setThumbnail(`${user.displayAvatarURL({ size: 4096, dynamic: true, format: 'png' })}`)
                .setDescription(`**Mention**: <@${user.id}>
                **User ID**: \`${member.id}\`
                **Pronouns**: ${pronounMap[pronouns.pronouns]}
                **Badges**: ${user.flags.toArray().map(f => flagEmojis[f])}
                **Date created**: ${stamp2}
                **Date joined**: ${joinstamp}

                **Roles**:
                ${roles.join(" ")}

                **Permissions**:
                \`ADMINISTRATOR\`
                `)] })}

        else if(!member.permissions.has('ADMINISTRATOR')) {
            await interaction.reply({
                embeds:[new MessageEmbed()
                    //.setColor(`RANDOM`)
                    .setTitle(`Info on ${user.tag}.`)
                    .setThumbnail(`${user.displayAvatarURL({ size: 4096, dynamic: true, format: 'png' })}`)
                    .setDescription(`**Mention**: <@${user.id}>
                    **User ID**: \`${member.id}\`
                    **Pronouns**: ${pronounMap[pronouns.pronouns]}
                    **Date created**: ${stamp2}
                    **Date joined**: ${joinstamp}
    
                    **Roles**:
                    ${roles.join(" ")}
    
                    **Permissions**:
                    \`${perms.join("`, `")}\`
                    `)] })
        }
    }
    
    else {
        await interaction.reply({
            embeds:[new MessageEmbed()
                //.setColor(`RANDOM`)
                .setTitle(`Info on ${user.tag}.`)
                .setThumbnail(`${user.displayAvatarURL({ size: 4096, dynamic: true, format: 'png' })}`)
                .setDescription(`**Mention**: <@${user.id}>
                **User ID**: \`${user.id}\`
                **Pronouns**: ${pronounMap[pronouns.pronouns]}
                **Date created**: ${stamp2}

                `)] })
   }
  }
};