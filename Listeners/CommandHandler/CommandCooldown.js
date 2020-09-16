const { Listener } = require('discord-akairo');
const createEmbed = require('../../Functions/EmbedCreator.js');
const color = require('../../Storage/Colors.json');
class cooldownListener extends Listener {
	constructor() {
		super('cooldown', {
			emitter: 'commandHandler',
			event: 'cooldown'
		});
	}

	async exec(message, command, number) {
		let seconds = parseInt((number / 1000) % 60),
			minutes = parseInt((number / (1000 * 60)) % 60),
			hours = parseInt((number / (1000 * 60 * 60)) % 24);
	
		hours = (hours < 10) ? '0' + hours : hours;
		minutes = (minutes < 10) ? '0' + minutes : minutes;
		seconds = (seconds < 10) ? '0' + seconds : seconds;
	
		let time = hours + ':' + minutes + ':' + seconds;
    createEmbed(message, {
        color: color.red,
        description: `<:NoCross:732292174254833725> You can use the \`${command.id}\` command in \`${time}\``,
        authorBool: true,
        send: 'channel',
      });
	}
}

module.exports = cooldownListener;