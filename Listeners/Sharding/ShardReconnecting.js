const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');

class ShardReconnectingListener extends Listener {
	constructor() {
		super('ShardReconnecting', {
			emitter: 'client',
			event: 'shardReconnecting'
		});
	}

	async exec(id) {
        Logger.log(`Shard Reconnecting > ${id}`);  
	}
}

module.exports = ShardReconnectingListener;
