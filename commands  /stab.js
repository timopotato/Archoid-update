exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to stab!")
    var myArray = [`https://media1.tenor.com/images/4e311138cf815bbf46ecc4f1808c82c8/tenor.gif?itemid=5381666`,`http://pa1.narvii.com/6151/6ec2ad897c43e0064642df3e74e75e568dbe2cc5_00.gif`,`https://66.media.tumblr.com/1b4511963e7c48d45b9bb89dd09e0f94/tumblr_nyw8llTOfG1qe1i57o1_500.gif`,`https://i.makeagif.com/media/6-14-2015/EYrEKy.gif`,`https://66.media.tumblr.com/618ec7e3aba1992522cd8fd308f19b49/tumblr_nyw8llTOfG1qe1i57o4_r1_500.gif`,`https://66.media.tumblr.com/dbce41fed8499d4fa08a0fa810f4ff9c/tumblr_npjzznePhM1tmbw34o2_500.gif`,`https://media.giphy.com/media/zbVuat3JlInNS/giphy.gif`,`https://pa1.narvii.com/6486/e0ebcbf7bfa31ea7569cba18d23ddc54a8636413_hq.gif`,`https://pa1.narvii.com/6486/a2967e90eb777d140f1eb0ff97166e6dff8c8919_hq.gif`,`https://gifimage.net/wp-content/uploads/2017/09/anime-stab-gif-3.gif`]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`Damn ${msg.author} stabbed ${mention} `, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'stab',
    description: 'stab someone!',
    usage: 'stab [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};