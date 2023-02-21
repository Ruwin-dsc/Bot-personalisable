const { MessageEmbed } = require("discord.js")
const moment = require('moment');
const { utc } = require('moment');
const os = require('os')
const ms = require('ms')
const Discord = require('discord.js')

const fs = require("fs");


module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    const filterLevels = {
      DISABLED: 'Off',
      MEMBERS_WITHOUT_ROLES: 'No Role',
      ALL_MEMBERS: 'Everyone'
  };

  const verificationLevels = {
      NONE: 'None',
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: '(╯°□°）╯︵ ┻━┻',
      VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
  };

  const regions = {
      brazil: 'Brazil',
      europe: 'Europe',
      hongkong: 'Hong Kong',
      india: 'India',
      japan: 'Japan',
      russia: 'Russia',
      singapore: 'Singapore',
      southafrica: 'South Africa',
      sydeny: 'Sydeny',
      'us-central': 'US Central',
      'us-east': 'US East',
      'us-west': 'US West',
      'us-south': 'US South'
  };

  const flags = {
      DISCORD_EMPLOYEE: 'Discord Employee',
      DISCORD_PARTNER: 'Discord Partner',
      BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
      BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
      HYPESQUAD_EVENTS: 'HypeSquad Events',
      HOUSE_BRAVERY: 'House of Bravery',
      HOUSE_BRILLIANCE: 'House of Brilliance',
      HOUSE_BALANCE: 'House of Balance',
      EARLY_SUPPORTER: 'Early Supporter',
      TEAM_USER: 'Team User',
      SYSTEM: 'System',
      VERIFIED_BOT: 'Verified Bot',
      VERIFIED_DEVELOPER: 'Verified Bot Developer'
  };
  const rolesGuild = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
  const membersGuild = message.guild.members.cache;
  const channelsGuild = message.guild.channels.cache;
  const emojisGuild = message.guild.emojis.cache;
  const argument = args[0];

  let online = message.guild.members.cache.filter(member => member.user.presence.status !== 'online');
  let offline = message.guild.members.cache.filter(member => member.user.presence.status !== 'offline');
  let idle = message.guild.members.cache.filter(member => member.user.presence.status !== 'idle');
  let dnd = message.guild.members.cache.filter(member => member.user.presence.status !== 'dnd');



  const embed = new Discord.MessageEmbed()
  .setColor(db.color)
  .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic: true}))
  .setTitle(`<a:680696347577286656:891778449507766282> Information du serveur ${message.guild.name}`)
  .setThumbnail(message.guild.iconURL({ dynamic: true }))
  .addFields(
      {
          name: "Créateur <a:867324413267542026:892078131765190686>",
          value: `<@${message.guild.ownerID}>`,
          inline: true
      },
      {
          name: "Région 🗺️",
          value: message.guild.region.toUpperCase(),
          inline: true
      },
      {
          name: `Vérifié <:8759326243743580261:897868973251653632> `,
          value: message.guild.verified ? 'Le serveur est vérifié' : `Le serveur n’est pas vérifié`,
          inline: true
      },
  )

  .addField('Presence', [
    `<:IconStatusOnline:897531985579372574> ${online.size}`,
    `<:IconStatusIdle:897532002960543824> ${idle.size}`,
    `<:IconStatusDND:897532022938021930> ${dnd.size}`,
    `<:IconStatusOffline:897532045801177158> ${offline.size}`,
    `\u200b`
    ], true)
    .addField('Stats',[
    ` <:6055blurpleinvite:898080548382212146> **Membres** ${message.guild.memberCount}`,
    `<:5864blurplesearch:898080548256354314>  **Humains** ${membersGuild.filter(member => !member.user.bot).size}`,
    `<:769926156098076702:891458085573505114> **Bots** ${membersGuild.filter(member => member.user.bot).size}`,
    `\u200b`
    ], true)
    .addField('Serveur',[
        `<:5702blurpletextchannel:898080548138930206>  **Salons Textuels** ${channelsGuild.filter(channel => channel.type === 'text').size}`,
        `<:3527blurplevoicechannel:898080547891453973> **Salons Vocaux** ${channelsGuild.filter(channel => channel.type === 'voice').size}`,
        `<:875932385764581386:897868973104857099>**Roles**  ${rolesGuild.length}`, 
        `<:1658partnerwaitapproval:897532305864814602> **Emojis** ${emojisGuild.size}`,
        `\u200b`
    ], true )
    .addFields(
        {
            name: "<a:Boost:845281742809858048> **Boosts**",
            value: `${message.guild.premiumSubscriptionCount || '0'}`,
            inline: true
        },
        {
            name: "<:BoostTrophe:849456291901866004> **Niveau de boost**",
            value: `${message.guild.premiumTier ? `Niveau ${message.guild.premiumTier}` : 'Aucun'}`,
            inline: true
        },
        {
            name: "🕧 **Date de création**",
            value: `${message.guild.createdAt.toLocaleDateString("fr-eu")}`,
            inline: true
        },
    )
  .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
  .setTimestamp()
message.channel.send(embed)
}
module.exports.help = {
    name: "serverinfo",
  };
