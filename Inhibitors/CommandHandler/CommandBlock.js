const { Inhibitor } = require('discord-akairo');

class CommandBlockInhibitor extends Inhibitor {
	constructor() {
		super('CommandBlock', {
			reason: 'commandblock'
		});
	}

	async exec(message, command) {
		if (message.channel.type == 'dm' || message.author.id == this.client.ownerID || message.member.hasPermission('ADMINISTRATOR')) return false;
	}
}

module.exports = CommandBlockInhibitor;