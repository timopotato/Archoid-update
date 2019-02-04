exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to highfive!")
    var myArray = [`https://media.giphy.com/media/KNGlioVGvwBXO/giphy.gif`,`https://i.kym-cdn.com/photos/images/original/001/126/190/908.gif`,`https://1.bp.blogspot.com/-zCYOY8ef-Ro/WfUW-iO8Y5I/AAAAAAAA-MM/uQYRw57PmYM_pjl8kJQDAs1EKLB_-2CKgCKgBGAs/s1600/Omake+Gif+Anime+-+Love+Live%2521+Sunshine%2521%2521+S2+-+Episode+4+-+Yoshiko+Mari+High+Five.gif`,`https://media1.tenor.com/images/9730876547cb3939388cf79b8a641da9/tenor.gif?itemid=8073516`,`https://media1.tenor.com/images/7eae364f9edbf7b59f9ccafd21467e6a/tenor.gif?itemid=12649431`,`https://media.giphy.com/media/cAiBXaCjbHTry/giphy.gif`,`https://i.gifer.com/B0aW.gif`,`http://78.media.tumblr.com/3a2d7cd3b20fd4dd56e9fb04b9edc741/tumblr_inline_o20dpuFrog1ts9jt2_500.gif`,`https://pa1.narvii.com/5696/a162f33dff8185278c495a7eb541e7aac3d7e91a_hq.gif`,`https://bakphoontyphoon.files.wordpress.com/2016/02/fangirl-high-five.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`ayyy ${msg.author} high-fived ${mention}`, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'highfive',
    description: 'highfive someone!',
    usage: 'highfive [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};