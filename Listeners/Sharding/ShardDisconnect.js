const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');

class ShardDisconnectListener extends Listener {
	constructor() {
		super('ShardDisconnect', {
			emitter: 'client',
			event: 'shardDisconnect'
		});
	}

	async exec(event, id) {
  
        Logger.log(`Shard Disconnected => ${id}`);  
        Logger.log(`Disconnect Cause => ${event}`);  
	}
}

module.exports = ShardDisconnectListener;
