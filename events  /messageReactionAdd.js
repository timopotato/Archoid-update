module.exports = async (bot, messageReaction, user) => {
    if (user.id === "440128355040231424") return;
    const Discord = require("discord.js");
    const n = "\n";
    const message = bot.helpReaction.get(user.id) //returns a messageID
    if (!message) return;
    const channel = bot.helpReaction2.get(user.id) //returns a channelID
    if (!channel) return;
    const channel2 = bot.channels.get(channel) //get the channel
    const m = await channel2.fetchMessage(message) //fetch the message  🔧 🛠
    if (messageReaction.emoji.name === "🏠") {
        const embed = new Discord.RichEmbed()
            .setTitle(`Archoid help`)
            .setDescription("Welcome to Archoid, a secure and lagg free easy to use Discord bot." + n + "This bot was developed by Potato#6163, be aware that all commands can only be used in servers. Not in DM's or group DM's." + n + "There are a total of " + bot.commandNames.length + " commands." + n + n + "Commands are indicated with `⌾` and subcommands are indicated with `→`. You can use the `contact` command to ask questions to the developer, you can also send suggestions to it. If you want more information about a command, you can do `help [command name]`." + n + n + "To navigate about this help message, click the reactions to view the corresponding pages. To return to this home page, click the house reaction, and to close this help message, click the red cross reaction.")
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor('#FFFF00')
            .setTimestamp()
        return m.edit({ embed }).then(messageReaction.remove(user))
    }//edit the message
    if (messageReaction.emoji.name === "🔨") {
        const embed = new Discord.RichEmbed()
            .setTitle(`Moderation`)
            .setDescription("Commands that will help you to moderate the server." + n + n + "**⌾ ban**  - bans a user from the server." + n + "**⌾ kick**  - kicks a user from the server." + n + "**⌾ hackban**  - bans a user by their ID." + n + "**⌾ unban** - unbans a user by their ID" + n + "**⌾ clear** - bulkdeletes messages in a text channel. 1 is the minimum, and 100 the maximun." + n + "**⌾ mute** - denies the permission for the user to talk." + n + "**⌾ unmute** - allow the permission for the user to talk." + n + "**⌾ warn** - warn a user." + n + "**⌾ rename** - change a users nickname." + n + "**⌾ resetnick** - reset all nicknames in the server back to their Discord usernames." + n + "**⌾ mutetime** - check for how long a muted user stays muted.")
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor('#FFFF00')
            .setTimestamp()
        return m.edit({ embed }).then(messageReaction.remove(user))
    }//edit the message
    if (messageReaction.emoji.name === "📡") {
        const embed = new Discord.RichEmbed()
            .setTitle(`Information`)
            .setDescription("Commands that will help you got information about everything in your server." + n + n + "**⌾ info user** - get information about a user." + n + "**⌾ info server** - get information about your server." + n + "**⌾ info channel** - get information about the text channel." + n + "**⌾ avatar** - get the avatar of a user in the server." + n + "**⌾ perms** - get all the permissions a user has." + n + "**⌾ membercount** - get the amount of members in the server." + n + "**⌾ status** - get the bots status." + n + "**⌾ ping** - get the bots ping." + n + "**⌾ uptime** - get the bots uptime." + n + "**⌾ invite** - get the bots invite link and support server invite.")
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor('#FFFF00')
            .setTimestamp()
        return m.edit({ embed }).then(messageReaction.remove(user))
    } //edit the message
    if (messageReaction.emoji.name === "🎉") {
        const embed = new Discord.RichEmbed()
            .setTitle(`Amusement`)
            .setDescription("Commands that let you have fun." + n + n + "**⌾ urban** - Use urbandictionairy to get the meaning of a word." + n + "**⌾ translate** - translate text into other languages." + n + "**⌾ 8ball** - ask the magic 8ball queastions that only he can asnwer." + n + "**⌾ feedme** - let the bot feed you.")
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor('#FFFF00')
            .setTimestamp()
        return m.edit({ embed }).then(messageReaction.remove(user))
    } //edit the message 
    if (messageReaction.emoji.name === "❌") {
        return m.delete()
    } //edit the message 
    if (messageReaction.emoji.name === "🔧") {
        const embed = new Discord.RichEmbed()
            .setTitle(`Rolemanagement`)
            .setDescription("Commands that wil help you in managing your roles." + n + n + "**⌾ createrole** - create a new role in your server." + n + "**⌾ deleterole** - delete a role from your server." + n + "**⌾ colorrole** - change the color of a role." + n + "**⌾ mentionrole** - toggle the mention function of a role." + n + "**⌾ addrole** - add a role to a user." + n + "**⌾ removerole** - remove a role from a user.")
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor('#FFFF00')
            .setTimestamp()
        return m.edit({ embed }).then(messageReaction.remove(user))
    } //edit the message 
    if (messageReaction.emoji.name === "🛠") {
        const embed = new Discord.RichEmbed()
            .setTitle(`Administration`)
            .setDescription("Commands that will let you to set up the bot." + n + n + "**⌾ actionlog** - set the actionlog to a given channel." + n + "**⌾ welcmessage** - sends a message whenever a user joins." + n + "**→ channel** - set the channel for welcmessage." + n + "**→ message** - set the message for welcmessage." + n + "**⌾ setwarns** - set the warn system for the server." + n + "**→ limit** - set a limit for when the punisment will be activated." + n + "**→ punishment** - set what punishment will be done when a user hits the limit." + n + "**⌾ joinleavelog** - log whenever a user joins or leaves the server." + n + "**→ set** - set the channel this will be logged to" + n + "**⌾ byemessage** - send a message whenever a user leaves the server." + n + "**→ channel** - set the channel where this message will be send to." + n + "**→ message** - set the message what will be send when a user leaves." + n + "**⌾ serverlog** - log whenever a message gets deleted/edited/role created/role deleted etc." + n + "**→ set** - set the channel this will be send to.")
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor('#FFFF00')
            .setTimestamp()
        return m.edit({ embed }).then(messageReaction.remove(user))
    } //edit the message 
}   