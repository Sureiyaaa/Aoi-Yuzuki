const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');

class unhandledRejectionListener extends Listener {
	constructor() {
		super('uncaughtException', {
			emitter: 'process',
			event: 'uncaughtException'
		});
	}

	async exec(error) {
		return Logger.log(`UncaughtException > ${error}`);
	}
}

module.exports = unhandledRejectionListener;