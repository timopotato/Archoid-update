exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to kill!")
    var myArray = [`https://66.media.tumblr.com/20ee651f701aa4facb3a79089e46c5ec/tumblr_msti05qu8J1qd70o6o3_500.gif`,`https://media0.giphy.com/media/ZWjz534ezT1YY/giphy.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`Yikes ${msg.author} killed ${mention} `, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'kil',
    description: 'kill someone!',
    usage: 'kill [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};