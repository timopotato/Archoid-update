exports.run = async (bot, msg, args) => {

  const Discord = require("discord.js");
  const guildConfig = bot.guildSettings.get(msg.guild.id);
  if (msg.member.hasPermission('KICK_MEMBERS')|| msg.author.id === bot.config.ownerID) {
    let member = msg.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason)
      reason = "None specified";
    if (!member)
      return msg.channel.send(":warning: You must mention someone of this server!");
    let authorHighestRole = msg.member.highestRole.position;
    let memberhighestrole = member.highestRole.position;
    if (memberhighestrole >= authorHighestRole)
      return msg.channel.send(":warning: That user has the same or an higher role than you!");
    if (!member.kickable)
      return msg.channel.send(":warning: This user has an higher role than me, so i cannot kick!");
    await member.kick(`kick command has been used by ${msg.author.tag}`);
    guildConfig.amtmodlogs += 1;
    bot.guildSettings.set(msg.guild.id, guildConfig);
    let amountmodlogs = guildConfig.amtmodlogs;
    if (guildConfig.modlog !== "none") { // if the user has set their own mod log
      const embed = new Discord.RichEmbed()
        .setTitle(`Action Log #${amountmodlogs}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setColor('RED')
        .addField(`User`, `<@${member.id}> (ID: ${member.id}) was kicked`)
        .addField(`Author`, `${msg.author} (ID: ${msg.author.id})`)
        .addField("Reason", `${reason}`)
        .setTimestamp()
      bot.channels.get(guildConfig.modlog).send({ embed });
      msg.channel.send(`:white_check_mark: Done. Kicked ${member}!`);
    } else {
      return msg.channel.send(`:white_check_mark: Done. Kicked ${member}!`);
    }
  } else {
    msg.channel.send(":warning: You do not have the \`KICK_MEMBERS\` permission!")
  }
}

exports.help = {
  name: 'kick',
  description: "Kicks a user from the server.",
  usage: 'kick [mention] <reason>',
  category: 'Moderation',
  mPerm: 'Kick Members',
  bPerm: 'Kick Members'
};