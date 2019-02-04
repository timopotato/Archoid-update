exports.run = (bot, msg, args) => {
  if(msg.author.id !== bot.config.ownerID) return;
    if(!args || args.size < 1) return msg.channel.send(":warning: you must provide a command name to reload.");
    const commandName = args[0];
    // Check if the command exists and is valid
    if(!bot.commands.has(commandName)) {
      return msg.channel.send(":warning: That command does not exist!");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the bot.commands Enmap
    bot.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    bot.commands.set(commandName, props);
    msg.channel.send(`:white_check_mark: Done. Reloaded ${commandName}!`);
  };

  exports.help = {
    name: 'reload',
    description: "Reload a specific command.",
    usage: 'reload [command name]',
    category: 'Developer',
    mPerm: 'Developer',
    bPerm: 'None'
};