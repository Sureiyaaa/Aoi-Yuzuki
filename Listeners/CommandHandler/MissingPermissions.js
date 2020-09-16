const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Logger = require('../../Utilities/Logger');
const color = require('../../Storage/Colors.json');

class MissingPermissionsListener extends Listener {
	constructor() {
		super('MissingPermissions', {
			event: 'missingPermissions',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	exec(message, command, type, missing) {
		if (type === 'client') {
			Logger.log(`\x1b[31mBlocked \x1b[35m=> \x1b[34m${message.author.username} \x1b[33musing \x1b[34m${command.id}`);

            return message.channel.send(
				`<:NoCross:732292174254833725> ${message.author}, I'm missing \`${missing}\` to use \`${command}\``
            );
        } else if(type === 'user'){
            return message.channel.send(
                `<:NoCross:732292174254833725> ${message.author}, You don't have a permission to use \`${command}\`.`
            );
        }
	}
}

module.exports = MissingPermissionsListener;