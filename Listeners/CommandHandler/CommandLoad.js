const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');
class CommandLoadListener extends Listener {
	constructor() {
		super('CommandLoad', {
			emitter: 'commandHandler',
			event: 'load'
		});
	}

	async exec(command, isReload) {
		if (isReload) {
			Logger.log(`\x1b[32mSuccessfully Reloaded \x1b[33m${command.categoryID} \x1b[35m=> \x1b[34m${command.id}`);
		} else {
			Logger.log(`\x1b[32mSuccessfully Loaded \x1b[33m${command.categoryID} \x1b[35m=> \x1b[34m${command.id}`);
		}
	}
}

module.exports = CommandLoadListener;
