exports.run = async (bot, msg, args) => {
    msg.channel.send("Bot invite: <https://discordapp.com/api/oauth2/authorize?client_id=419806744907350017&permissions=1609952471&scope=bot>");
    msg.channel.send("Support server: https://discord.gg/zXD5ujQ")
    }

    exports.help = {
        name: 'invite',
        description: "The bot's invite link and support server invite.",
        usage: 'invite',
        category: 'Misc',
        mPerm: 'None',
        bPerm: 'Send Messages'
    };