exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = args[0]
    if (!mention)
        return msg.channel.send(":warning: You must answer me a question!")
    var myArray = [`yes`,`no`,`maybe`,`try again another time`,`not sure`,`I'm sure`,`for sure!`,`nope`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`${msg.author} my answer is __**${rand}**__.`)
}

exports.help = {
    name: '8ball',
    description: 'Let the wise 8ball answer your yes/no question, the answers might be stunning!',
    usage: '8ball [question]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};

