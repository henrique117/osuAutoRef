import IRCConnectionService from "../services/IRCBanchoConnection";
import TXTProviderService from "../services/TXTFIleCheck";

class ChatMessages extends IRCConnectionService {
    private matchID: string = '0';
    private channelPassword: string = '';

    private async receiveMessages(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.client.addListener('message', (from: string, to: string, message: string) => {
                console.log(`Mensagem recebida: ${message}`);

                if (message.includes('Created the tournament match')) {
                    const matchLink = message.match(/https:\/\/osu\.ppy\.sh\/mp\/(\d+)/);
                    if (matchLink) {
                        this.matchID = matchLink[1];
                        console.log(`MatchID extraído: ${this.matchID}`);
                    }
                }

                if (message.includes('Senha do canal:')) {
                    const password = message.match(/Senha do canal:\s(\S+)/);
                    if (password) {
                        this.channelPassword = password[1];
                        console.log(`Senha do canal extraída: ${this.channelPassword}`);
                        resolve();
                    }
                }
            });
        });
    }

    public async sendMessages() {
        const lobbyConfigs = new TXTProviderService('config');
        const stringVector = lobbyConfigs.provideStringVector();

        this.client.addListener('registered', async () => {
            console.log('Conectado ao servidor IRC.')
            this.client.say('BanchoBot', `!mp make ${stringVector[0]}: (${stringVector[1]}) vs (${stringVector[2]})`);

            await this.receiveMessages();

            if (this.matchID === '0') {
                console.log('Partida não foi criada.');
            } else {
                const channelName = `#mp_${this.matchID}`;
                console.log(`Tentando entrar no canal: ${channelName}`);

                this.client.join(channelName, () => {
                    console.log(`Entrou no canal: ${channelName}`);
                    this.client.say(channelName, `!auth ${this.channelPassword}`);
                    
                    setTimeout(() => {
                        this.client.say(channelName, '!mp invite 28214731');
                        this.client.say(channelName, '!mp set 0 3 16');
                    }, 3000);
                });

                this.client.addListener('join', (channel: string, who: string) => {
                    if (channel === channelName) {
                        console.log(`${who} entrou no canal ${channel}`);
                    }
                });
            }
        });

        this.client.addListener('error', (message: any) => {
            console.error('Erro: ', message);
        });
    }
}

export default ChatMessages;