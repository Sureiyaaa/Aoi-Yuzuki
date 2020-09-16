const { Command } = require('discord-akairo');
const createEmbed = require('../../Functions/EmbedCreator.js');
const color = require('../../Storage/Colors.json');
class AboutCommand extends Command {
  constructor() {
    super('About', {
      aliases: ['about', "bot"],
      description: {
        usage: 'about',
        examples: ['about'],
        description: 'Display\'s information about the bot'
      },
      category: 'Information',
      ownerOnly: false,
      channel: 'guild',
      cooldown: 60000,
			ratelimit: 2
    });
  }
  async exec(message) {
       createEmbed(message, {
        title: 'Aoi Yuzuki',
        color: color.orange,
        description: `**${this.client.user.username}-desu, one of the main characters of "Araiya-san!: Ore to Aitsu ga Onnayu de!?"\n NHentai Reader|Searcher on the Go, created in Discord-Akairo**`,
        fields: [
        {
        name: 'Framework',
        value: `\`\`\`\Discord.js     : 12.3.1\nDiscord-Akairo : 8.1.0\`\`\``,
        inline: false
        },
        {
        name: 'Owner',
        value: `\`\`\`\Sureiyā#3654\`\`\``,
        inline: true  
        },
        {
        name: 'Version',
        value: "```1.0.0```",
        inline: true
        },
                ],
        image: "https://www.animeclick.it/immagini/personaggio/Aoi_Yuzuki/gallery_original/Aoi_Yuzuki-5d2dc0c71edcc.jpg",
        authorBool: true,
        send: 'channel',
      });
  }
}

module.exports = AboutCommand;
