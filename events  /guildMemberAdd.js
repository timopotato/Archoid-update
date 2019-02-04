module.exports = (client, member) => {
    const n = "\n";
    const Discord = require("discord.js");
    const guild = member.guild;
    const guildConfig = client.guildSettings.get(guild.id);
    const moment = require("moment");
    if (member.id === "440128355040231424") return;
    String.prototype.replaceAll = function (find, replace) {
        return this.split(find).join(replace);
    }

    //if the user is still muted
    if (client.mutedPeople.get(member.id)) {
        const role = member.guild.roles.find("name", "ArchoidMuted");
        if (!role)
            return;
        member.addRole(role);
    }

    // Handle welcoming messages
    if (guildConfig.welcomeChannel) {
        let channel = guild.channels.get(guildConfig.welcomeChannel);
        if (guildConfig.welcomeChannel && guildConfig.welcomeChannel) {
            if (guild.channels.has(guildConfig.welcomeChannel)) {
                if (channel.permissionsFor(guild.me).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) {
                    const substituteValues = (message) => {
                        return message.replaceAll("{USER}", `<@${member.id}>`)
                            .replaceAll("{SERVERNAME}", member.guild.name)
                            .replaceAll("{MEMBERCOUNT}", member.guild.members.size)
                            .replaceAll("{MEMBERID}", member.id)
                            .replaceAll("{USERTAG}", member.user.tag)
                    }
                    channel.send(substituteValues(guildConfig.welcomeMessage));
                }
            } else {
                client.guildSettings.setProp(guild.id, "welcomeChannel", "");
            }
        }
    }

    //Join and Leave log
    if (guildConfig.joinLeaveLog) {
        guildConfig.joinLeaveNumber += 1;
        client.guildSettings.set(member.guild.id, guildConfig);
        let joinLeaveNumber = guildConfig.JoinLeaveNumber;
        let channel2 = guild.channels.get(guildConfig.joinLeaveLog);
        const embed = new Discord.RichEmbed()
            .setTitle(`Join Leave Log #${joinLeaveNumber}`)
            .setThumbnail(client.user.displayAvatarURL)
            .setColor('GREEN')
            .setDescription(`**User:** ${member} (ID: ${member.id}) joined!` + n + `**Account created:** ${moment(new Date()).diff(moment(member.user.createdAt), 'days')} day(s) ago` + n + `**Current Membercount:** ${guild.memberCount}`)
            .setTimestamp()
        channel2.send({ embed });
    }
}
