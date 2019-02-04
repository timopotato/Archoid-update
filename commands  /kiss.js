exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to kiss!")
    var myArray = [`https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865`, `https://media.tenor.com/images/12b26e30f1d526db62847bede9bbd414/tenor.gif`, `https://66.media.tumblr.com/c521d91fbe1f038c27617495a2df9a27/tumblr_obgsqqEBMu1va65hbo2_500.gif`, `https://i.pinimg.com/originals/56/0b/b3/560bb37b1596f48d93a76db4f87dc2f9.gif`, `https://media.giphy.com/media/JYpVJEcNrDAWc/giphy.gif`, `https://i.imgur.com/NkfsJV7.gif`, `http://31.media.tumblr.com/ea7842aad07c00b098397bf4d00723c6/tumblr_n570yg0ZIv1rikkvpo1_500.gif`, `https://media.tenor.com/images/197df534507bd229ba790e8e1b5f63dc/tenor.gif`, `https://i1.wp.com/loveisaname.com/wp-content/uploads/2016/09/23.gif`, `https://i.imgur.com/eisk88U.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`UwU ${msg.author} kissed ${mention}`, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'kiss',
    description: 'Kiss someone!',
    usage: 'kiss [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};
