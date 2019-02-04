exports.run = (bot, msg, args) => {
  const Discord = require("discord.js");
  const guildConfig = bot.guildSettings.get(msg.guild.id);
  let channel = guildConfig.modlog;
  let channe2;
  if (channel === "none") {
    channel2 = "none"
  } else
    channel2 = `<#${guildConfig.modlog}>`
  if (msg.member.hasPermission('MANAGE_GUILD') || msg.author.id === bot.config.ownerID) {
    if (args[0] === undefined) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Actionlog`)
        .setDescription("The action log for this server")
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor('#FFFF00')
        .addField("Channel:", channel2)
        .addField("Number of logs", `${guildConfig.amtmodlogs}`)
        .setFooter("Do =help to see the a list of all commands!")
        .setTimestamp()
      msg.channel.send({ embed });
    }
    if (args[0] === "set") {
      let log = msg.mentions.channels.first(); // we want the first channel.
      if (!log.type === "text") return msg.channel.send(":warning: You can only set action log on a text channel!");
      if (!log) return msg.channel.send(":warning: You must mention a channel to set!")
      guildConfig.modlog = log.id; // We're setting the guild config's mod log variable as the ID of the channel that was received.
      bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
      msg.channel.send(`:white_check_mark: Done. Action log set to: <#${guildConfig.modlog}>!`);
    }
    if (args[0] === "remove") {
      guildConfig.modlog = "none";
      bot.guildSettings.set(msg.guild.id, guildConfig);
      msg.channel.send(`:white_check_mark: Done. Removed action log!`);
    }

  } else {
    return msg.channel.send(":warning: You do not have the `MANAGE_SERVER` permission!")
  }
}

exports.help = {
  name: 'actionlog',
  description: 'Logs moderation commands in a given channel, logs are sorted with colors and counted.',
  usage: 'actionlog set [channel mention]',
  category: 'Moderation',
  mPerm: 'Manage Server',
  bPerm: 'Send Embeds and Send Messages'
};