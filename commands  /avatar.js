exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    let user = msg.mentions.users.first() || msg.author;
    const embed = new Discord.RichEmbed()
        .setTitle(`Avatar of ${user.tag}`)
        .setImage(user.displayAvatarURL)
        .setColor(654321)
    msg.channel.send(embed)
}

exports.help = {
    name: 'avatar',
    description: 'Shows the avatar of a user.',
    usage: 'avatar <mention>',
    category: 'Information',
    mPerm: 'None',
    bPerm: 'Send Messages and Send Embeds'
};

