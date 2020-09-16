const { Listener } = require('discord-akairo');
const { numberWithCommas } = require("../../Utilities/Utilities");
const Logger = require('../../Utilities/Logger');
const Enmap = require('enmap');
class StartUPListener extends Listener {
  constructor() {
    super('Start Up', {
      emitter: 'client',
      event: 'ready',
      category: "Client"
    });
  }

  exec() {
    const now = new Date;
    let commandSize = this.client.commandHandler.modules.size;
		let clientTag = this.client.user.tag;
		let clientUsername = this.client.user.username;
		let guildSize = this.client.guilds.cache.size;
		let userSize = this.client.users.cache.size;
    let channelSize = this.client.channels.cache.size;
		let clientID = this.client.user.id;
    this.client.userdb = new Enmap({name: "userdb"});
		Logger.log('===========[ READY ]===========');
		Logger.log(`\x1b[32mLogged in as \x1b[34m${clientTag}\x1b[0m! (\x1b[33m${clientID}\x1b[0m)`);
		Logger.log(`Ready to serve in \x1b[33m${numberWithCommas(channelSize)}\x1b[0m channels on \x1b[33m${numberWithCommas(guildSize)}\x1b[0m servers, for a total of \x1b[33m${numberWithCommas(userSize)}\x1b[0m users.`);
		Logger.log(`There are \x1b[33m${commandSize}\x1b[0m command loaded`);
    Logger.log(`${clientUsername} is ready Shijo!`);
    this.client.user.setActivity(`${clientUsername} | Booting Up.`, {
      type: 'STREAMING',
      url: 'https://www.twitch.tv/sur3iya'
    });
    this.client.setTimeout(() => {
      this.client.user.setActivity(`${clientUsername} | Online!`, {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/sur3iya'
      });
    }, 10000);
    this.client.setInterval(() => {
      const activityArray = [
      `Help | a!help`,
      `Prefix | a!`,
      `Guilds | ${numberWithCommas(guildSize)}`,
      `Channels | ${numberWithCommas(channelSize)}`,
      `Users | ${numberWithCommas(userSize)}`
    ];
      const pickedActivity = Math.floor(
        Math.random() * activityArray.length,
      );

        this.client.user.setActivity(activityArray[pickedActivity], {
          type: 'STREAMING',
          url: 'https://www.twitch.tv/sur3iya'
        });
    }, 60000);
  }
}

module.exports = StartUPListener;
