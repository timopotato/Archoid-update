exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to smile at!")
    var myArray = [`https://media1.tenor.com/images/8a549e6d7066bbc0aeb63d7c69a42c27/tenor.gif?itemid=4838963`,`https://media3.giphy.com/media/bqSkJ4IwNcoZG/giphy.gif`,`https://31.media.tumblr.com/tumblr_m8wm9nCUGf1rrftqho1_500.gif`,`https://media.giphy.com/media/11dhgqCcr4GKUE/giphy.gif`,`https://78.media.tumblr.com/3c3a2b92ea79473933c33c2f09ac85e1/tumblr_p86l9qlQj31s1xvydo1_500.gif`,`https://i.pinimg.com/originals/63/ca/58/63ca58fb23c0901176abf1787fa3bfce.gif`,`https://data.whicdn.com/images/61928038/original.gif`,`https://pa1.narvii.com/5750/8a6eac048884faee77ba8c1aa53afa58e8741b6e_hq.gif`,`https://media1.tenor.com/images/521c445476f3bef01ad17a98887c74f2/tenor.gif?itemid=5960659`,`https://media1.tenor.com/images/d5ecead1a4bdae8ac4ff996570c42344/tenor.gif?itemid=8620694`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`hehe ${msg.author} is smiling at ${mention} `, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'smile',
    description: 'smile someone!',
    usage: 'smile [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};