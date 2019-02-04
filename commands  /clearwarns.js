exports.run = async (bot, msg, args) => {
    if (msg.member.hasPermission("KICK_MEMBERS") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
        const Discord = require("discord.js");
        const member = msg.mentions.members.first();
        if (!member)
            return msg.channel.send(":warning: You must mention a user to clear the warns of!")

        bot.warnedUserId.set(`${member.id}-${msg.guild.id}`, 0)
        msg.channel.send(`:white_check_mark: Done. ${member} now has 0 warns.`)
    } else {
msg.channel.send(":warning: You do not have `KICK_MEMBERS` permission.")
    }
}

exports.help = {
    name: 'checkwarns',
    description: 'Check the amount of warns a user has.',
    usage: 'checkwarns [mention]',
    category: 'Moderator',
    mPerm: 'Kick Members',
    bPerm: 'Send Messages'
};

