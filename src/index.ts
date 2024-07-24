import IRCConfig from "./config/IRCConfig"
import ChatMessages from "./controllers/chatMessages"
import TXTProviderService from "./services/TXTFIleCheck"

/* const ircService = new ChatMessages(IRCConfig)
ircService.connect()
ircService.receiveMessages() */

const readTxt = new TXTProviderService()


const result = readTxt.readTxt()
console.log(result)
