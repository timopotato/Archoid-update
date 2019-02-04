exports.run = (bot, msg, args) => {
  const Discord = require("discord.js");
  const guildConfig = bot.guildSettings.get(msg.guild.id);
  let prefix = guildConfig.prefix;
  if (msg.member.hasPermission('MANAGE_GUILD') || msg.author.id === bot.config.ownerID) {
    if (args[0] === undefined) {
      msg.channel.send(`The current prefix for this server is: ${prefix}`)
    }
    if (args[0] === "set") {
      let prefix2 = args[1]; // we want the first channel.
      guildConfig.prefix = prefix2; // We're setting the guild config's mod log variable as the ID of the channel that was received.
      bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
      msg.channel.send(`:white_check_mark: Done. Prefix set to: ${guildConfig.prefix}`);
    }
  } else {
    return msg.channel.send(":warning: You do not have the `MANAGE_SERVER` permission!")
  }
}

exports.help = {
  name: 'prefix',
  description: "Change the bot's prefix for the server.",
  usage: 'prefix set [new prefix]',
  category: 'Custom',
  mPerm: 'Manage Server',
  bPerm: 'Send Messages'
};