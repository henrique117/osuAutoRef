import IRCConfig from "./config/IRCConfig"
import ChatMessages from "./controllers/chatMessages"

const ircService = new ChatMessages(IRCConfig)
ircService.sendMessages()