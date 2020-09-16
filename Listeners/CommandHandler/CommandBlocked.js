const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');
const color = require('../../Storage/Colors.json');
class CommandBlockedListener extends Listener {
	constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			event: 'commandBlocked'
		});
	}

	async exec(message, command, reason) {
		Logger.log(`\x1b[31mBlocked \x1b[35m=> \x1b[34m${message.author.username} \x1b[33musing \x1b[34m${command.id}`);
		let ownerMessage;
		let blacklistMessage;
		let Embed = this.client.util.embed()
			.setColor(color.red)
			.setDescription('Something blocked you');

		switch(reason) {
		case 'owner':
			Embed.setDescription('<:NoCross:732292174254833725> You are not the owner.');
			message.channel.send(Embed);
			break;
		case 'guild':
			Embed.setDescription(`<:NoCross:732292174254833725> You can\'t use this command in DM!`);
			message.channel.send(Embed);
			break;
		case 'dm':
			Embed.setDescription(`<:NoCross:732292174254833725> You can\'t use this command in a guild!`);
			message.channel.send(Embed);
			break;
		case 'blacklist': 
			Embed.setTitle('Blacklisted.');
			Embed.setDescription(`<:NoCross:732292174254833725> You are Blacklisted`);
			message.channel.send(Embed);
			break;
		case 'serverblacklist': 
			Embed.setDescription(`<:NoCross:732292174254833725> This server have been blacklisted... to appeal contact ${this.client.users.resolve(this.client.ownerID).tag}`);
			message.channel.send(Embed);
			message.guild.leave();
			break;
		case 'commandblock':
			Embed.setTitle('Command blocked.');
			Embed.setDescription('The admins of this server blocked this command.');
			message.channel.send(Embed);
			break;
		}
	}
}

module.exports = CommandBlockedListener;