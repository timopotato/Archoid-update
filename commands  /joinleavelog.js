exports.run = (bot, msg, args) => {
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    let channel = guildConfig.joinLeaveLog;
    if (channel === "449552716377882624") {
      channel = "none"
    }else 
    channel = `<#${guildConfig.joinLeaveLog}>`
    if (msg.member.hasPermission('MANAGE_GUILD') || msg.author.id === bot.config.ownerID) {
      if (args[0] === undefined) {
        const embed = new Discord.RichEmbed()
          .setTitle(`Join and Leave log`)
          .setDescription("Log joins and leaves of users")
          .setThumbnail(bot.user.displayAvatarURL)
          .setColor('#FFFF00')
          .addField("Channel:", `${channel}`)
          .addField("Number of logs", `${guildConfig.JoinLeaveNumber}`)
          .setFooter("Do =help to see the a list of all commands!")
          .setTimestamp()
        msg.channel.send({ embed });
      }
      if (args[0] === "set") {
        let log = msg.mentions.channels.first(); // we want the first channel.
        if (!log.type === "text") return msg.channel.send(":warning: You can only set join leave log on a text channel");
        guildConfig.joinLeaveLog = log.id; // We're setting the guild config's mod log variable as the ID of the channel that was received.
        bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
        msg.channel.send(`:white_check_mark: Done. join leave log set to: <#${guildConfig.joinLeaveLog}>!`);
      }
      if (args[0] === "remove") {
        guildConfig.joinLeaveLog = "449552716377882624";
        guildConfig.JoinLeaveNumber = 0;
        bot.guildSettings.set(msg.guild.id, guildConfig);
        msg.channel.send(`:white_check_mark: Done. Removed join leave log!`);
      }
  
    } else {
      return msg.channel.send(":warning: You do not have the `MANAGE_SERVER` permission!")
    }
  }

  exports.help = {
    name: 'joinleavelog',
    description: "Log when a user joins or leaves the server.",
    usage: 'joinleavelog set [channel mention]',
    category: 'Custom',
    mPerm: 'Manage Server',
    bPerm: 'Send Messages and Send Embeds'
};