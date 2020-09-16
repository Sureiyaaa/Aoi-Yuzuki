const { Listener } = require('discord-akairo');
const Logger = require('../../Utilities/Logger');
class ErrorEventListener extends Listener {
    constructor() {
        super('Error', {
            event: 'error',
            emitter: 'client'
        });
    }

    exec(error) {
        Logger.log(`Error > ${error}`);
    }
}

module.exports = ErrorEventListener;