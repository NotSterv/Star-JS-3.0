const { stripIndent } = require('common-tags');
const { MessageEmbed, Client, CommandInteraction, Guild } = require('discord.js');

module.exports = {
	name: 'serverinfo',
	description: 'Displays information about the server',
	async execute(message, guild) {
	
	const server = guild
	const User = server.members.cache.filter(member => !member.user.bot).size;
    const Bots = server.members.cache.filter(member => member.user.bot).size;
    const Text = server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size;
    const Voice = server.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
    const Category = server.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').size;
    const Stage = server.channels.cache.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size;
    const Channel = Text + Voice + Category + Stage
    const Emoji = server.emojis.cache.size;
    const Roles = server.roles.cache.size;

    let embed = new MessageEmbed()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setColor(guild.me.displayHexColor)
      .setDescription(stripIndent`
      **Name** : ${guild.name}
      **Server ID** : ${guild.id}
      **Owner** : ${await guild.fetchOwner().then(m => m.user.tag)}
      **Total Members** : ${guild.memberCount} [${User} Users | ${Bots} Bots]
      **Total Emojis** : ${Emoji}
      **Total Roles** : ${Roles}
      **Total Channels** : ${Channel} [${Text} Text | ${Voice} Voice | ${Category} Category | ${Stage} Stage]
      **Server Creation Date** : <t:${time}>
      `)
      .setThumbnail(guild.iconURL())

   message.channel.send(embed)
  }
}