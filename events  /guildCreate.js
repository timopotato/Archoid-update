module.exports = (bot, guild) => {
    const n = "\n";
    const Discord = require("discord.js");
    const guildConfig = bot.guildSettings.get(guild.id);
    const getMemberCount = () => {
        let amount = 0;
        bot.guilds.forEach(c => amount += c.memberCount);
        return amount;
      }
    bot.guildSettings.set(guild.id, bot.defaultSettings);
    bot.user.setActivity(`>help | ${bot.guilds.size} servers | ${getMemberCount()} users`, { type: "playing" });
}