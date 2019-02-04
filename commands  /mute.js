exports.run = (bot, msg, args) => {
    const ms = require('ms')
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    if (msg.member.hasPermission('KICK_MEMBERS')|| msg.author.id === bot.config.ownerID) {
        const role = msg.guild.roles.find("name", "ArchoidMuted");
        let member = msg.mentions.members.first();
        let user = msg.mentions.members.first();
        if (!member)
            return msg.channel.send(":warning: You must mention a member to mute!")
        if (member === msg.member)
            return msg.channel.send(":warning: You cannot mute yourself")
        let authorHighestRole = msg.member.highestRole.position;
        let memberhighestrole = member.highestRole.position;
        if (memberhighestrole >= authorHighestRole)
            return msg.channel.send(":warning: That user has the same or an higher role than you!");
        let reason = args[3];
        if (!reason)
            reason = "None specified";
        let time = args[1];
        if (time < 1)
            return msg.channel.send(":warning: You cannot mute someone for less than 1 second!");
        let timeValid = args[2];
        if (!member)
            return msg.channel.send(":warning: You must mention someone of this server!");
        if (member.roles.some(r => ["ArchoidMuted", "ArchoidMuted", "ArchoidMuted", "ArchoidMuted"].includes(r.name)))
            return msg.channel.send(":warning: That user is already muted!");
        if (!msg.guild.roles.find("name", "ArchoidMuted")) {
            setTimeout(myFunction, 2000)
            msg.guild.createRole({
                name: 'ArchoidMuted',
                color: 'BLACK',
            })
            function myFunction() {
                let role = msg.guild.roles.find("name", "ArchoidMuted")
                msg.guild.channels.forEach(c => {
                    c.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                })
            }
            return msg.channel.send(":warning: The muted role was not found, i will create one now. try the command again in 5 seconds!");
        }
        if (!time)
            return msg.channel.send(":warning: You must specify a time, example: =mute @mention 7 hours");
        if (!timeValid)
            return msg.channel.send(":warning: You must specify a time unit, example: =mute @mention 7 hours");
        if (isNaN(time))
            return msg.channel.send(":warning: You must specify a number as time, example: =mute @mention 7 hours");
        if (args[2] === "seconds" || args[2] === "sec" || args[2] === "s") {
            let finaltime = time * 1000;
            member.addRole(role, `Mute command has been used by ${msg.author.tag}`)
            bot.mutedGuildPeople.set(member.id, msg.guild.id)
            bot.mutedPeople.set(member.id, finaltime);
            guildConfig.amtmodlogs += 1;
            bot.guildSettings.set(msg.guild.id, guildConfig);
            let amountmodlogs = guildConfig.amtmodlogs;
            if (guildConfig.modlog !== "none") { // if the user has set their own mod log
                const embed = new Discord.RichEmbed()
                    .setTitle(`Action Log #${amountmodlogs}`)
                    .setThumbnail(member.user.displayAvatarURL)
                    .setColor('RED')
                    .addField(`User`, `<@${member.id}> (ID: ${member.id}) was muted`)
                    .addField(`Author`, `${msg.author} (ID: ${msg.author.id})`)
                    .addField("Muted for", `${time} second(s)`, true)
                    .addField("Reason", `${reason}`)
                    .setTimestamp()
                    .setFooter("Archoid bot")
                bot.channels.get(guildConfig.modlog).send({ embed });
                msg.channel.send(`:white_check_mark: Done. Muted ${member}!`);
            } else {
                msg.channel.send(`:white_check_mark: Done. Muted ${member}!`);
            }
        }
        if (args[2] === "minutes" || args[2] === "min" || args[2] === "m") {
            let finaltime = time * 60000;
            member.addRole(role, `Mute command has been used by ${msg.author.tag}`)
            bot.mutedGuildPeople.set(member.id, msg.guild.id)
            bot.mutedPeople.set(member.id, finaltime);
            guildConfig.amtmodlogs += 1;
            bot.guildSettings.set(msg.guild.id, guildConfig);
            let amountmodlogs = guildConfig.amtmodlogs;
            if (guildConfig.modlog !== "none") { // if the user has set their own mod log
                const embed = new Discord.RichEmbed()
                    .setTitle(`Action Log #${amountmodlogs}`)
                    .setThumbnail(member.user.displayAvatarURL)
                    .setColor('RED')
                    .addField(`User`, `<@${member.id}> (ID: ${member.id}) was muted`)
                    .addField(`Author`, `${msg.author} (ID: ${msg.author.id})`)
                    .addField("Muted for", `${time} minute(s)`, true)
                    .addField("Reason", `${reason}`)
                    .setTimestamp()
                bot.channels.get(guildConfig.modlog).send({ embed });
                msg.channel.send(`:white_check_mark: Done. Muted ${member}!`);
            } else {
                msg.channel.send(`:white_check_mark: Done. Muted ${member}!`);
            }
        }
        if (args[2] === "hours" || args[2] === "hour" || args[2] === "h") {
            let finaltime = time * 3600000;
            member.addRole(role, `Mute command has been used by ${msg.author.tag}`)
            bot.mutedGuildPeople.set(member.id, msg.guild.id)
            bot.mutedPeople.set(member.id, finaltime);
            guildConfig.amtmodlogs + 1;
            bot.guildSettings.set(msg.guild.id, guildConfig);
            let amountmodlogs = guildConfig.amtmodlogs;
            if (guildConfig.modlog !== "none") { // if the user has set their own mod log
                const embed = new Discord.RichEmbed()
                    .setTitle(`Action Log #${amountmodlogs}`)
                    .setThumbnail(member.user.displayAvatarURL)
                    .setColor('RED')
                    .addField(`User`, `<@${member.id}> (ID: ${member.id}) was muted`)
                    .addField("Author", `${msg.author} (ID: ${msg.author.id})`, true)
                    .addField("Muted for", `${time} hour(s)`, true)
                    .addField("Reason", `${reason}`)
                    .setTimestamp()
                bot.channels.get(guildConfig.modlog).send({ embed });
                msg.channel.send(`:white_check_mark: Done. Muted ${member}!`);
            } else {
                return msg.channel.send(`:white_check_mark: Done. Muted ${member}!`);
            }
        }
        if (args[2] === "days" || args[2] === "day" || args[2] === "d") {
            let finaltime = time * 86400000;
            member.addRole(role, `Mute command has been used by ${msg.author.tag}`)
            bot.mutedGuildPeople.set(member.id, msg.guild.id)
            bot.mutedPeople.set(member.id, finaltime);
            guildConfig.amtmodlogs + 1;
            bot.guildSettings.set(msg.guild.id, guildConfig);
            let amountmodlogs = guildConfig.amtmodlogs;
            if (guildConfig.modlog !== "none") { // if the user has set their own mod log
                const embed = new Discord.RichEmbed()
                    .setTitle(`Action Log #${amountmodlogs}`)
                    .setThumbnail(member.user.displayAvatarURL)
                    .setColor('RED')
                    .addField(`User`, `<@${member.id}> (ID: ${member.id}) was muted`)
                    .addField("Author", `${msg.author} (ID: ${msg.author.id})`, true)
                    .addField("Muted for", `${time} day(s)`, true)
                    .addField("Reason", `${reason}`)
                    .setTimestamp()
                bot.channels.get(guildConfig.modlog).send({ embed });
                msg.channel.send(`:white_check_mark: Done. Muted ${member}!`);
            } else {
                return msg.channel.send(`:white_check_mark: Done. Muted ${member}!`);
            }
        }
    } else {
        msg.channel.send(":warning: You do not have the `KICK_MEMBERS` permission!")
    }
}

exports.help = {
    name: 'mute',
    description: "Mute a user in your server.",
    usage: 'mute [mention] [time] [time unit] <reason>',
    category: 'Moderation',
    mPerm: 'Kick Members',
    bPerm: 'Manage Roles'
};