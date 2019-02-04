exports.run = async (bot, msg, args) => {

    const Discord = require("discord.js");
    function format(seconds) {
        function pad(s) {
            return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60 * 60));
        var minutes = Math.floor(seconds % (60 * 60) / 60);
        var seconds = Math.floor(seconds % 60);

        return (hours) + ' hours, ' + (minutes) + ' minutes and ' + (seconds) + ' seconds.';
    }
    var uptime = process.uptime();
    const getMemberCount = () => {
        let amount = 0;
        bot.guilds.forEach(c => amount += c.memberCount);
        return amount;
    }
    const m = await msg.channel.send("Fetching data...");
    const embed = new Discord.RichEmbed()
        .setTitle(`Archoid's status.`)
        .setColor(0x00AE86)
        .setDescription(`I have been online for ${format(uptime)}`)
        .setTimestamp()
        .addField(`Ping:`, `${m.createdTimestamp - msg.createdTimestamp}ms.`)
        .addField("Servers:", `${bot.guilds.size} servers.`)
        .addField("Channels:", `${bot.channels.size} channels.`)
        .addField("Users:", `${getMemberCount()} users.`)
    m.edit({ embed });
}

exports.help = {
    name: 'status',
    description: "Check the bot's status.",
    usage: 'status',
    category: 'Misc',
    mPerm: 'None',
    bPerm: 'Send Messages and Send Embeds'
};