exports.run = (bot, msg, args) => {
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    if (msg.member.hasPermission('BAN_MEMBERS')|| msg.author.id === bot.config.ownerID) {
      let id = args[0];
      let reason = args.slice(1).join(" ");
      if (!reason)
        reason = "None specified";
      if (!id) return msg.channel.send(`:warning: please provide an ID.`);
      if (id.length !== 18 || isNaN(id)) return msg.channel.send(":warning: please provide a valid ID.");
      if (msg.guild.members.get(id)) return msg.channel.send(":warning: this user is in the server, use ban instead!");
      if (id === msg.author.id) return msg.channel.send(":warning: you cannot hackban yourself!");
      msg.guild.ban(id, `Hackban command executed by ${msg.author.tag}`).catch((e) => {
        return msg.channel.send(`An error (\`\`${e.message}\`\`) has occurred.`);
      });
      guildConfig.amtmodlogs += 1;
      bot.guildSettings.set(msg.guild.id, guildConfig);
      let amountmodlogs = guildConfig.amtmodlogs;
      if (guildConfig.modlog !== "none") { // if the user has set their own mod log
        const embed = new Discord.RichEmbed()
          .setTitle(`Action Log #${amountmodlogs}`)
          .setThumbnail(bot.user.avatarURL)
          .setColor('RED')
          .addField(`User`, `<@${id}> (ID: ${id}) was hackbanned`)
          .addField("Author", `<@${msg.author.id}> (ID: ${msg.author.id})`, true)
          .addField("Reason", `${reason}`)
          .setTimestamp()
        bot.channels.get(guildConfig.modlog).send({ embed });
        msg.channel.send(`:white_check_mark: Done. Hackbanned <@${id}>!`);
      } else {
        return msg.channel.send(`:white_check_mark: Done. Hackbanned <@${member}>!`);
      }
    } else {
      msg.channel.send(":warning: you do not have the `BAN_MEMBERS` permission")
    }
  }

  exports.help = {
    name: 'hackban',
    description: "Bans a user by their ID.",
    usage: 'hackban [ID] <reason>',
    category: 'Moderation',
    mPerm: 'Ban Members',
    bPerm: 'Ban Members'
};