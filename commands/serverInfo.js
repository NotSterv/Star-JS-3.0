const Discord = require('discord.js');

module.exports = {
	name: 'serverinfo',
	description: 'Show information about the current server',
	execute(message, args) {
		const server = message.guild;
		if (!server) return message.channel.send("This command can only be used in a server.");
		const embed = new Discord.EmbedBuilder()
			.setTitle(server.name)
			.setThumbnail(server.iconURL())
			.addFields(
				{ name: 'Server ID', value: server.id, inline: true },
				{ name: 'Owner', value: server.owner.user.tag, inline: true },
				{ name: 'Region', value: server.region, inline: true },
				{ name: 'Members', value: server.memberCount, inline: true },
				{ name: 'Roles', value: server.roles.cache.size, inline: true },
				{ name: 'Channels', value: server.channels.cache.size, inline: true },
			)
			.setFooter(`Created on ${server.createdAt.toDateString()}`);
		message.channel.send(embed);
	},
};
