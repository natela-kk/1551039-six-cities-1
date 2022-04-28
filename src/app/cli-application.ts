import { CliCommandInterface } from '../cli-command/cli-command.interface.js';

type ParsedCommand = {
  [key: string]: string[]
}

export default class CLIApplication {
  private commands: {[propertyName: string]: CliCommandInterface} = {};
  private defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';
    console.log(cliArguments);
    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        console.log(parsedCommand);
        console.log(acc);
        console.log(item);
        console.log(acc[item]);
        acc[item] = [];
        console.log(acc);
        command = item;
      } else if (command && item) {
        acc[command].push(item);
        console.log(acc[command]);
      }

      return acc;
    }, parsedCommand);
  }

  public registerCommands(commandList: CliCommandInterface[]): void {
    this.commands = commandList.reduce((acc, Command) => {
      const cliCommand = Command;
      console.log('...');
      acc[cliCommand.name] = cliCommand;
      console.log(cliCommand);
      return acc;
    }, this.commands);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    console.log(command);
    console.log(parsedCommand[commandName]);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
