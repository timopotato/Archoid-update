module.exports = (bot, message) => {
    const n = "\n";
    const Discord = require("discord.js");
    const guild = message.guild;
    const guildConfig = bot.guildSettings.get(guild.id);
    const member = message.author
    //Log the deleted message
    let channel = guild.channels.get(guildConfig.LogChannel);
    if (guildConfig.LogChannel === "none") return;
    if (message.content === " " || message.content === "") return;
    const embed = new Discord.RichEmbed()
        .setTitle("**" + message.author.tag + "'s** message has been deleted.")
        .setColor('ffff00')
        .setFooter("User ID: " + message.author.id)
        .setDescription("**__Message:__**" + n + "```" + message + "```")
        .addField("Channel:", message.channel)
        .setTimestamp()
    channel.send({ embed });
}
