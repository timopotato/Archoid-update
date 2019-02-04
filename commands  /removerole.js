exports.run = async (bot, msg, args) => {
    let archoid = msg.guild.me
    if (args[0] === "everyone") {
        if (msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
            let roleToremoved = args.slice(1).join(" ");
            if (!roleToremoved) return msg.channel.send(":warning: You must give a role to removed!");
            if (!msg.guild.roles.find("name", roleToremoved)) return msg.channel.send(":warning: I cannot find this role, did you spell it right?");
            let roleObj = msg.guild.roles.find("name", roleToremoved);
            let authorHighestRole = msg.member.highestRole.position;
            let archoidHighRole = archoid.highestRole.position;
            let rolePos = roleObj.position;
            if (rolePos >= authorHighestRole && rolePos >= archoidHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your and my role!");
            if (rolePos >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your role!");
            if (rolePos >= archoidHighRole) return msg.channel.send(":warning: That role is higher than my role!");
            msg.guild.members.forEach(m => m.removeRole(msg.guild.roles.find('name', roleToremoved))); msg.channel.send(`:white_check_mark: Removing the role from ${msg.guild.memberCount} members, this could take a while...`);
        } else {
            msg.channel.send(":warning: You dont have the `ADMINISTRATOR` permission!")
        }
    } else {
        let archoid = msg.guild.me
        if (msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
            let roleToremoved = args.slice(1).join(" ");
            let memb = msg.mentions.members.first();
            if (!memb) return msg.channel.send(":warning: You must mention someone of this server!");
            if (!roleToremoved) return msg.channel.send(":warning: You must give a role to removed!");
            if (!msg.guild.roles.find("name", roleToremoved)) return msg.channel.send(":warning: I cannot find this role, did you spell it right?");
            let roleObj = msg.guild.roles.find("name", roleToremoved);
            let authorHighestRole = msg.member.highestRole.position;
            let archoidHighRole = archoid.highestRole.position;
            let rolePos = roleObj.position;
            if (rolePos >= authorHighestRole && rolePos >= archoidHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your and my role!");
            if (rolePos >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your role!");
            if (rolePos >= archoidHighRole) return msg.channel.send(":warning: That role is higher than my role!");
            memb.removeRole(roleObj, `removedrole command executed by ${msg.author.tag}`).catch(console.error);
            msg.channel.send(`:white_check_mark: Done. removeded **${roleToremoved}** from <@${memb.id}>`);
        } else {
            return msg.channel.send(":warning: You do not have the ``MANAGE_ROLES`` permission!");
        }

    }
}

exports.help = {
    name: 'removerole',
    description: "Remove a role from a user or everyone in the server.",
    usage: 'removerole [mention/everyone] [role name]',
    category: 'Rolemanagement',
    mPerm: 'Manage Roles',
    bPerm: 'Manage Roles'
};