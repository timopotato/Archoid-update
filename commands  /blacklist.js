exports.run = (bot, msg, args) => {
  if (msg.author.id !== bot.config.ownerID) return msg.channel.send(":warning: You are not allowed to use this command!"); // Is the person trying to execute the command the developer?
  let possibleOptions = ["add", "remove"];
  let option = args[0];
  if (!possibleOptions.includes(option)) return msg.channel.send(`:warning: You can either add to or remove from the backlist!`);
  if (option === "add") {
    let mention = msg.mentions.members.first();
    let personToBlackList;
    if (mention) {
      personToBlackList = mention.id;
    } else {
      personToBlackList = args[1];
    }
    //let personToBlackList = msg.mentions.members.first().id || args[0]; // It's the first mention, or the value or args[0].
    let reason = args.slice(2).join(" "); // Optional reason.
    if (!personToBlackList) return msg.channel.send(":warning: You must give someone to blacklist!"); // Was an ID or member provided?
    if (isNaN(personToBlackList) || personToBlackList.length !== 18) return msg.channel.send(":warning: You must provide a valid ID!"); // Is the person to blacklist actually an ID? Does it have a length of 18 and is it a number?
    if (personToBlackList === "310853886191599616") return msg.channel.send("why are you trying to blacklist yourself?");
    if (personToBlackList === "440128355040231424") return msg.channel.send(":warning: You cannot add me to my own blacklist!");
    if (!reason) reason = "None specified.";
    let someObject = {
      reason: reason
    }

    bot.blacklist.set(personToBlackList, someObject);
    msg.channel.send(`:white_check_mark: Done. Blacklisted <@${personToBlackList}> from using Archoid!`);
  } else if (option === "remove") {
    let mention = msg.mentions.members.first();
    let personToRemove;
    if (mention) {
      personToRemove = mention.id;
    } else {
      personToRemove = args[1];
    }
    //let personToBlackList = msg.mentions.members.first().id || args[0]; // It's the first mention, or the value or args[0].
    let reason = args.slice(2).join(" "); // Optional reason.
    if (!personToRemove) return msg.channel.send(":warning: You must give someone to unblacklist!"); // Was an ID or member provided?
    if (isNaN(personToRemove) || personToRemove.length !== 18) return msg.channel.send(":warning: You must provide a valid ID!"); // Is the person to blacklist actually an ID? Does it have a length of 18 and is it a number?
    if (!bot.blacklist.get(personToRemove)) return msg.channel.send(":waring: This user is not blacklisted!");
    bot.blacklist.delete(personToRemove);
    msg.channel.send(`:white_check_mark: Done. Unblacklisted <@${personToRemove}>!`);
  }
}

exports.help = {
  name: 'blacklist',
  description: "Adds/removes a user to/from Archoid's blacklist.",
  usage: 'blacklist [add/remove] [mention/userID]',
  category: 'Developer',
  mPerm: 'Developer',
  bPerm: 'None'
};

