const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { numberWithCommas, toPlural, trimArray, shorten } = require('../../Utilities/Utilities')
const moment = require('moment')
const createEmbed = require('../../Functions/EmbedCreator');
const color = require('../../Storage/Colors.json');

class PopularCommand extends Command {
  constructor() {
    super('Popular', {
      aliases: ['popular'],
      description: {
        usage: 'popular',
        examples: ['a!popular'],
        description: 'Popular Doujins'
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
  async exec(message, args) {
    let NHentai = await this.client.nhentai;
    let userMarked = await this.client.userdb.get(message.author.id, "marked")
    let nana = await this.client.nana
      let userBookmark = await this.client.userdb.get(message.author.id, "bookmark")
    try{
    nana.popular().then(async g=>{
      let result = g.results.map(async book => {
      let obj = {id: book.id, name: await NHentai.getBook(book.id).then(data => { return data.title.pretty;}), thumbnail: book.thumbnail.s, stars: await nana.g(book.id).then(data => { return numberWithCommas(data.num_favorites);})}
      return await obj;
      })
      
    const results = await Promise.all(result)

      let page = 1;
      let BookmarkEmbed = new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setTitle(`${results[0].name} (${results[0].id})`)
      .setURL(`https://nhentai.net/g/${results[0].id}`)
      .setImage(results[0].thumbnail)
      .setColor(color.orange)
      .setFooter(`Page: ${page}/${results.length} | ⭐ ${results[0].stars}`)
     message.channel.send(BookmarkEmbed).then(msg => {
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
             let userBookmark2 = await this.client.userdb.get(message.author.id, "bookmark")
              r.users.remove(r.users.cache.filter(u => u === message.author).first())
              if(await userBookmark2.includes(Number(await results[page - 1].id)) || await userBookmark2.includes(Number(await results[page - 1].id))){
              const Pembed = new MessageEmbed()
              .setDescription(`<:NoCross:732292174254833725> **${toPlural(results[0].name)} (${results[page - 1].id}) is already in your Bookmark!**`)
              .setColor(color.red)
              msg.edit(Pembed)
              }else{
              const Pembed = new MessageEmbed()
              .setDescription(`<:YesCheck:732370868377878568> **${toPlural(results[0].name)} (${results[page - 1].id}) was added to your Bookmark!**`)
              .setColor(color.orange)
              msg.edit(Pembed)
              await this.client.userdb.push(message.author.id, Number(results[page - 1].id),"bookmark")
              }
              })
       
              back.on('collect', r =>{
               if(page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
               page--;
               const Pembed = new MessageEmbed()
              .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
              .setTitle(`${results[page - 1].name} (${results[page - 1].id})`)
              .setURL(`https://nhentai.net/g/${results[page - 1].id}`)
              .setImage(results[page - 1].thumbnail)
              .setColor(color.orange)
              .setFooter(`Page: ${page}/${results.length} | ⭐ ${results[page - 1].stars}`)
               msg.edit(Pembed)
              r.users.remove(r.users.cache.filter(u => u === message.author).first())
               })
               next.on('collect', r =>{
                if(page === results.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                page++;

                const Pembed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle(`${results[page - 1].name} (${results[page - 1].id})`)
                .setURL(`https://nhentai.net/g/${results[page - 1].id}`)
                .setImage(results[page - 1].thumbnail)
                .setColor(color.orange)
                .setFooter(`Page: ${page}/${results.length} | ⭐ ${results[page - 1].stars}`)
                msg.edit(Pembed)
               r.users.remove(r.users.cache.filter(u => u === message.author).first())
               })
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

function chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
}
function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
          return array[i];
      }
  }
  return null;
}

module.exports = PopularCommand;
