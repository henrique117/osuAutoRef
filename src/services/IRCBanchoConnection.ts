import * as irc from 'irc'
import IRCConfigInterface from '../interfaces/IRCConfig.interface'

class IRCConnectionService {
    protected client: irc.Client

    constructor(
        private config: IRCConfigInterface,
    ) {
        this.client = new irc.Client(config.server, config.username, {
            channels: ['Simabuco'],
            password: config.password,
            retryCount: 5,
            retryDelay: 5000,
            debug: false
        })
    }

    public connect() {
        this.client.addListener('registered', () => {
            console.log('Conectou ao IRC')
        })

        this.client.addListener('error', (message) => {
            console.error('Error: ', message)
        })
    }
}

export default IRCConnectionService