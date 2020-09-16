const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { numberWithCommas, toPlural, trimArray, shorten } = require('../../Utilities/Utilities')
const moment = require('moment')
const createEmbed = require('../../Functions/EmbedCreator');
const color = require('../../Storage/Colors.json');

class BookmarkCommand extends Command {
  constructor() {
    super('Bookmark', {
      aliases: ['bookmark', "book"],
      description: {
        usage: 'bookmark',
        examples: ['a!bookmark'],
        description: 'Display\'s Code Bookmark'
      },
      clientPermissions: ['MANAGE_EMOJIS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
      userPermissions: ['SEND_MESSAGES'],
      category: 'NHentai',
      ownerOnly: false,
      channel: 'guild',
      cooldown: 30000,
			ratelimit: 4
    });
  }
  async exec(message) {
    let NHentai = await this.client.nhentai;
    try{
  if(!message.channel.nsfw) return message.channel.send(`${message.author}, This Command is only available in a **NSFW** Channel`)
    let userBookmark = await this.client.userdb.get(message.author.id, "bookmark")
    let userMarked = await this.client.userdb.get(message.author.id, "marked")
    if(userBookmark === null || userBookmark === undefined || userBookmark.length  == 0){
    const embed = new MessageEmbed()
    .setDescription(`<:NoCross:732292174254833725> ${message.author.tag}, You have no bookmarked code!`)
    .setColor(color.red)
    message.channel.send(embed);     
    }else{
        let i = 1
var names = await userBookmark.map(async code =>{
var text = `> **[(${code}) ${await NHentai.getBook(code).then(g =>{return shorten(g.title.pretty, 18);})}](https://nhentai.net/g/${code})**`

return text;
})
var names2 = await userMarked.map(async code =>{
var text = `> **[(${code}) ${await NHentai.getBook(code).then(g =>{return shorten(g.title.pretty, 18);})}](https://nhentai.net/g/${code})**`

return text;
})
const results = await Promise.all(names)
const results2 = await Promise.all(names2)
  var namesI = await chunk(results, 10)
   var namesI2 = await chunk(results2, 10)
    let page = 1;
      let BookmarkEmbed = new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .addFields(
        { name: `__🔖 Bookmark:__`, value: `${namesI[0] ? namesI[0].join('\n') : "> **None**"}`, inline: true},
        { name: `__🔖 Finished List:__`, value: `${namesI2[0] ? namesI2[0].join('\n') : "> **None**"}`, inline: true}
      )
      .setColor(color.orange)
      .setFooter(`Page: ${page}/${namesI.length}`)
     message.channel.send(BookmarkEmbed).then(msg => {
        msg.react("⬅️")
        msg.react("➡️")
              let page2 = 1
               const nextFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id
               const backFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id

               const next = msg.createReactionCollector(nextFilter)
               const back = msg.createReactionCollector(backFilter)
               
               back.on('collect', r =>{
               if(page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
               page--;
               if(page2 === 1){
               r.users.remove(r.users.cache.filter(u => u === message.author).first());
               }else{
               page2--;
               }
               const Pembed = new MessageEmbed()
              .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
              .addFields(
                { name: `__🔖 Bookmark:__`, value: `${namesI[0] ? namesI[page - 1].join('\n') : "> **None**"}`, inline: true},
                { name: `__🔖 Finished List:__`, value: `${namesI2[0] ? namesI2[page2 - 1].join('\n') : "> **None**"}`, inline: true}
              )
              .setColor(color.orange)
              .setFooter(`Page: ${page}/${namesI.length}`)
               msg.edit(Pembed)
              r.users.remove(r.users.cache.filter(u => u === message.author).first())
               })

               next.on('collect', r =>{
                if(page === namesI.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                page++;
                if(page2 === namesI2.length){
                 r.users.remove(r.users.cache.filter(u => u === message.author).first());
                 }else{
                 page2++;
                 }
                const Pembed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .addFields(
                  { name: `__🔖 Bookmark:__`, value: `${namesI[0] ? namesI[page - 1].join('\n') : "> **None**"}`, inline: true},
                  { name: `__🔖 Finished List:__`, value: `${namesI2[0] ? namesI2[page2 - 1].join('\n') : "> **None**"}`, inline: true}
                )
                .setColor(color.orange)
                .setFooter(`Page: ${page}/${namesI.length}`)
                msg.edit(Pembed)
               r.users.remove(r.users.cache.filter(u => u === message.author).first())
               })
     })
    }
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


module.exports = BookmarkCommand;
