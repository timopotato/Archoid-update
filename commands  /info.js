const { RichEmbed, version } = require("discord.js");
const moment = require("moment");
const momentPreciseRangePlugin = require("moment-precise-range-plugin");
const dateFormat = require("dateformat");
const ordinal = require("ordinal");
const n = "\n"
dateFormat.masks.UTCtime = 'UTC: ddd, dS mmmm, yyyy';

exports.help = {
    name: 'info',
    description: 'Get information on everything on your server. Options are: user, server, role and channel',
    usage: 'info [option]',
    category: 'Information',
    mPerm: 'None',
    bPerm: 'Send Messages and Send Embeds'
};

exports.run = async (client, msg, args) => {
    let opt = args[0];
    if (!opt) return msg.channel.send("Please provide a first option.");
    if (opt === "user") {
        // check: is the message mentions empty. if it is, then use msg.member, else get first mention
        let member = msg.mentions.members.first() || msg.guild.members.get(args[1]) || msg.member;
        // Calculate difference in days between now and when they made their account.
        let diffCreated = `${moment(new Date()).diff(moment(member.user.createdAt), 'days')} day(s)`;
        let diffJoined = `${moment(new Date()).diff(moment(member.joinedAt), 'days')} day(s)`;
        if (moment(new Date()).diff(moment(member.user.createdAt), 'days') < 1) diffCreated = "Less than a day";
        if (moment(new Date()).diff(moment(member.joinedAt), 'days') < 1) diffJoined = "Less than a day";

        let readableStatus;
        switch (member.user.presence.status) {
            case "online":
                readableStatus = "Online";
                break;
            case "offline":
                readableStatus = "Offline/Invisible";
                break;
            case "idle":
                readableStatus = "Idle";
                break;
            case "dnd":
                readableStatus = "Do Not Disturb";
                break;
        }

        const game = member.user.presence.game;
        let playingType = "Not playing a game.";
        let isPlaying;

        if (game) {
            if (game.name) isPlaying = true;
            switch (game.type) {
                case 0:
                    playingType = "Playing";
                    break;
                case 1:
                    playingType = "Streaming";
                    break;
                case 2:
                    playingType = "Listening";
                    break;
                case 3:
                    playingType = "Watching";
                    break;
            }
        }
        const embed = new RichEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor("#ffff00")
            .setFooter(`User ID: ${member.id}`)
            .addField("Account Created", `${dateFormat(member.user.createdAt, "UTCtime")}` + n + `(${diffCreated} ago)`, true)
            .addField("Joined Server", `${dateFormat(member.joinedAt, "UTCtime")}` + n + `(${diffJoined} ago)`, true)
            .addField("Nickname", member.displayName)
            .addField("Roles", `${member.roles.size - 1}`, true)
            .addField("Highest Role", member.highestRole.name, true)
            .setTimestamp();
        let desc = `**Status:** ${readableStatus}`;
        if (isPlaying)
            desc = `**Status:** ${readableStatus}` + n + `**Playing:** ${game.name}`;
        embed.setDescription(desc);
        msg.channel.send({ embed })
    }
    if (opt === "server") {
        const g = await msg.guild.fetchMembers();

        let verificationLevel;
        switch (g.verificationLevel) {
            case 0:
                verificationLevel = "None";
                break;
            case 1:
                verificationLevel = "Low";
                break;
            case 2:
                verificationLevel = "Medium";
                break;
            case 3:
                verificationLevel = "High";
                break;
            case 4:
                verificationLevel = "Very High";
                break;
        }

        const highestRole = g.roles.find(r => r.calculatedPosition === g.roles.size - 1).name;
        const diffCreated = `${moment(new Date()).diff(moment(g.createdAt), 'days')} day(s)`;
        if (diffCreated < 1) diffCreated = "Less than a day";

        const embed = new RichEmbed()
        embed.setTitle(g.name)
            .setThumbnail(g.iconURL)
            .setTimestamp()
            .setDescription(`Created at: ${dateFormat(g.createdAt, "UTCtime")} (${diffCreated} ago)`)
            .setColor("#ffff00")
            .setFooter(`Server ID: ${g.id}`)
            .addField("**Membercount:** ", g.members.size, true)
            .addField("**Owner:** ", g.owner, true)
            .addField("Channels", `${g.channels.size} (${g.channels.filter(c => c.type === "text").size} text, ${g.channels.filter(c => c.type === "voice").size} voice, ${g.channels.filter(c => c.type === "category").size} categor${g.channels.filter(c => c.type === "category").size > 1 ? 'ies' : 'y'})`)
            .addField("Roles", g.roles.size, true)
            .addField("Highest Role", highestRole, true)
            .addField("Region", g.region, true)
            .addField("Verification Level", verificationLevel, true);

        // Isn't the channels line ugly?
        //.addField("Special Features", g.features) // Docs say Array<Object> but in official docs it's an array. I'm confused and commenting this out for now.
        msg.channel.send({ embed });
    }
    if (opt === "role") {
        const roleName = args.slice(1).join(" ");
        if (!roleName) return msg.channel.send("Please provide the name of a role in this server.");
        let role = msg.guild.roles.filter(r => r.name.toLowerCase() === roleName.toLowerCase());
        if (role.size < 1) return msg.channel.send("Please provide the name of a role in this server.");
        if (role.size === 1) role = role.first(); // It will throw an error otherwise.
        if (role.size > 1) role = await client.multiChoiceRole(msg, role);
        if (!role) return;

        let diffCreated = `${moment(new Date()).diff(moment(role.createdAt), 'days')} day(s)`;
        if (moment(new Date()).diff(moment(role.createdAt), 'days') < 1) diffCreated = "Less than a day";

        let relativePos = ordinal(msg.guild.roles.size - role.calculatedPosition);
        relativePos = ` ${relativePos} `;
        if (relativePos === " 1st ") relativePos = " ";

        const getRoleMembers = () => {
            if (role.members.size < 30 && role.members.size > 0) {
                let membArr = role.members.array().map(m => m.id);
                let mentionArr = membArr.map(memb => `<@${memb}>`)
                let finalMentions = mentionArr.join(", ");
                return finalMentions;
            } else {
                return role.members.size;
            }
        }

        const embed = new RichEmbed()
            .setTimestamp()
            .setFooter(`Role ID:  ${role.id}`)
            .setTitle(role.name)
            .setColor(role.hexColor !== '#000000' ? role.hexColor : '#ffff00')
            .addField("Role Created", `${dateFormat(role.createdAt, "UTCtime")}` + n + `(${diffCreated} ago)`, true)
            .addField("Permission Number", role.permissions, true)
            .addField("Position", `${relativePos}highest role.`)
            .addField(`Colour`, role.hexColor, true)
            .addField(`Members ${role.members.size !== 0 && role.members.size < 30 ? `(${role.members.size})` : `\u200B`}`, `${getRoleMembers()}`)
            .addField(`Hoisted`, `${role.hoist ? 'Yes' : 'No'}`, true)
            .addField(`Mentionable`, `${role.mentionable ? 'Yes' : 'No'}`, true);


        msg.channel.send({ embed });
    }
    if (opt === "channel") {
        const diffCreated = `${moment(new Date()).diff(moment(msg.channel.createdAt), 'days')} day(s)`;
        const embed = new RichEmbed()
        embed.setTitle(msg.channel.name)
            .setTimestamp()
            .setDescription(`Created at: ${dateFormat(msg.channel.createdAt, "UTCtime")} (${diffCreated} ago)`)
            .setColor("#ffff00")
            .setFooter(`Channel ID: ${msg.channel.id}`)
        msg.channel.send({ embed });
    }
};


