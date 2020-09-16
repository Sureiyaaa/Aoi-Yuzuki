const { Listener } = require('discord-akairo');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { Prefix } = require('../../Storage/Auth.json');
const color = require('../../Storage/Colors.json');

class PrefixMentionListener extends Listener {
	constructor() {
		super('Prefix Mention', {
			emitter: 'client',
      event: 'message',
      category: "Client"
		});
	}

	async exec(message) {
    if(message.author.bot) return;
    if(message.guild){
    const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      let embed = new MessageEmbed()
      .setDescription(`${message.author}, My prefix is \`${Prefix}\``)
      .setColor(color.orange)
      return message.channel.send(embed);
    }
    	this.client.userdb.ensure(`${message.author.id}`, {
      bookmark: [],
      marked: []
    });
  }
	}
}
    

module.exports = PrefixMentionListener;