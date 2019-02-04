exports.run = (bot, msg, args) => {
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    let channel = guildConfig.LogChannel;
    if (channel === "449552716377882624") {
        channel = "none"
    } else
        channel = `<#${guildConfig.LogChannel}>`
    if (msg.member.hasPermission('MANAGE_GUILD') || msg.author.id === bot.config.ownerID) {
        if (args[0] === undefined) {
            const embed = new Discord.RichEmbed()
                .setTitle(`Server log`)
                .setDescription("Log all kinds of things")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor('#FFFF00')
                .addField("Channel:", `${channel}`)
                .setFooter("Do =help to see the a list of all commands!")
                .setTimestamp()
            msg.channel.send({ embed });
        }
        if (args[0] === "set") {
            let LogChannel = msg.mentions.channels.first(); // we want the first channel.
            if (!LogChannel.type === "text") return msg.channel.send(":warning: You can only set action log on a text channel");
            guildConfig.LogChannel = LogChannel.id; // We're setting the guild config's mod log variable as the ID of the channel that was received.
            bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
            msg.channel.send(`:white_check_mark: Done. serverlog set to: <#${guildConfig.LogChannel}>!`);
        }
        if (args[0] === "remove") {
            guildConfig.LogChannel = "449552716377882624";
            bot.guildSettings.set(msg.guild.id, guildConfig);
            msg.channel.send(`:white_check_mark: Done. Removed serverlog!`);
        }
    } else {
        return msg.channel.send(":warning: You do not have the `MANAGE_SERVER` permission!")
    }
}

exports.help = {
    name: 'serverlog',
    description: "Set the serverlog for the server.",
    usage: 'serverlog set [channel mention]',
    category: 'Custom',
    mPerm: 'Manage Server',
    bPerm: 'Send Messages and Send Embeds'
};