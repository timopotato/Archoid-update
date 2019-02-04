
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
bot.config = config;
const EnmapLevel = require("enmap-level");
const paginate = require("paginate-array");

// Enmaps
const talkedRecently = new Set();
const guildSettingsTable = new EnmapLevel({ name: "guildSettings" });
bot.guildSettings = new Enmap({ provider: guildSettingsTable });

//Help reactions 
const helpReactionMessages = new EnmapLevel({ name: "helpReaction" });
bot.helpReaction = new Enmap({ provider: helpReactionMessages });
const helpReactionMessages2 = new EnmapLevel({ name: "helpReaction2" });
bot.helpReaction2 = new Enmap({ provider: helpReactionMessages2 });

//blacklist
const blacklistData = new EnmapLevel({ name: "blacklist" });
bot.blacklist = new Enmap({ provider: blacklistData });

//Disabled commands
const disabledcommandsdata = new EnmapLevel({ name: "disabledCommands" });
bot.disabledCommands = new Enmap({ provider: disabledcommandsdata });

// Contact enmaps
const contactNumberData = new EnmapLevel({ name: "contactNumber" });
bot.contactNumber = new Enmap({ provider: contactNumberData })
const contactUserData = new EnmapLevel({ name: "contactUser" });
bot.contactUser = new Enmap({ provider: contactUserData })
const contactChannelData = new EnmapLevel({ name: "contactChannel" });
bot.contactChannel = new Enmap({ provider: contactChannelData })
const contactTimeoutData = new EnmapLevel({ name: "contactTimeout" });
bot.contactTimeout = new Enmap({ provider: contactTimeoutData })

// Warn enmaps
const warnedUserIdData = new EnmapLevel({ name: "warnedUserId" });
bot.warnedUserId = new Enmap({ provider: warnedUserIdData });

//mute 
const mutedGuildPeopleData = new EnmapLevel({ name: "mutedGuildPeople" });
bot.mutedGuildPeople = new Enmap({ provider: mutedGuildPeopleData });
const mutedPeopleData = new EnmapLevel({ name: "mutedPeople" });
bot.mutedPeople = new Enmap({ provider: mutedPeopleData });

bot.on("ready", () => {
    bot.user.setActivity(`>help | ${bot.guilds.size} servers | ${getMemberCount()} users`, { type: "playing" });
  setTimeout(myFunction, 1000)
  bot.mutedPeople.forEach((value, key) => {
    const time = bot.mutedPeople.get(key);
    const time2 = parseInt(time) - parseInt(1000);
    bot.mutedPeople.set(key, time2);
  })
  function myFunction() {
    setTimeout(myFunction, 1000)
    bot.mutedPeople.forEach((value, key) => {
      const time = bot.mutedPeople.get(key);
      const time2 = parseInt(time) - parseInt(1000);
      bot.mutedPeople.set(key, time2);
      if (value < 0) {
        const guild = bot.guilds.get(bot.mutedGuildPeople.get(key));
        const member = guild.members.get(key);
        if (!member) {
          bot.mutedPeople.delete(key);
          bot.mutedGuildPeople.delete(key);
        }
        const role = guild.roles.find("name", "ArchoidMuted");
        const guildConfig = bot.guildSettings.get(guild.id);
        if (guildConfig.modlog !== "none") {
          member.removeRole(role)
          guildConfig.amtmodlogs + 1;
          bot.guildSettings.set(guild.id, guildConfig);
          let amountmodlogs = guildConfig.amtmodlogs;
          const embed = new Discord.RichEmbed()
            .setTitle(`Action Log #${amountmodlogs}`)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor('GREEN')
            .addField(`User:`, `<@${member.id}> was unmuted`)
            .addField("Author", `${guild.me}`, true)
            .addField("Reason", `Automatic unmute`)
            .setTimestamp()
          bot.channels.get(guildConfig.modlog).send({ embed });
          bot.mutedPeople.delete(key);
          bot.mutedGuildPeople.delete(key);
        } else {
          member.removeRole(role)
          bot.mutedPeople.delete(key);
          bot.mutedGuildPeople.delete(key);
        }
      }
    })
  }
})

const getMemberCount = () => {
  let amount = 0;
  bot.guilds.forEach(c => amount += c.memberCount);
  return amount;
}

const defaultSettings = {
  prefix: ">",
  modlog: "none",
  amtmodlogs: 0,
  welcomeChannel: "",
  welcomeMessage: "",
  byeChannel: "",
  byeMessage: "",
  joinLeaveLog: "",
  JoinLeaveNumber: 0,
  LogChannel: "none",
  warnLimit: "none",
  warnPunishment: "none",
  warnMuteTime: 0
}

bot.defaultSettings = defaultSettings;
bot.talkedRecently = talkedRecently;
// We also need to make sure we're attaching the config to the bot so it's accessible everywhere!
bot.config = config;
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});
bot.commands = new Enmap();
fs.readdir("./commands", (err, files) => {
  if (err) throw err;
  bot.commandNames = files.map(f => f.substring(0, f.length - 3));
  console.log(`Loading a total of ${bot.commandNames.length} commands.`);
});
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    bot.commands.set(commandName, props);
  });
});
bot.login(config.token);