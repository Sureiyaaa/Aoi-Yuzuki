const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');

class ShardResumeListener extends Listener {
	constructor() {
		super('ShardResume', {
			emitter: 'client',
			event: 'shardResume'
		});
	}

	async exec(id, replayedEvents) {
        Logger.log(`Shard Resumed => ${id} Replayed =>`);  
	}
}

module.exports = ShardResumeListener;
