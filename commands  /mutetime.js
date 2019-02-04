exports.run = async (bot, msg, args) => {

    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(msg.guild.id);
    const moment = require('moment');
    const momentPreciseRangePlugin = require("moment-precise-range-plugin");
    let member = msg.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!member)
        return msg.channel.send(":warning: You must mention someone of this server!");
    const time = bot.mutedPeople.get(member.id);
    const guild = bot.guilds.get(bot.mutedGuildPeople.get(member.id));
    if (!guild) {
        return msg.channel.send(":warning: That user is not muted");
    }
    if (guild.id !== msg.guild.id) {
        return msg.channel.send(":warning: That user is not muted");
    }
    const thing = moment().add(time / 1000, 'seconds').calendar();
    msg.channel.send(member + " will be unmuted at: " + thing+" (CEST)")
}

exports.help = {
    name: 'mutetime',
    description: "Check how long a muted member is muted.",
    usage: 'mutetime [mention]',
    category: 'Moderation',
    mPerm: 'None',
    bPerm: 'Send Messages'
};