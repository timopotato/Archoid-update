module.exports = (client, oldRole, newRole) => {
    const n = "\n";
    const Discord = require("discord.js");
    const guildConfig = client.guildSettings.get(oldRole.guild.id);
    let channel = oldRole.guild.channels.get(guildConfig.LogChannel);
    if (guildConfig.LogChannel === "none") return;
    if (oldRole.name === newRole.name) return;
    const embed = new Discord.RichEmbed()
        .setTitle("A role has been renamed.")
        .setDescription("__**Before:**__" + n + "```" + oldRole.name + "```" + n + "__**After:**__" + n + "```" + newRole.name + "```")
        .setColor('ffff00')
        .setFooter("User ID: " + oldRole.id)
        .setTimestamp()
    channel.send({ embed }).catch(error => bot.channels.get("467285951702368276").send("error narb a farp"));
};  
