exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to punch!")
    var myArray = [`https://media.tenor.com/images/b561ad7377142adf365fe33f20fa45e8/tenor.gif`,`https://media.giphy.com/media/iWAqMe8hBWKVq/giphy-downsized-large.gif`,`https://thumbs.gfycat.com/IllinformedRipeFlounder-small.gif`,`https://i.pinimg.com/originals/bc/96/17/bc9617a2460e4640fcd9cf474bea2c10.gif`,`https://i.imgur.com/BhvWwuS.gif`,`https://i.imgur.com/g91XPGA.gif`,`https://pa1.narvii.com/5729/946109e0dcb923a32460000c14dccbe2d2759666_hq.gif`,`https://media1.tenor.com/images/313bb02914ddb9262511b790ef4d4c7b/tenor.gif?itemid=7922535`,`http://pa1.narvii.com/6084/b9e77789372932de97e5cf1bd046a348fd7ca080_hq.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`Oof ${msg.author} punched ${mention}`, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'punch',
    description: 'punch someone!',
    usage: 'punch [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};