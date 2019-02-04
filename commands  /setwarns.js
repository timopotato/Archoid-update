exports.run = (bot, msg, args) => {
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    if (msg.member.hasPermission('MANAGE_GUILD') || msg.author.id === bot.config.ownerID) {
        if (args[0] === undefined) {
            const embed = new Discord.RichEmbed()
                .setTitle(`Warn System`)
                .setDescription("The warn configurations for this server")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor('#FFFF00')
                .addField("Limit:", guildConfig.warnLimit)
                .addField("Punishment", guildConfig.warnPunishment)
                .setFooter("Do =help to see the a list of all commands!")
                .setTimestamp()
            msg.channel.send({ embed });
        }
        if (args[0] === "limit") {
            const number = args[1]
            if (!number) return msg.channel.send(":warning: Give a number as limit!")
            if (isNaN(number)) return msg.channel.send(":warning: Give a number as limit!")
            if (number > 100) return msg.channel.send(":warning: The limit cannot be higher than 100!")
            if (number < 2) return msg.channel.send(":warning: The limit cannot be lower than 2!")
            guildConfig.warnLimit = number; // We're setting the guild config's mod log variable as the ID of the channel that was received.
            bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.
            msg.channel.send(`:white_check_mark: Done. Warn limit set to ${number} succesfully!`)
        }
        if (args[0] === "punishment") {
            const sort = args[1]
            const amount = args[2]
            if (!sort) return msg.channel.send(":warning: You must give a punishment")
            if (sort === "kick") {
                guildConfig.warnPunishment = "kick"; // We're setting the guild config's mod log variable as the ID of the channel that was received.
                bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.    
            }
            if (sort === "ban") {
                guildConfig.warnPunishment = "ban"; // We're setting the guild config's mod log variable as the ID of the channel that was received.
                bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.    
            }
            if (sort === "mute") {
                if (!amount) return msg.channel.send(":warning: You must give an amount of minutes for the mute")
                if (isNaN(amount)) return msg.channel.send(":warning: You must give an amount of minutes for the mute")
                guildConfig.warnPunishment = "mute"; // We're setting the guild config's mod log variable as the ID of the channel that was received.
                bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.     
                guildConfig.warnMuteTime = amount; // We're setting the guild config's mod log variable as the ID of the channel that was received.
                bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.     
                return msg.channel.send(`:white_check_mark: Done. Warn punishment set to ${amount} minute mute succesfully`);
            }
            msg.channel.send(`:white_check_mark: Done. Warn punishment set to ${sort} succesfully!`)
        }
        if (args[0] === "remove") {
            guildConfig.warnPunishment = "none"; // We're setting the guild config's mod log variable as the ID of the channel that was received.
            bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.     
            guildConfig.warnLimit = "none"; // We're setting the guild config's mod log variable as the ID of the channel that was received.
            bot.guildSettings.set(msg.guild.id, guildConfig); // Just changing it above isn't enough. To change it in database you need to set the object again, under the guild ID you wish.     
            msg.channel.send(":white_check_mark: Done. Warn system has been disabled.")
        }
    } else {
        return msg.channel.send(":warning: You do not have the `MANAGE_SERVER` permission!")
    }
}

exports.help = {
    name: 'setwarns',
    description: "Set the warns for the server.",
    usage: 'setwarns [limit/punishment] [number/punishment] <time in minutes for mute>',
    category: 'Moderation',
    mPerm: 'Manage Server',
    bPerm: 'None'
};