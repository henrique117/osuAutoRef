import IRCConnectionService from "../services/IRCBanchoConnection";
import TXTProviderService from "../services/TXTFIleCheck";

class ChatMessages extends IRCConnectionService {
    public receiveMessages() {
        this.client.addListener('message', (from: string, to: string, message: string) => {
            console.log(`${from} mandou "${message}" para ${to}`)
        })
    }

    public sendMessages() {
        const lobbyConfigs = new TXTProviderService('config')
        const stringVector = lobbyConfigs.provideStringVector()
        console.log(stringVector)
        // this.client.say('BanchoBot', `!mp make ${stringVector[0]}: (${stringVector[1]}) vs (${stringVector[2]})`)
    }
}

export default ChatMessages