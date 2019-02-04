exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const mention = msg.mentions.members.first()
    if (!mention)
        return msg.channel.send(":warning: You must mention someone to tease!")
    var myArray = [`https://media1.tenor.com/images/5037fa5c9af8bdcf1a8f53df38be1f32/tenor.gif?itemid=12188368`,`https://33.media.tumblr.com/b6d5b784c1b9b2574606ed4f95f0e74c/tumblr_nnfa6oqts21uo7bt6o4_500.gif`,`https://em.wattpad.com/0ccdab73c9e28130b9a495f973288e32616f8cb5/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4372785a42436439486b767768673d3d2d3530323435343137312e313532303462393035323865393433353131393738313930333037372e676966`,`http://fanaru.com/love-live-school-idol-project/image/239599-love-live-school-idol-project-leggo-of-me.gif`,`https://em.wattpad.com/42c858a7fdb28f51317b00f9dbd5383d7d850629/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f755943446b4161496d73377579513d3d2d3536303330333535302e313532343965353530306363313362653231393733353033333634382e676966`,``]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(`oooo ${msg.author} is teasing ${mention} `, {
        files:
            [
                rand
            ]
    })
}

exports.help = {
    name: 'tease',
    description: 'tease someone!',
    usage: 'tease [mention]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages'
};