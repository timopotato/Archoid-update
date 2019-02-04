// The uh... 'required' requires for this command to work.
const { get } = require('snekfetch');
const Discord = require('discord.js');
const api = "http://api.urbandictionary.com/v0/define?term=";

module.exports.run = async (bot, msg, args) => {
    try {
        const word = args.join(" ");
        if (!word) return msg.channel.send("You must provide a term to obtain the definition of.");
        const data = await get(`${api}${word}`);
        const res = data.body;
        if (res.result_type === "no_results") return msg.channel.send("No results found.");
        // res.list is an array of objects of the term data. We just need the first one, 
        // UD automatically sorts it by rating for us.
        let wordData = res.list[0];
        const embed = new Discord.RichEmbed();
        embed.setURL(wordData.permalink);
        embed.setColor('GREEN');
        embed.setTitle(word);
        embed.setDescription(wordData.definition || 'None.')
        embed.addField(`Example`, wordData.example || 'None.');
        await msg.channel.send({ embed });
    } catch (e) {
        console.log(`urban command failed ${e.stack}`);
        await msg.channel.send(`:warning: I could not find this word, sorry.`);
    }
}

exports.help = {
    name: 'urban',
    description: "Use urbandictionairy to know what a word means.",
    usage: 'urban [word]',
    category: 'Amusement',
    mPerm: 'None',
    bPerm: 'Send Messages and Send Embeds'
};