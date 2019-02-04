exports.run = (bot, msg, args) => {
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    if (msg.member.hasPermission('KICK_MEMBERS')|| msg.author.id === bot.config.ownerID) {
        const member = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!member)
            return msg.channel.send(":warning: You must mention someone to warn!")
        if (!reason)
            reason = "none";
        if (!bot.warnedUserId.get(`${member.id}-${msg.guild.id}`)) {
            bot.warnedUserId.set(`${member.id}-${msg.guild.id}`, 1)
        } else {
            const newWarn = parseInt(bot.warnedUserId.get(`${member.id}-${msg.guild.id}`)) + parseInt(1);
            bot.warnedUserId.set(`${member.id}-${msg.guild.id}`, newWarn)
        }
        msg.channel.send(`:white_check_mark: Done. ${member} has been warned succesfully! (User now has ` + bot.warnedUserId.get(`${member.id}-${msg.guild.id}`) + ` warns)`)
        if (guildConfig.warnLimit === String(bot.warnedUserId.get(`${member.id}-${msg.guild.id}`))) {
            if (guildConfig.warnPunishment === "kick") {
                member.kick("kicked for hitting warn limit")
                msg.channel.send(`${member} has been kicked for hitting warn limit!`)
                bot.warnedUserId.set(`${member.id}-${msg.guild.id}`, 0)
            }
            if (guildConfig.warnPunishment === "ban") {
                member.ban("banned for hitting warn limit")
                msg.channel.send(`${member} has been banned for hitting warn limit!`)
                bot.warnedUserId.set(`${member.id}-${msg.guild.id}`, 0)
            }
            if (guildConfig.warnPunishment === "mute") {
                const time = guildConfig.warnMuteTime * 60 * 1000;
                bot.mutedGuildPeople.set(member.id, msg.guild.id)
                bot.mutedPeople.set(member.id, time);
                const role = msg.guild.roles.find("name", "ArchoidMuted");
                bot.warnedUserId.set(`${member.id}-${msg.guild.id}`, 0)
                if(!role) return;
                member.addRole(role, `Mute command has been used by ${msg.author.tag}`)
                msg.channel.send(`${member} has been muted for hitting warn limit! (${guildConfig.warnMuteTime} minute mute)`)
            }
        }
        guildConfig.amtmodlogs += 1;
        bot.guildSettings.set(msg.guild.id, guildConfig);
        let amountmodlogs = guildConfig.amtmodlogs;
        if (guildConfig.modlog !== "none") { // if the user has set their own mod log
          const embed = new Discord.RichEmbed()
            .setTitle(`Action Log #${amountmodlogs}`)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor('RED')
            .addField(`User`, `<@${member.id}> (ID: ${member.id}) was warned`)
            .addField(`Author`, `${msg.author} (ID: ${msg.author.id})`)
            .addField("Reason", `${reason}`)
            .setTimestamp()
          bot.channels.get(guildConfig.modlog).send({ embed });
        } else {
        }
    } else {
        return msg.channel.send(":warning: You don't have the `KICK_MEMBERS` permission.")
    }
}

exports.help = {
    name: 'warn',
    description: "Warn a user.",
    usage: 'warn [mention] <reason>',
    category: 'Moderation',
    mPerm: 'Kick Members',
    bPerm: 'Send Messages'
};