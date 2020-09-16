const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { numberWithCommas, toPlural, trimArray, shorten } = require('../../Utilities/Utilities')
const moment = require('moment')
const createEmbed = require('../../Functions/EmbedCreator');
const color = require('../../Storage/Colors.json');

class DropCommand extends Command {
  constructor() {
    super('Drop', {
      aliases: ['drop', 'unmark', 'remove'],
      description: {
        usage: 'drop [Doujin Code]',
        examples: ['a!drop 21323'],
        description: 'Drop a doujin code in your Bookmark'
      },
      args: [
        {
          id: 'code',
          prompt: {
            start: msg =>
            createEmbed(msg, {
            color: color.yellow,
            description: '❔ Please insert a code from your bookmark',
            authorBool: true,
            footer: `Type "Cancel" to cancel this command.`
           })
          },
          type: 'integer'
        }
      ],
      clientPermissions: ['SEND_MESSAGES'],
      userPermissions: ['SEND_MESSAGES'],
      category: 'NHentai',
      ownerOnly: false,
      channel: 'guild',
      cooldown: 0,
			ratelimit: 1
    });
  }
  async exec(message, args) {
    let NHentai = await this.client.nhentai;
    let nana = await this.client.nana
    try{
    let userBookmark = await this.client.userdb.get(message.author.id, "bookmark")
      
    if(userBookmark.includes(args.code)){
            NHentai.getBook(args.code).then(async g =>{
  

      const Pembed = new MessageEmbed()
      .setDescription(`<:YesCheck:732370868377878568> **${toPlural(g.title.pretty)} (${g.id}) has been removed from your bookmark!**`)
      .setColor(color.orange)
      message.channel.send(Pembed)
      await this.client.userdb.remove(message.author.id, args.code, "bookmark")
      })
    }else{
      const Pembed = new MessageEmbed()
      .setDescription(`<:NoCross:732292174254833725> **You don't have this code in your bookmark!**`)
      .setColor(color.red)
      message.channel.send(Pembed)
    }
    }catch(err){
      let ErrorEmbed = new MessageEmbed()
      .setDescription("**Error: Finding your Doujin Code!**")
      .setColor(color.red)
     message.channel.send(ErrorEmbed)
    }
  }
}


module.exports = DropCommand;
