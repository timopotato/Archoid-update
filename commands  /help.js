exports.run = (bot, msg, params) => {
  const Discord = require("discord.js");
  const guildConfig = bot.guildSettings.get(msg.guild.id);
  if (!params[0]) {
    const embed = new Discord.RichEmbed()
      .setTitle(`Archoid help`)
      .setThumbnail(bot.user.avatarURL)
      .setDescription(`All commands have been sorted into categories.\n do **${guildConfig.prefix}help [command name]** to get detailed help and information about said command.`)
      .setColor('#ffff00')
      .addField(`Moderation`, "`kick`, `ban`, `hackban`, `unban`, `clear`, `mute`, `unmute`, `warn`, `clearwarns`, `setwarns`, `resetnick`, `rename`, `checkwarns`")
      .addField(`Information`, "`info server`, `info user`, `info bot`, `info channel`, `info role`, `avatar`, `perms`, `membercount`")
      .addField(`Amusement`, "`translate`, `urban`, `feedme`, `kiss`, `hug`, `slap`, `kill`, `highfive`, `punch`, `pat`, `pout`, `stab`, `tease`, `smile`, `lick`, `lewd`, `poke`, `8ball`")
      .addField(`Misc`, "`ping`, `uptime`, `status`, `contact`")
      .addField(`Rolemanagement`, "`addrole`, `removerole`, `colorrole`, `moverole`, `mentionrole`, `createrole`, `deleterole`")
      .addField(`Custom`, "`prefix`, `welcmessage`, `byemessage`")
      .addField(`Logging`, "`actionlog`, `joinleavelog`, `serverlog`")
      .setFooter(`Command used by ${msg.author.tag}`)
      .setTimestamp()
    msg.channel.send({ embed });
  } else {
  let command = params[0];
  if (bot.commands.has(command)) {
    command = bot.commands.get(command);
    const embed = new Discord.RichEmbed()
      .setTitle(`Help for command ${command.help.name}`)
      .setThumbnail(bot.user.avatarURL)
      .setColor('#ffff00')
      .addField(`Description`, `${command.help.description}`)
      .addField("Usage", `${guildConfig.prefix}${command.help.usage}`)
      .addField("Category", `${command.help.category}`)
      .addField("Required Member Permission", `${command.help.mPerm}`)
      .addField("Required Bot Permission", `${command.help.bPerm}`)
      .setTimestamp()
    msg.channel.send({ embed });
  }
}
};


exports.help = {
  name: 'help',
  description: 'Get information about every command, see how to use them and what they do.',
  usage: 'help [command]',
  category: 'Misc',
  mPerm: 'None',
  bPerm: 'Send Messages and Send Embeds'
};