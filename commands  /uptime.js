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
    const m = await msg.channel.send("Fetching data...");

    m.edit(`I have been online for ${format(uptime)}`);
}

exports.help = {
    name: 'uptime',
    description: "check the bot's uptime.",
    usage: 'uptime',
    category: 'Misc',
    mPerm: 'None',
    bPerm: 'Send Messages'
};