const Logger = require('./Utilities/Logger');
const createEmbed = require('./Functions/EmbedCreator.js');
const color = require('./Storage/Colors.json');
const { API } = require('nhentai-api');
const Nana = require('nana-api');
const { 
       Token,
       Prefix,
       Owners 
} = require('./Storage/Auth.json');
const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MyClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: Owners
      },
      {
        disableEveryone: true,
      }
    );
    this.commandHandler = new CommandHandler(this, {
      directory: './Commands/',
      prefix: Prefix,
      allowMention: true,
      argumentDefaults: {
				prompt: {
          timeout: msg =>
          createEmbed(msg, {
            color: color.yellow,
            description: '<:NoCross:732292174254833725> Time ran out, command has been cancelled.',
            }),
					ended:  msg => 
          createEmbed(msg, {
            color: color.yellow,
            description: '<:NoCross:732292174254833725> Too many retries, command has been cancelled.',
            }),
					retry:  msg =>
          createEmbed(msg, {
            color: color.yellow,
            description: '<:NoCross:732292174254833725> Could not find your argument, please try again.',
          }),
					cancel: msg => 
          createEmbed(msg, {
            color: color.yellow,
            description: '<:YesCheck:732370868377878568> Command has been cancelled.',
          }),
					retries: 2,
					time: 30000
				}
			},
      commandUtil: true,
			commandUtilLifetime: 60000,
      allowMention: true,
			handleEdits: true,
      ignorePermissions: Owners,
			ignoreCooldown: Owners,
    });
    this.inhibitorHandler = new InhibitorHandler(this, {
			directory: './Inhibitors/',
			emitters: {
				process
			},
		});
    this.listenerHandler = new ListenerHandler(this, {
      directory: './Listeners/',
    });
		this.listenerHandler.setEmitters({ 
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
      process: process
		});
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
		this.inhibitorHandler.loadAll();
    this.commandHandler.loadAll();
    this.configuration = require('./Storage/Emotes.js');
    this.emotes = this.configuration.emotes;
    this.nhentai = new API();
    this.nana = new Nana();
  }
}

const client = new MyClient();

client.login(Token);
