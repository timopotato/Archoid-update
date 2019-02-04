module.exports = (client, messageCollection) => {
    messageCollection.forEach(message => {
        const n = "\n";
        const Discord = require("discord.js");
        const guildConfig = client.guildSettings.get(message.guild.id);
        let channel = message.guild.channels.get(guildConfig.LogChannel);
        if (guildConfig.LogChannel === "none") return;
        if(message.content === " " || message.content === "") return;
        const embed = new Discord.RichEmbed()
            .setTitle("**"+message.author.tag+"'s** message has been bulk deleted.")
            .setDescription("**__Message:__**"+n+"```"+message+"```")
            .setColor('ffff00')
            .setFooter("User ID: "+message.author.id)
            .addField("Channel:", message.channel)
            .setTimestamp()
            channel.send({ embed })
    })
};  
