exports.run = async (client, msg, args) => {
    if (msg.member.hasPermission('MANAGE_MESSAGES')|| msg.author.id === bot.config.ownerID) {
        // Support for clearing with a mention.
        const member = msg.mentions.members.first();

        // Get the amount of messages to clear.
        let amount = args[0];

        // Check if it's a number, if it's between 1 and 100, if it's an integer.
        if (!amount) return msg.channel.send(`You must enter a number of messages that is between 1 and 99 to delete.`);
        if (isNaN(amount)) return msg.channel.send(`You must enter a valid number of messages to delete.`);
        if (parseFloat(amount).toString().split(".")[1]) return msg.channel.send("You must provide an integer for the amount of messages to delete.");
        let amountInteger = parseInt(amount);
        if (amountInteger < 1 || amountInteger > 99) return msg.channel.send(`You must enter a number of messages that is between 1 and 99 to delete.`);
        // Fetch all of the messages.
        let m = await msg.channel.fetchMessages({ limit: amountInteger + 1 });
        if (member) m = m.filter(message => message.author.id === member.id);
        // This section is basically making sure that I handle messages that are older than fourteen days correctly.
        let fourteenDays = Date.now() - 1209600000;
        let mOldSize = m.size;
        m.forEach((value, key, map) => {
            // Check if the created timestamp is longer than 14 days ago.
            if (value.createdTimestamp < fourteenDays) map.delete(key);
        });
        // The secret force behind all of this. TextChannel.bulkDelete().
        let deleted = await msg.channel.bulkDelete(m);
        // Provide alternative messages if a member was provided.
        if (member) {
            if (mOldSize !== m.size) return msg.reply(`in the limit of ${amount} messages provided, I cleared **${deleted.size - 1} message(s)** from ${member} successfully! (but ${mOldSize - deleted.size} message(s) could not be cleared as they must be less than 14 days old).`).then(m => m.delete(4000));
            return msg.reply(`in the limit of ${amount} messages provided, I cleared **${deleted.size} message(s)** from ${member} successfully!`).then(m => m.delete(2000));
        }

        // Is the size of the original messages the size of the messages now? If not, return with an alternative message compared to usual.
        if (mOldSize !== m.size) return msg.reply(`cleared **${deleted.size - 1} message(s)** successfully! (${mOldSize - deleted.size} message(s) could not be cleared as they must be less than 14 days old).`).then(m => m.delete(3000));
        const rep = await msg.reply(`cleared **${deleted.size - 1} message(s)** successfully!`); // Tell the user that they successfully deleted the wanted messages.
        await rep.delete(1500); // Delete response.
    } else {
        return msg.channel.send(":warning: You do not have the `MANAGE_MESSAGES` permission.")
    }
};

exports.help = {
    name: 'clear',
    description: "Clears messages in a given channel.",
    usage: 'clear [number]',
    category: 'Moderation',
    mPerm: 'Manage Messages',
    bPerm: 'Manage Messages'
};