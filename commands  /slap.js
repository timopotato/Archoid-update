exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to slap!")
    var myArray = [`https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif`,`https://i.imgur.com/o2SJYUS.gif`,`https://i.pinimg.com/originals/fc/e1/2d/fce12d3716f05d56549cc5e05eed5a50.gif`,`https://i.gifer.com/X35r.gif`,`http://33.media.tumblr.com/4a58a89eaaea25571fcc03d3788b1e55/tumblr_nel3qwSzqw1tblzm8o1_500.gif`,`https://gifimage.net/wp-content/uploads/2017/07/anime-slap-gif-14.gif`,`https://gifimage.net/wp-content/uploads/2017/07/anime-slap-gif-9.gif`,`https://media1.tenor.com/images/a0ff9e6e3f65b921d63dfffeec0b94a0/tenor.gif?itemid=7202047`,`https://media1.tenor.com/images/85722c3e51d390e11a0493696f32fb69/tenor.gif?itemid=5463215`,`https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif?itemid=10426943`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`Ouch ${msg.author} slapped ${mention} `, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'slap',
    description: 'slap someone!',
    usage: 'slap [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};
