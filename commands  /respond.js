exports.run = async (bot, msg, args) => {
  if (msg.channel.id === "418430304437534730") {
    const n = "\n";
    const key = args[0];
    if (!key)
      return msg.channel.send(`You must provide a valid number to reply to`)
    if (bot.contactChannel.get(String(key)) === null)
      return msg.channel.send(`You must provide a valid number to reply to...`)
    const reply = args.slice(1).join(" ");
    if (!reply)
      return msg.channel.send(":warning: you must give a reply to the contact!")
    const channelID = bot.contactChannel.get(key)
    const userID = bot.contactUser.get(key)
    msg.channel.send(":white_check_mark: Done. You have replied succesfully!")
    bot.contactTimeout.delete(userID)
    bot.channels.get(channelID).send(`<@${userID}> the support team has replied to your contact:` + n + "```" + reply + "```")
  }
}

exports.help = {
  name: 'respond',
  description: "Reply to a contact",
  usage: 'reply [contact number] [reply]',
  category: 'Support',
  mPerm: 'Support Team',
  bPerm: 'None'
};