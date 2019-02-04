exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to hug!")
    var myArray = [`https://media1.tenor.com/images/49a21e182fcdfb3e96cc9d9421f8ee3f/tenor.gif?itemid=3532079`,`https://i.gifer.com/Zi8A.gif`,`https://www.gifimage.net/wp-content/uploads/2018/11/cute-anime-girl-hug-gif-5.gif`,`https://gifimage.net/wp-content/uploads/2018/11/cute-anime-girl-hug-gif-2.gif`,`https://image.myanimelist.net/ui/TU3UONio1SzFvgIIB7hquc1pMINF4e9QM6TQ-qmccp_wTi2MgAgIQKYl2D8ugusgc9zynhhpBP-UvcCFZRftywhaRUfNML5SDQN5u6vtWsoImCTqs0n-eAEP6y7LKV9r`,`https://i.pinimg.com/originals/f9/e9/34/f9e934cddfd6fefe0079ab559ef32ab4.gif`,`https://media1.tenor.com/images/d0c2e7382742f1faf8fcb44db268615f/tenor.gif?itemid=5853736`,`http://31.media.tumblr.com/9204649fd84d3df7223feb6712a89444/tumblr_n8pc8badUs1sg0ygjo1_250.gif`,`https://media1.tenor.com/images/234d471b1068bc25d435c607224454c9/tenor.gif?itemid=3532081`,`https://thumbs.gfycat.com/AgreeableAnchoredCentipede-small.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`Awh ${msg.author} hugged ${mention}`, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'hug',
    description: 'Hug someone!',
    usage: 'hug [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};
