exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    var myArray = [`https://thumbs.gfycat.com/SomberUnderstatedAnophelesmosquito-size_restricted.gif`,`https://media1.tenor.com/images/fc0ef2ba03d82af0cbd6c5815c3c83d5/tenor.gif?itemid=12141725`,`https://i.kym-cdn.com/photos/images/newsfeed/000/984/223/3cf`,`https://i.kym-cdn.com/photos/images/newsfeed/001/334/768/fbc.gif`,`https://thumbs.gfycat.com/RegularPoorAmericanrobin-small.gif`,`https://i.pinimg.com/originals/f9/a5/a1/f9a5a1837519a0a02feb4e4e0d93deae.gif`,`https://i.imgur.com/8QxoxzZ.gif?noredirect`,`https://img1.ak.crunchyroll.com/i/spire1/92b3653029e9196cfbedfd6a5ff3dc881488421004_full.gif`,`https://i.kym-cdn.com/photos/images/original/000/817/864/939.gif`,`http://fanaru.com/air/image/93441-air-misuzu-and-yukito-lick-gif-air.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`UwU ${msg.author} is licking ${mention}  `, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'lick',
    description: 'lick someone!',
    usage: 'lick [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};