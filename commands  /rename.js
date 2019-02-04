exports.run = (bot, msg, args) => {
    let archoid = msg.guild.me
    if (msg.member.hasPermission("MANAGE_NICKNAMES")|| msg.author.id === bot.config.ownerID) {
        let memb = msg.mentions.members.first();
        if (!memb) return msg.channel.send(":warning: You must mention someone of this server!");
        let authorHighestRole = msg.member.highestRole.position;
        let archoidHighRole = archoid.highestRole.position;
        let membHighestRole = memb.highestRole.position;
        if (membHighestRole >= authorHighestRole && membHighestRole >= archoidHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That user has a role higher than you and me!");
        if (membHighestRole >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That user has a higher role than you!");
        if (membHighestRole >= archoidHighRole) return msg.channel.send(":warning: That user has a higher role than!");
        if (memb.id === msg.guild.ownerID) return msg.channel.send(`:warning: I cannot change the nickname of the server owner!`);
        let inputtedNick = args.slice(1).join(" ");
        if (!inputtedNick) return msg.channel.send(":warning: Please provide a nickname to set!");
        if (inputtedNick.length > 32) return msg.channel.send(`:warning: you must enter a nickname that is less than 32 characters long! (${inputtedNick.length} characters were entered)!`);
        memb.setNickname(inputtedNick, `setnick command has been used by ${msg.author.tag}`);
        msg.channel.send(`:white_check_mark: Done. Changed nickname to **${inputtedNick}**`);
      } else {
        return msg.channel.send(":warning: "+msg.author+" you do not have the `MANAGE_NICKNAMES` permission!");
      }
}

exports.help = {
  name: 'rename',
  description: "Change a user's nickname.",
  usage: 'rename [mention] [new nickname]',
  category: 'Moderation',
  mPerm: 'Manage Nicknames',
  bPerm: 'Manage Nicknames'
};