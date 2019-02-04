exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to pout!")
    var myArray = [`https://media.tenor.com/images/3e0c7be0cb8e24c389f5e1f78a8f69a5/tenor.gif`,`https://media1.tenor.com/images/58a26a738703565f7fc276aedabfcfb3/tenor.gif?itemid=5754157`,`http://i.imgur.com/A3vDoIJ.gif`,`https://66.media.tumblr.com/7dd785d8518634c401951e10e2d5a17d/tumblr_o2jjytAxIl1tydz8to1_400.gif`,`https://i.pinimg.com/originals/a0/c2/64/a0c264ad6b12b28d7c58871d7f5a999c.gif`,`http://38.media.tumblr.com/4018257a1a21e999cd1fdbcd67f38a1d/tumblr_nham95OVWg1rgfa0po1_500.gif`,`https://media1.tenor.com/images/d52117b1bbec0fa89baa8095e2c0fe87/tenor.gif?itemid=11686117`,`https://em.wattpad.com/be6e88dea740edf8d2eadde0d3c8f299ab55bb2b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f76444165554775636a4f6b5438513d3d2d3333373631313337322e313438616239393735386361373233633934383130353133373736382e676966?s=fit&w=720&h=720`,`https://thumbs.gfycat.com/IncredibleIncredibleFalcon-small.gif`,`https://media.tenor.com/images/e72b8fcd1a77ae12e69d21b6283d4823/tenor.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`Hmph ${msg.author} pouted ${mention}`, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'pout',
    description: 'pout someone!',
    usage: 'pout [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};