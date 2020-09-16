const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');

class unhandledRejectionListener extends Listener {
	constructor() {
		super('unhandledRejection', {
			emitter: 'process',
			event: 'unhandledRejection'
		});
	}

	async exec(error) {
		return Logger.log(`UncaughtException > ${error}`);
	}
}

module.exports = unhandledRejectionListener;