module.exports = (client, oldMessage, newMessage) => {
    const n = "\n";
    const Discord = require("discord.js");
    const guildConfig = client.guildSettings.get(oldMessage.guild.id);
    let channel = oldMessage.guild.channels.get(guildConfig.LogChannel);
    if (guildConfig.LogChannel === "none") return;
    if (oldMessage.content === newMessage.content) return;
    if (oldMessage.content.lenght > 1000) return;
    if (newMessage.content.length > 1000) return;
    const embed = new Discord.RichEmbed()
        .setTitle("**" + oldMessage.author.tag + "** edited their message.")
        .setDescription("__**Before:**__" + n + "```" + oldMessage + "```" + n + "__**After:**__" + n + "```" + newMessage + "```")
        .setColor('ffff00')
        .setFooter("User ID: " + oldMessage.author.id)
        .addField("Channel:", oldMessage.channel)
        .setTimestamp()
    channel.send({ embed })
};  
