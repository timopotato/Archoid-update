exports.run = async (bot, msg, args) => {

    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    if (msg.member.hasPermission('BAN_MEMBERS')|| msg.author.id === bot.config.ownerID) {
        let member = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!reason)
            reason = "None specified";
        if (!member)
            return msg.channel.send(":warning: You must mention someone of this server to ban!");
        let authorHighestRole = msg.member.highestRole.position;
        let memberhighestrole = member.highestRole.position;
        if (memberhighestrole >= authorHighestRole)
            return msg.channel.send(":warning: That user has the same or an higher role than you!");
        await member.ban(`ban command has been used by ${msg.author.tag}`);
        guildConfig.amtmodlogs += 1;
        bot.guildSettings.set(msg.guild.id, guildConfig);
        let amountmodlogs = guildConfig.amtmodlogs;
        if (guildConfig.modlog !== "none") { // if the user has set their own mod log
            const embed = new Discord.RichEmbed()
                .setTitle(`Action Log #${amountmodlogs}`)
                .setThumbnail(member.user.displayAvatarURL)
                .setColor('RED')
                .addField(`User`, `<@${member.id}> (ID: ${member.id}) was banned`)
                .addField(`Author`, `${msg.author} (ID: ${msg.author.id})`)
                .addField("Reason", `${reason}`)
                .setTimestamp()
            bot.channels.get(guildConfig.modlog).send({ embed });
            msg.channel.send(`:white_check_mark: Done. banned ${member}!`);
        } else {
            return msg.channel.send(`:white_check_mark: Done. banned ${member}!`);
        }
    } else {
        msg.channel.send(":warning: You do not have the \`BAN_MEMBERS\` permission!")
    }
}

exports.help = {
    name: 'ban',
    description: 'Bans a member from the server. The user is not able to join back with a new unvite untill they are unbanned.',
    usage: 'ban [mention] <reason>',
    category: 'Moderation',
    mPerm: 'Ban Members',
    bPerm: 'Ban Members'
};

