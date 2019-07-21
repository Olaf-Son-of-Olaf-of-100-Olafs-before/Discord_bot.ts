import * as Discord from 'discord.js';
import * as Configfile from './config'
import { IBotCommands } from './api';

const client: Discord.Client = new Discord.Client();

let commands: IBotCommands[];

loadCommands(`${__dirname}/commands`)

client.on('Ready', () => {

    //lets us know that the bot is on 
    console.log('ready to go ');
})

client.on('message', msg =>{

    //ignore if message is from the bot
    if(msg.author.bot) {return; }

    //ignore messages that don't start with the prefix
    if (!msg.content.startsWith(Configfile.config.prefix)) { return; }

    //handle the command
    handleCommand(msg)
})

async function  handleCommand(msg: Discord.Message){

    //Split string into the command and all of the args
    let command = msg.content.split("")[0].replace(Configfile.config.prefix, "")
    let args = msg.content.split("").slice(1);

    //loop through all of your cmds
    for(const commandClass of commands){

        //Attempt to excute code but ready incase of an error
        try{
            //check if our command class is the right one 
            if(!commandClass.isThisCommand(command)){
                // go to the next iteration of the loop if this isn't the correct command class
                continue;
            }
            //pause execution willst we run the command's code
            await commandClass.runCommand(args,msg,client);
        }
        catch(exception) {

            //if there is an error, than log the exception
            console.log(exception);
        }
    }
}

function loadCommands(commandsPath: string){

    //exit if there is no commands
    if(!Configfile.config || (Configfile.config.commands as string[]).length === 0) {return; }

    //loop through all of the commands in our configfile
    for (const commandName of Configfile.config.commands as string[]){

        const commandsClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandsClass() as IBotCommands;

        commands.push(command);
    }
}

client.login(Configfile.config.token);