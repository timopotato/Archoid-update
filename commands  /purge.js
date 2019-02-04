exports.run = async (bot, msg, args) => {
    if(msg.author.id !== bot.config.ownerID) return;
    bot.guilds.forEach(g => {
        if (g.memberCount < 5)
            g.leave();
    })
msg.channel.send(":white_check_mark: Done. Left all servers with less than 5 members.")
}

exports.help = {
    name: 'purge',
    description: "Let the bot leave all servers with less than 5 members.",
    usage: 'purge',
    category: 'Developer',
    mPerm: 'Developer',
    bPerm: 'None'
};