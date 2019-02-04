exports.run = (bot, msg, args) => {
    const n = "\n";
    const translate = require('google-translate-api');
    let text = args.slice(1).join(" ");
    let language = args[0]
    let language2;
    if (!text)
      return msg.channel.send(":warning: You must provide text to translate!");
    if (!language)
      return msg.channel.send(":warning: you must provide a language to translate to, example: =translate nl hello");
    translate(text, { to: language }).then(res => {
      msg.channel.send('```' + res.from.language.iso + `: ${text}` + n + `${language}: ` + res.text + '```');
    })
  }

  exports.help = {
    name: 'translate',
    description: "Translate text into other languages.",
    usage: 'translate [language to translate to] [text]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages and Send Embeds'
};