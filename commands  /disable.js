exports.run = async (bot, msg, args) => {
    const Discord = require('discord.js');
    const fs = require('fs');
    const moment = require('moment');
    // const { get } = require('snekfetch');
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    if (msg.author.id === bot.config.ownerID) {
        const command = args[0];
        if(!command) return;
        bot.disabledCommands.set(command, "Yes");
        msg.channel.send(":white_check_mark: Done. Disabled the command "+command)
    }
}