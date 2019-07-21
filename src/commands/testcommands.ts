import * as Discord from 'discord.js'
import { IBotCommands} from "../api"

export default class testCommand implements IBotCommands{

    private readonly _command = "testcmd"

    help(): string {
        return "this cmd does nothing:)";
    }  

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    runCommand(args: string[], msgobject: Discord.Message, client: Discord.Client): void {

        //let us know if it all worked well
        msgobject.channel.send("It works")
    }
}