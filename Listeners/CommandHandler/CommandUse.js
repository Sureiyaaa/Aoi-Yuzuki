const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');

class CommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			event: 'commandStarted',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	exec(message, command) {
		Logger.log(`\x1b[32mCommand \x1b[36m${command.id} \x1b[35m=> \x1b[34m${message.author.tag}`);
	}
}

module.exports = CommandStartedListener;