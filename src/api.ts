import * as Discord from 'discord.js'

export interface IBotCommands{
    help(): string;
    isThisCommand(command: string): boolean;
    runCommand(args: string[], msgobject: Discord.Message, client: Discord.Client): void;
    
}