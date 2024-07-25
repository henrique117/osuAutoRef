import * as fs from 'fs';

class TXTProviderService {
    private regex = /^[a-zA-Z0-9]+(\r?\n)[a-zA-Z0-9]+(\r?\n)[a-zA-Z0-9]+(\r?\n)\d+(\r?\n)(0|1)(\r?\n)([0-9\s]+)(\r?\n)(0|1)$/;
    private txtContentVerified: string = '';

    constructor(private txt: string) {
        try {
            const txtContent: string = fs.readFileSync(`${txt}.txt`, 'utf8');

            if (!this.verify(txtContent)) {
                console.error(`The file "${txt}.txt" is not in the correct format`);
            } else {
                this.txtContentVerified = txtContent;
            }
        } catch (error) {
            console.error(`Error reading the file`);
        }
    }

    public verify(txtToVerify: string): boolean {
        return this.regex.test(txtToVerify);
    }

    public provideStringVector(): string[] {
        return this.txtContentVerified.split(/\r?\n/);
    }
}

export default TXTProviderService;