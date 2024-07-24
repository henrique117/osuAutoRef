import * as fs from 'fs'

class TXTProviderService {
    private regex = /^[a-zA-Z0-9]+\n\d+$/
    private txt: string | null = null

    constructor() {
        this.loadTXT()
    }

    private async loadTXT() {
        let text: string | null = null
        try {
            const data = await fs.promises.readFile('config.txt', 'utf8');
            text = data.trim()
            const verify = await this.verifyTXT(text)

            if(verify == false) return null
        } catch (e) {
            console.error('Erro ao ler arquivo: ', e)
        }

        return text
    }

    public async verifyTXT(text: string | null): Promise<boolean> {
        if(text === null) return false
        return this.regex.test(text)
    }

    public async readTxt(): Promise<string | null> {
        console.log(this.loadTXT)
        if(await this.loadTXT() === null) return 'O arquivo de texto está em um formato errado ou é inexistente'
        return this.txt!
    }
}

export default TXTProviderService