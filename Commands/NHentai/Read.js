const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { numberWithCommas, toPlural, trimArray, shorten } = require('../../Utilities/Utilities')
const moment = require('moment')
const createEmbed = require('../../Functions/EmbedCreator');
const color = require('../../Storage/Colors.json');

class ReadCommand extends Command {
  constructor() {
    super('Read', {
      aliases: ['read'],
      description: {
        usage: 'read [Doujin ID]',
        examples: ['read'],
        description: 'Read Doujin'
      },
      args: [
        {
          id: 'code',
          prompt: {
            start: msg =>
            createEmbed(msg, {
            color: color.yellow,
            description: '❔ Please insert a doujin code',
            authorBool: true,
            footer: `Type "Cancel" to cancel this command.`
           })
          },
          type: 'integer'
        }
      ],
      clientPermissions: ['MANAGE_EMOJIS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
      userPermissions: ['SEND_MESSAGES'],
      category: 'NHentai',
      ownerOnly: false,
      channel: 'guild',
      cooldown: 30000,
			ratelimit: 4
    });
  }
  async exec(message, args) {
    let NHentai = await this.client.nhentai;
    try{
    let userMarked = await this.client.userdb.get(message.author.id, "marked")
  if(!message.channel.nsfw) return message.channel.send(`${message.author}, This Command is only available in a **NSFW** Channel`)
      let userBookmark = await this.client.userdb.get(message.author.id, "bookmark")
      NHentai.getBook(args.code).then(g =>{
      let tags = g.tags.map(tag => {
        let text = `\`${toPlural(tag.name)}\``
        return text;
      })
 let page = 1;
      let NHentaiEmbed = new MessageEmbed()
      .setAuthor(`${shorten(g.title.pretty, 25)} (${g.id})`, "https://i.redd.it/fkg9yip5yyl21.png")
      .setTitle(shorten(g.title.pretty, 33))
      .setURL(`https://nhentai.net/g/${g.id}`)
      .setColor(color.orange)
      .setImage(NHentai.getImageURL(g.pages[0]))
      .setFooter(`Page: ${page}/${g.pages.length} | ⭐ ${numberWithCommas(g.favorites)}`)
     message.channel.send(NHentaiEmbed).then(async msg => {
        msg.react("⬅️")
        msg.react("🔖")     
        msg.react("➡️")
       
        const nextFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id
        const backFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id
        const bookmarkFilter = (reaction, user) => reaction.emoji.name === '🔖' && user.id === message.author.id;
        const next = msg.createReactionCollector(nextFilter)
        const back = msg.createReactionCollector(backFilter)
        const bookmarkpage = msg.createReactionCollector(bookmarkFilter);
      bookmarkpage.on('collect', async r => {
      r.users.remove(r.users.cache.filter(u => u === message.author).first())
      if(userBookmark.includes(g.id) || userMarked.includes(g.id)){
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
            back.on('collect', r =>{
              if(page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
               page--;
               const Pembed = new MessageEmbed()
              .setAuthor(`${shorten(g.title.pretty, 25)} (${g.id})`, "https://i.redd.it/fkg9yip5yyl21.png")
              .setTitle(shorten(g.title.pretty, 33))
              .setURL(`https://nhentai.net/g/${g.id}`)
              .setColor(color.orange)
              .setImage(NHentai.getImageURL(g.pages[page -1]))
              .setFooter(`Page: ${page}/${g.pages.length} | ⭐ ${numberWithCommas(g.favorites)}`)
               msg.edit(Pembed)
              r.users.remove(r.users.cache.filter(u => u === message.author).first())
               })
               next.on('collect', r =>{
                if(page === g.pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                page++;

                const Pembed = new MessageEmbed()
                .setAuthor(`${shorten(g.title.pretty, 25)} (${g.id})`, "https://i.redd.it/fkg9yip5yyl21.png")
                .setTitle(shorten(g.title.pretty, 33))
                .setURL(`https://nhentai.net/g/${g.id}`)
                .setColor(color.orange)
                .setImage(NHentai.getImageURL(g.pages[page - 1]))
                .setFooter(`Page: ${page}/${g.pages.length} | ⭐ ${numberWithCommas(g.favorites)}`)
                msg.edit(Pembed)
               r.users.remove(r.users.cache.filter(u => u === message.author).first())
               })
     })
      }).catch(err =>{
      let ErrorEmbed = new MessageEmbed()
      .setDescription("**That Doujin Code does not Exist!**")
      .setColor(color.red)
      message.channel.send(ErrorEmbed)
      })
  
    }catch(err){
      let ErrorEmbed = new MessageEmbed()
      .setDescription("**Error: Finding your Doujin Code!**")
      .setColor(color.red)
     message.channel.send(ErrorEmbed)
    }
  }
}

module.exports = ReadCommand;
