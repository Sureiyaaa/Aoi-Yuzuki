const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { numberWithCommas, toPlural, trimArray, shorten } = require('../../Utilities/Utilities')
const moment = require('moment')
const createEmbed = require('../../Functions/EmbedCreator');
const color = require('../../Storage/Colors.json');

class RandomCommand extends Command {
  constructor() {
    super('Random', {
      aliases: ['random'],
      description: {
        usage: 'random',
        examples: ['a!random'],
        description: 'Random Card'
      },
      clientPermissions: ['MANAGE_EMOJIS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
      userPermissions: ['SEND_MESSAGES'],
      category: 'NHentai',
      ownerOnly: false,
      channel: 'guild',
      cooldown: 0,
			ratelimit: 1
    });
  }
  async exec(message) {
    let NHentai = await this.client.nhentai;
    let nana = await this.client.nana

    let userMarked = await this.client.userdb.get(message.author.id, "marked")
    try{
      if(!message.channel.nsfw) return message.channel.send(`${message.author}, This Command is only available in a **NSFW** Channel`)
      let userBookmark = await this.client.userdb.get(message.author.id, "bookmark")
      await nana.random().then(async nanacode =>{
  
      await NHentai.getBook(nanacode.id).then(g =>{
      let tags = g.tags.map(tag => {
        let text = `\`${toPlural(tag.name)}\``
        return text;
      })
      let NHentaiEmbed = new MessageEmbed()
      .setAuthor(`${shorten(g.title.pretty, 25)} (${g.id})`, "https://i.redd.it/fkg9yip5yyl21.png")
      .setTitle(shorten(g.title.pretty, 33))
      .addFields(
        { name: 'Tags:', value: `${tags.length < 7 ? tags.join(', ') : tags.length > 7 ? trimArray(tags) : '`None`'}`, inline: true},
        { name: 'Release Date:', value: `${moment(g.uploaded).format('LL')}`, inline: false}
      )
      .setURL(`https://nhentai.net/g/${g.id}`)
      .setColor(color.orange)
      .setImage(NHentai.getImageURL(g.cover))
      .setFooter(`Page: ${g.pages.length} | ⭐ ${numberWithCommas(g.favorites)}`)
     message.channel.send(NHentaiEmbed).then(async msg => {
       await msg.react("🔖")
       await msg.react("755473888007290932")
       
       
      const bookmarkFilter = (reaction, user) => reaction.emoji.name === '🔖' && user.id === message.author.id;
      const downloadFilter = (reaction, user) => reaction.emoji.id === '755473888007290932' && user.id === message.author.id;
      const bookmarkpage = msg.createReactionCollector(bookmarkFilter,{max: 1});
      const downloadpage = msg.createReactionCollector(downloadFilter, {max: 1});
       
      bookmarkpage.on('collect', async r => {
      r.users.remove(r.users.cache.filter(u => u === message.author).first())
      if(userBookmark.includes(g.id)|| userMarked.includes(g.id)){
      const Pembed = new MessageEmbed()
      .setDescription(`<:NoCross:732292174254833725> **${toPlural(g.title.pretty)} (${g.id}) is already in your Bookmark!**`)
      .setColor(color.red)
      msg.edit(Pembed)
      }else{
      const Pembed = new MessageEmbed()
      .setDescription(`<:YesCheck:732370868377878568> **${toPlural(g.title.pretty)} (${g.id}) was added to your Bookmark!**`)
      .setColor(color.orange)
      msg.edit(Pembed)
      await this.client.userdb.push(message.author.id, Number(g.id),"bookmark")
      }
      })
      downloadpage.on('collect', async r => {
      r.users.remove(r.users.cache.filter(u => u === message.author).first())

      const Pembed = new MessageEmbed()
      .setDescription(`<:YesCheck:732370868377878568> **${toPlural(g.title.pretty)} (${g.id}) [Click Me](https://nhentai.net/g/${g.id}/download) to Download!**`)
      .setColor(color.orange)
      msg.edit(Pembed)
      })
     })
      }).catch(err =>{
      let ErrorEmbed = new MessageEmbed()
      .setDescription("**That Doujin Code does not Exist!**")
      .setColor(color.red)
      message.channel.send(ErrorEmbed)
      })
      })
    }catch(err){
      let ErrorEmbed = new MessageEmbed()
      .setDescription("**Error: Finding your Doujin Code!**")
      .setColor(color.red)
     message.channel.send(ErrorEmbed)
    }
  }
}


module.exports = RandomCommand;
