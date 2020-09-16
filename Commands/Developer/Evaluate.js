const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Logger = require('../../Utilities/Logger');
const color = require('../../Storage/Colors.json');
const settings = require("../../Storage/Colors.json")
class EvaluateCommand extends Command {
    constructor() {
        super('Evaluate', {
            aliases: ['evaluate', 'eval'],
            description: {
                    usage: 'evaluate eval',
                    examples: ['eval message.author.id'],
                    description: 'Evaluate javascript code!'
            },
            args: [
                {   // all args
                    id: 'eval',
                    match: 'rest'
                }
            ],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['SEND_MESSAGES'],
            ownerOnly: true,
            category: 'Developer',
            channel: 'guild'
        });
    }

    async exec(message, args) {

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
    try {
      const code = args.eval;
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        if (evaled.length > 2000) {
          const embed = new MessageEmbed()
          .setcolor(settings.red)
          .setTitle('Warning')
          .setthumbnail(message.author.avatarURL)
          .setTimestamp()
          .setDescription('The eval result is over 2000 characters.')
          return message.channel.send(embed)
        }
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

    }
}

module.exports = EvaluateCommand;