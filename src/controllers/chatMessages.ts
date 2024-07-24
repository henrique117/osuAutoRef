import IRCConnectionService from "../services/IRCBanchoConnection";

class ChatMessages extends IRCConnectionService {
    public receiveMessages() {
        this.client.addListener('message', (from: string, to: string, message: string) => {
            console.log(`${from} mandou "${message}" para ${to}`)
            this.client.say(from, message)
        })
    }
}

export default ChatMessages