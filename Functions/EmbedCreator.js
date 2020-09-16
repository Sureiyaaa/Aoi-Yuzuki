const Discord = require('discord.js');

module.exports = async function embedCreator(message, embedObject) {

  const colorPresets = {
    errorRed: '#F44336',
    defaultPink: '#FFC0CB',
    finishGreen: '#7CB342',
  };
  const createdEmbed = new Discord.MessageEmbed().setColor(
    embedObject.color || colorPresets[embedObject.color]
  );

  if (embedObject.authorBool) {
    createdEmbed.setAuthor(
      message.author.tag,
      message.author.displayAvatarURL()
    );
  }

  if (embedObject.title) {
    createdEmbed.setTitle(embedObject.title);
  }

  if (embedObject.url) {
    createdEmbed.setURL(embedObject.url);
  }

  if (embedObject.thumbnail) {
    createdEmbed.setThumbnail(embedObject.thumbnail);
  }
  
  if (embedObject.description) {
    createdEmbed.setDescription(embedObject.description);
  }

  if (embedObject.fields) {
    createdEmbed.addFields(embedObject.fields);
  }

  if (embedObject.image) {
    createdEmbed.setImage(embedObject.image);
  }

  if (embedObject.footer) {
    createdEmbed.setFooter(
      embedObject.footer,
      message.client.user.displayAvatarURL()
    );
  }
  if (embedObject.send) {
    switch (embedObject.send) {
      case 'author':
        return await message.author.send(createdEmbed);
      case 'channel':
        return await message.channel.send(createdEmbed);
      default:
        break;
    }
  }
  return createdEmbed;
};
