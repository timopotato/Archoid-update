exports.run = async (bot, msg, args) => {
  const n = "\n";
  const mcontent = args.join(" ");
  if (bot.contactTimeout.get(msg.author.id))
    return msg.channel.send(":warning: You already sent a contact, wait for the support team to respond to it before you make another one!");
  if (!mcontent)
    return msg.channel.send(`You need to ask a questions or suggest an idea.`)
  const number = bot.contactNumber.get("current")
  const number2 = parseInt(number + 1)
  bot.contactNumber.set(msg.author.id, number2)
  bot.contactChannel.set(`${number2}`, msg.channel.id)
  bot.contactUser.set(`${number2}`, msg.author.id)
  bot.contactNumber.set("current", number2)
  bot.contactTimeout.set(msg.author.id, "banaan")
  msg.channel.send(":white_check_mark: Done. You have contacted succesfully!")
  bot.channels.get("418430304437534730").send("ID: " + number2 + " | Message: " + "```" + mcontent + "```")
}

exports.help = {
  name: 'contact',
  description: "Ask help to the developer and support team.",
  usage: 'contact [question]',
  category: 'Misc',
  mPerm: 'None',
  bPerm: 'None'
};