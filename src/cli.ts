#!/usr/bin/env node

import VersionCommand from './cli-command/version-command.js';
import HelpCommand from './cli-command/help-command.js';
import ImportCommand from './cli-command/import-command.js';
import GenerateCommand from './cli-command/generate-command.js';
import CLIApplication from './app/cli-application.js';

const app = new CLIApplication();
app.registerCommands([
  new HelpCommand, new VersionCommand,
  new ImportCommand, new GenerateCommand
]);
console.log(process.argv);
app.processCommand(process.argv);
