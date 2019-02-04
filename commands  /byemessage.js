exports.run = (bot, msg, args) => {
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    let channel = guildConfig.byeChannel;
    if (channel === "449552716377882624") {
        channel = "none"
    } else
        channel = `<#${guildConfig.byeChannel}>`
    if (msg.member.hasPermission('MANAGE_GUILD') || msg.author.id === bot.config.ownerID) {
        if (args[0] === undefined) {
            const embed = new Discord.RichEmbed()
                .setTitle(`Welcome message`)
                .setDescription("A message for every new member")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor('#FFFF00')
                .addField("Channel:", `${channel}`)
                .addField("The welcome message", `${guildConfig.byeMessage || "none"}`)
                .setFooter("Do =help to see the a list of all commands!")
                .setTimestamp()
            msg.channel.send({ embed });
        }
        if (args[0] === "set") {
            if (args[1] === "channel") {
                let byeChannel = msg.mentions.channels.first();
                if (!byeChannel) return msg.channel.send(":warning: You must give a channel to set the bye message to.")// we want the first channel.
                if (!byeChannel.type === "text") return msg.channel.send(":warning: You can only set action log on a text channel");
                guildConfig.byeChannel = byeChannel.id; // We're setting the guild config's mod log variable as the ID of the channel that was received.
                bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
                msg.channel.send(`:white_check_mark: Done. bye message channel set to: <#${guildConfig.byeChannel}>!`);
            }
            if (args[1] === "message") {
                let byeMessage = args.slice(2).join(" "); // we want the full message.
                if (!byeMessage) return msg.channel.send(":warning: You must give a message!")
                guildConfig.byeMessage = byeMessage; // We're setting the guild config's mod log variable as the ID of the channel that was received.
                bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
                msg.channel.send(`:white_check_mark: Done. bye message set to: ${guildConfig.byeMessage}!`);
            }
        }
        if (args[0] === "remove") {
            if (args[1] === "channel") {
                guildConfig.byeChannel = "449552716377882624";
                bot.guildSettings.set(msg.guild.id, guildConfig);
                msg.channel.send(`:white_check_mark: Done. Removed welcome message channel!`);
            }
            if (args[1] === "message") {
                guildConfig.byeMessage = "";
                bot.guildSettings.set(msg.guild.id, guildConfig);
                msg.channel.send(`:white_check_mark: Done. Removed welcome message channel!`);
            }
        }
    } else {
        return msg.channel.send(":warning: You do not have the `MANAGE_SERVER` permission!")
    }
}

exports.help = {
    name: 'byemessage',
    description: "Sends a message when a user leaves the server",
    usage: 'byemessage set [message/channel] [message/channel mention]',
    category: 'Custom',
    mPerm: 'Manage Server',
    bPerm: 'Send Messages'
};