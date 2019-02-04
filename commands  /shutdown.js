exports.run = (bot, msg, args) => {
    if (msg.author.id === bot.config.ownerID) {
        msg.channel.send("Shutting down...").then(msg => process.exit(1));
    } else {
        return msg.channel.send(":warning: You are not allowed to use this command!")
    }
}

exports.help = {
    name: 'shutdown',
    description: "Shut down the bot.",
    usage: 'shutdown',
    category: 'Developer',
    mPerm: 'Developer',
    bPerm: 'None'
};