const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { formatName } = require('../../Utilities/Functions');
const color = require('../../Storage/Colors.json');

const emotes = {
                "Developer":"⚙️",
                "Information":"ℹ️",
                "NHentai":"🔞",
                }


    class HelpCommand extends Command {
        constructor() {
            super('Help', {
                aliases: ['help', 'h', 'halp', 'commands'],
                category: 'Information',
                args: [{ 
                    id: 'command', type: 'commandAlias', match: 'content', default: null 
                }],
                description: {
                    usage: 'help < command >',
                    examples: ['help', 'comands', 'h'],
                    description: 'Display\'s the commands of the bot'
                },
                category: 'Information',
                cooldown: 3000,
                ratelimit: 3
            });
        }

    async exec(message, { command }) {
        if(!command) {
        const embed = new MessageEmbed();
            this.handler.categories.forEach((cm, category) => {
                
                const dirSize = cm.filter(cmd => cmd.category === cm);
                let mappedOut = cm.map(x => `\`${x}\``).join(', ')
                    if(category === 'Owner' && !this.client.ownerID.includes(message.author.id)) mappedOut = '`No access!`'

                    embed.addField(`${dirSize.size} | ${emotes[category]} **${category} Commands**`, mappedOut)
                         .setDescription("Use ``at!help [command]`` to get more help! Example: ``at!help about`` \n\u200b")
                         .setColor(color.white)
                         .setAuthor(`Help Menu | ${message.guild.name}`, message.guild.iconURL())
                         .setFooter(`© Atago Development | at!help [cmd]`, message.client.user.displayAvatarURL({ format: 'png' }))    
        
        });

    return message.util.send({ embed });

            } else if(command) {
                        const cmd = command;
                        const embed = new MessageEmbed()
                            .setColor(color.white)
                            .setAuthor(`Help: ${formatName(cmd.aliases[0])} | ${message.guild.name}`, message.guild.iconURL())
                            .setDescription(`
                            **Command Name**: \`${cmd.aliases[0]}\`
                            **Command Aliases**: ${`${cmd.aliases.map(x => `\`${x}\``).join(', ') || 'No Alias'}`}
                            **Command Cooldown**: \`${cmd.cooldown / 1000 + 's' || 0}\`
                            **Command Ratelimit**: \`${cmd.ratelimit || 0}\`
                            **Owner Only**: \`${cmd.ownerOnly ? 'Yes' : 'No' || 'No'}\`
                            **Command Description**: ${cmd.description.description || 'A command'}
                            **Command Usage**: \`${cmd.description.usage || cmd.alises[0]}\`
                            **Command Examples**:\n\`\`\`${cmd.description.examples.join('\n') || cmd.aliases[0]}\`\`\``)
                            .setFooter(`© Atago Development`, message.client.user.displayAvatarURL({ format: 'png' }))  
                        return message.util.send({ embed });
            }
        }
    }

module.exports = HelpCommand;