exports.run = (bot, msg, args) => {
    const Discord = require("discord.js");
  const guildConfig = bot.guildSettings.get(msg.guild.id);
    if (msg.member.hasPermission('BAN_MEMBERS')) {
        let id = args[0];
        if (!id)
            return msg.channel.send(":warning: You must give an id to unban!")
        let reason = args.slice(1).join(" ");
        if (!reason)
            reason = "None specified";
        msg.guild.fetchBans().then(bans => {
            var person = bans.find('id', id).id;
            msg.guild.unban(person, `unban command has been used by ${msg.author.tag}`);
        });
        guildConfig.amtmodlogs += 1;
            bot.guildSettings.set(msg.guild.id, guildConfig);
            let amountmodlogs = guildConfig.amtmodlogs;
            if (guildConfig.modlog !== "none") { // if the user has set their own mod log
                const embed = new Discord.RichEmbed()
                    .setTitle(`Action Log #${amountmodlogs}`)
                    .setThumbnail(bot.user.avatarURL)
                    .setColor('GREEN')
                    .addField(`User`, `<@${id}> (ID: ${id}) was unbanned`)
                    .addField("Author", `<@${msg.author.id}> (ID: ${msg.author.id})`, true)
                    .addField("Reason", `${reason}`)
                    .setTimestamp()
                bot.channels.get(guildConfig.modlog).send({ embed });
                msg.channel.send(`:white_check_mark: Done. Unbanned <@${id}>!`);
            } else {
                return msg.channel.send(`:white_check_mark: Done. Unbanned <@${id}>!`);
            }
    } else {
        msg.channel.send(`:warning: ${msg.author} you do not have \`BAN_MEMBERS\` permission!`)
    }
}

exports.help = {
    name: 'unban',
    description: "Unban a user with their ID.",
    usage: 'unban [User ID] <reason>',
    category: 'Moderation',
    mPerm: 'Ban Members',
    bPerm: 'Ban Members'
};