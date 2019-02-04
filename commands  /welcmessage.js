exports.run = (bot, msg, args) => {
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    let channel = guildConfig.welcomeChannel;
    if (channel === "449552716377882624") {
        channel = "none"
    } else
        channel = `<#${guildConfig.welcomeChannel}>`
    if (msg.member.hasPermission('MANAGE_GUILD') || msg.author.id === bot.config.ownerID) {
        if (args[0] === undefined) {
            const embed = new Discord.RichEmbed()
                .setTitle(`Welcome message`)
                .setDescription("A message for every new member")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor('#FFFF00')
                .addField("Channel:", `${channel}`)
                .addField("The welcome message", `${guildConfig.welcomeMessage || "none"}`)
                .setFooter("Do =help to see the a list of all commands!")
                .setTimestamp()
            msg.channel.send({ embed });
        }
        if (args[0] === "set") {
            if (args[1] === "channel") {
                let welcomeChannel = msg.mentions.channels.first(); // we want the first channel.
                if (!welcomeChannel.type === "text") return msg.channel.send(":warning: You can only set action log on a text channel");
                guildConfig.welcomeChannel = welcomeChannel.id; // We're setting the guild config's mod log variable as the ID of the channel that was received.
                bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
                msg.channel.send(`:white_check_mark: Done. welcome message channel set to: <#${guildConfig.welcomeChannel}>!`);
            }
            if (args[1] === "message") {
                let welcomeMessage = args.slice(2).join(" "); // we want the full message.
                guildConfig.welcomeMessage = welcomeMessage; // We're setting the guild config's mod log variable as the ID of the channel that was received.
                bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
                msg.channel.send(`:white_check_mark: Done. welcome message set to: ${guildConfig.welcomeMessage}!`);
            }
        }
        if (args[0] === "remove") {
            if (args[1] === "channel") {
                guildConfig.welcomeChannel = "449552716377882624";
                bot.guildSettings.set(msg.guild.id, guildConfig);
                msg.channel.send(`:white_check_mark: Done. Removed welcome message channel!`);
            }
            if (args[1] === "message") {
                guildConfig.welcomeMessage = "";
                bot.guildSettings.set(msg.guild.id, guildConfig);
                msg.channel.send(`:white_check_mark: Done. Removed welcome message channel!`);
            }
        }
    } else {
        return msg.channel.send(":warning: You do not have the `MANAGE_SERVER` permission!")
    }
}

exports.help = {
    name: 'welcmessage',
    description: "Set the welcome message for the server.",
    usage: 'welcmessage set [channel/message] [mention channel/message]',
    category: 'Custom',
    mPerm: 'Manage Server',
    bPerm: 'Send Messages'
};