const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
	name: 'skin',
	description: 'Show a Minecraft player\'s skin',
	execute(message, args) {
		if (args.length === 0) {
			return message.channel.send('Please provide a player name');
		}

		const playerName = args[0];

		fetch(`https://api.mineskin.org/generate/user/${playerName}`)
			.then(res => res.json())
			.then(skinData => {
				if (skinData.error) {
					return message.channel.send(`Could not find skin for player "${playerName}"`);
				}

				const skinUrl = skinData.data.url;
				message.channel.send({
					files: [skinUrl]
				});
			})
			.catch(error => {
				console.error(error);
				message.channel.send('There was an error getting the skin data');
			});
	},
};
