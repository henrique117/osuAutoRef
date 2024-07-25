import IRCConfigInterface from '../interfaces/IRCConfig.interface'
import * as dotenv from 'dotenv'

dotenv.config()

function getEnvVariable(key: string, defaultValue?: string): string {
    const value = process.env[key] ?? defaultValue
    if(value === undefined) {
        console.error(`Missing enviroment variable: ${key}`)
        throw new Error(`Missing enviroment variable: ${key}`)
    }
    return value
}

const IRCConfig: IRCConfigInterface = {
    server: process.env.SERVER ?? 'irc.ppy.sh',
    username: getEnvVariable('OSU_USERNAME') ?? '',
    password: getEnvVariable('IRC_OSU_PASSWORD') ?? ''
}

export default IRCConfig