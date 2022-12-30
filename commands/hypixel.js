const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
	name: 'hypixel',
	description: 'Show Hypixel stats for a player',
	execute(message, args) {
		if (args.length === 0) {
			return message.channel.send('Please provide a player name');
		}

		const playerName = args[0];

		fetch(`https://api.hypixel.net/player?key=1ac603f8-88a9-436e-affc-e439f93c6f59&name=${playerName}`)
			.then(res => res.json())
			.then(playerData => {
				if (playerData.player === null) {
					return message.channel.send(`Could not find player "${playerName}"`);
				}

				const { displayName, rank, experience, firstLogin } = playerData.player;
				const joined = new Date(firstLogin).toLocaleDateString();

				message.channel.send(`
					Player: ${displayName}
					Rank: ${rank}
					Experience: ${experience}
					Joined: ${joined}
				`);
                console.log(res)
			})
			.catch(error => {
				console.error(error);
				message.channel.send('There was an error getting the player data');
			});
	},
};
