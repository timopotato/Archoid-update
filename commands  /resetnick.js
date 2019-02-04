exports.run = (bot, msg, args) => {
    if (msg.member.hasPermission('MANAGE_ROLES')|| msg.author.id === bot.config.ownerID) {
        msg.guild.members.map(m => { m.setNickname(''); })
        msg.channel.send(`:white_check_mark: Reseting ${msg.guild.memberCount} nicknames. This will take a while.`)
      } else {
        msg.channel.send(`:warning: You do not have the MANAGE_ROLES permission!`)
      }
    }

    exports.help = {
      name: 'resetnick',
      description: "Reset all the nicknames in the server.",
      usage: 'resetnick',
      category: 'Moderation',
      mPerm: 'Administrator',
      bPerm: 'Manage Nicknames'
  };