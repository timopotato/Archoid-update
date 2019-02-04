exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to pat!")
    var myArray = [`https://66.media.tumblr.com/ea0a3110ef50e46336f9a996eb416ece/tumblr_p2kzogLOZU1vajq0ro4_500.gif`,`https://archive-media-0.nyafuu.org/c/image/1483/55/1483553008493.gif`,`https://thumbs.gfycat.com/BlushingDeepBlacknorwegianelkhound-small.gif`,`https://66.media.tumblr.com/47c21c4b871b53bfd36d86a2ddcef615/tumblr_p9b11ijLuy1th206io1_500.gif`,`https://media.giphy.com/media/3oKGzArbV4zKpIzXaw/source.gif`,`https://thumbs.gfycat.com/MeaslyEqualIndianrockpython-size_restricted.gif`,`http://i.imgur.com/YdyLsTy.gif`,`https://i.imgur.com/pb0ODYa.gif`,`https://images.gr-assets.com/hostedimages/1424840652ra/13807874.gif`,`https://media.giphy.com/media/LDBiktECXdwXK/giphy.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`OwO ${msg.author} patted ${mention} `, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'pat',
    description: 'pat someone!',
    usage: 'pat [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};