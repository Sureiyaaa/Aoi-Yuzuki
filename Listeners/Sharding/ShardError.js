const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');

class ShardErrorListener extends Listener {
	constructor() {
		super('ShardError', {
			emitter: 'client',
			event: 'shardError'
		});
	}

	async exec(error, shardID) {
  
        Logger.log(`Shard Error => ${error}`);  
        Logger.log(`Shard ID => ${shardID}`);  
	}
}

module.exports = ShardErrorListener;
