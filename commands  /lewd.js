exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    var myArray = [`https://media.giphy.com/media/ndYAqx8RKKUIE/giphy.gif`,`https://media1.tenor.com/images/9862e3023816f54bc451ee1cfed2351f/tenor.gif?itemid=5453531`,`https://media.giphy.com/media/xnmArcgSzKbo4/giphy.gif`,`https://i.imgur.com/XDIZmMQ.gif`,`https://i.kym-cdn.com/photos/images/newsfeed/001/047/160/0f2.gif`,`https://i.gifer.com/2MlA.gif`,`https://i.kym-cdn.com/photos/images/newsfeed/001/047/158/31a.gif`,`https://pa1.narvii.com/6135/f5ca66cf456cb85d1973edde77cedd415b3d20c4_hq.gif`,`http://images6.fanpop.com/image/photos/39300000/GIFs-charlotte-anime-39361278-500-281.gif`,`https://data.whicdn.com/images/297388743/original.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`lewwwwd`, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'lewd',
    description: 'Be lewd!!',
    usage: 'lewd',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};