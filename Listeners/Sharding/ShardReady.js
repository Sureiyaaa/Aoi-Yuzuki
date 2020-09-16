const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');

class ShardReadyListener extends Listener {
	constructor() {
		super('ShardReady', {
			emitter: 'client',
			event: 'shardReady'
		});
	}

	async exec(id, unavailableGuilds) {
        let Unavailable = unavailableGuilds

        Logger.log(`Shard Started => ${id}`);  
	}
}

module.exports = ShardReadyListener;
