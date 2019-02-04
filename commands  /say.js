exports.run = (bot, msg, args) => {
    if (msg.author.id === bot.config.ownerID) {
        const saymsg = args.join(" ");
        msg.delete().catch(O_o => { });
        msg.channel.send(saymsg);
    } else {
        msg.channel.send(":warning: You are not allowed to use this command!")
    }
}

exports.help = {
    name: 'say',
    description: "Let the bot say something!",
    usage: 'say [text]',
    category: 'Developer',
    mPerm: 'Developer',
    bPerm: 'Send Messages'
};