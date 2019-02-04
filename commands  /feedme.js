exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    var myArray = [`pizza! :pizza:`, `chocolate! :chocolate_bar:`, `fish! :fish:`, `cheese! :cheese:`, `apples! :apple:`, `banana! :banana:`, `watermelon! :watermelon:`];
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send("Here! Take some "+rand)
}

exports.help = {
    name: 'feedme',
    description: 'Let the bot food you.',
    usage: 'feedme',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};
