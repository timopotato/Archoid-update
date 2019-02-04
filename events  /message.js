module.exports = (client, message) => {
  const guildConfig = client.guildSettings.get(message.guild.id);
  if (message.author.bot) return;
  if (message.content.indexOf(guildConfig.prefix) !== 0) return;
  const args = message.content.slice(guildConfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  if(client.blacklist.get(message.author.id)) return message.channel.send(":warning: You are blacklisted!");
  if(String(client.disabledCommands.get(command)) === "Yes") return message.channel.send(":warning: This command as been disabled by the developer.")
  if (message.author.id !== "310853886191599616") {
    client.talkedRecently.add(message.author.id);
    setTimeout(() => {
      client.talkedRecently.delete(message.author.id);
    }, 2000);
  }
  cmd.run(client, message, args);
};