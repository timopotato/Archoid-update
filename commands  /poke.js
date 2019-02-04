exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to poke!")
    var myArray = [`https://media.giphy.com/media/pWd3gD577gOqs/giphy.gif`,`https://i.pinimg.com/originals/b4/95/fb/b495fb19f4b9a1b04f48297b676c497b.gif`,`https://media1.tenor.com/images/ab936c887562756472f83850426bf6ef/tenor.gif?itemid=11956062`,`https://media1.giphy.com/media/hdt32CBL7MsOA/source.gif`,`https://i.gifer.com/8xtR.gif`,`https://gifimage.net/wp-content/uploads/2017/09/anime-poke-gif-6.gif`,`https://i.pinimg.com/originals/5a/d9/81/5ad981608daa351a3471ef75a71b285f.gif`,`https://media1.tenor.com/images/48086974f33a3e0114b2e0387f812ae4/tenor.gif?itemid=12360399`,`https://78.media.tumblr.com/b894bd9b8c8ce641a900a2c346b8f348/tumblr_nytqsn7FTA1v0gtm0o1_500.gif`,`https://pa1.narvii.com/5679/d39dc10bcad2fd42a130de685d192c166d55f69a_hq.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`Owo ${msg.author} poked ${mention}`, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'poke',
    description: 'poke someone!',
    usage: 'poke [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};