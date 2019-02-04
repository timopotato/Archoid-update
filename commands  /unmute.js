exports.run = (bot, msg, args) => {
  if (msg.member.hasPermission('KICK_MEMBERS')|| msg.author.id === bot.config.ownerID) {
    const role = msg.guild.roles.find("name", "ArchoidMuted");
    let member = msg.mentions.members.first();
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    const Discord = require("discord.js");
    let reason = args.slice(1).join(" ");
    if (!member)
      return msg.channel.send(":warning: You must mention someone of this server!")
    if (!reason)
      reason = "None specified";
    if (!member.roles.some(r => ["ArchoidMuted", "ArchoidMuted", "ArchoidMuted", "ArchoidMuted"].includes(r.name)))
      return msg.channel.send(":warning: That user is not muted!");
    if (member === msg.author)
      return msg.channel.send(":warning: You cannot unmute yourself!");
    member.removeRole(role, `Unmute command has been used by ${msg.author.tag}`)
    guildConfig.amtmodlogs + 1;
    bot.guildSettings.set(msg.guild.id, guildConfig);
    let amountmodlogs = guildConfig.amtmodlogs;
    if (guildConfig.modlog !== "none") { // if the user has set their own mod log
      const embed = new Discord.RichEmbed()
        .setTitle(`Action Log #${amountmodlogs}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setColor('GREEN')
        .addField(`User:`, `<@${member.id}> was unmuted`)
        .addField("Author", `<@${msg.author.id}>`, true)
        .addField("Reason", `${reason}`)
        .setTimestamp()
      bot.channels.get(guildConfig.modlog).send({ embed });
      msg.channel.send(`:white_check_mark: Done. Unmuted ${member}!`);
      bot.mutedPeople.delete(member.id);
      bot.mutedGuildPeople.delete(member.id);
    } else {
      msg.channel.send(`:white_check_mark: Done. Unmuted ${member}!`);
      bot.mutedPeople.delete(member.id);
      return bot.mutedGuildPeople.delete(member.id);
    }
  } else {
    return msg.channel.send(":warning: You do not have the ``KICK_MEMBERS`` permission!");
  }
}

exports.help = {
  name: 'unmute',
  description: "Unmute a user.",
  usage: 'unmute [mention] <reason>',
  category: 'Moderation',
  mPerm: 'Kick Members',
  bPerm: 'Manage Roles'
};