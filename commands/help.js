module.exports = {
	name: 'help',
	description: 'Show a list of available commands',
	execute(message, args) {
		const commands = Array.from(message.client.commands.values());
		const commandList = commands.map(command => `${command.name}: ${command.description}`).join('\n');

		message.channel.send(`Here are the available commands:\n${commandList}`, { code: 'asciidoc' });
	},
};
