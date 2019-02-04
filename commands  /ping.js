exports.run = async (client, msg, args) => {
        const m = await msg.channel.send("Pong!...");
        await m.edit(`:ping_pong: Pong! The ping is currently: **${m.createdTimestamp - msg.createdTimestamp}ms**`);
};

exports.help = {
        name: 'ping',
        description: "Check the bot's ping.",
        usage: 'ping',
        category: 'Misc',
        mPerm: 'None',
        bPerm: 'Send Messages'
};