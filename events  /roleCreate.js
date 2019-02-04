module.exports = (bot, channelName) => {
    const n = "\n";
    const Discord = require("discord.js");
    const guild = channelName.guild;
    const guildConfig = bot.guildSettings.get(guild.id);
    const channel = guildConfig.LogChannel;
    //Log the deleted message
    if (guildConfig.LogChannel === "none") return;
    const embed = new Discord.RichEmbed()
        .setTitle("A role has been created.")
        .setColor('ffff00')
        .setFooter("Role ID: " + channelName.id)
        .setDescription("**__Role name:__**" + n + "```" + channelName.name + "```")
        .setTimestamp()
    channel.send({ embed });
}
