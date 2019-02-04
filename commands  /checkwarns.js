exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const member = msg.mentions.members.first();
    if (!member)
        return msg.channel.send(":warning: You must mention a user to check the warns of!")

        const amount = bot.warnedUserId.get(`${member.id}-${msg.guild.id}`)
        msg.channel.send(`${member} has ${amount} warns.`)
}
  

exports.help = {
    name: 'checkwarns',
    description: 'Check the amount of warns a user has.',
    usage: 'checkwarns [mention]',
    category: 'Moderator',
    mPerm: 'None',
    bPerm: 'Send Messages'
};

