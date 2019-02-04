exports.run = async (bot, msg, args) => {
    let archoid = msg.guild.me
    if (args[0] === "everyone") {
        if (msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
            let roleToAdd = args.slice(1).join(" ");
            if (!roleToAdd) return msg.channel.send(":warning: You must give a role to add!");
            if (!msg.guild.roles.find("name", roleToAdd)) return msg.channel.send(":warning: I cannot find this role, did you spell it right?");
            let roleObj = msg.guild.roles.find("name", roleToAdd);
            let authorHighestRole = msg.member.highestRole.position;
            let archoidHighRole = archoid.highestRole.position;
            let rolePos = roleObj.position;
            if (rolePos >= authorHighestRole && rolePos >= archoidHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your and my role!");
            if (rolePos >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your role!");
            if (rolePos >= archoidHighRole) return msg.channel.send(":warning: That role is higher than my role!");
            msg.guild.members.forEach(m => m.addRole(msg.guild.roles.find('name', roleToAdd))); msg.channel.send(`:white_check_mark: Adding the role to ${msg.guild.memberCount} members, this could take a while...`);
        } else {
            msg.channel.send(":warning: You do not have the `ADMINISTRATOR` permission!")
        }
    } else {
        if (msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
            let roleToAdd = args.slice(1).join(" ");
            let memb = msg.mentions.members.first();
            if (!memb) return msg.channel.send(":warning: You must mention someone of this server to add the role to!");
            if (!roleToAdd) return msg.channel.send(":warning: You must give a role to add!");
            if (!msg.guild.roles.find("name", roleToAdd)) return msg.channel.send(":warning: I cannot find this role, did you spell it right?");
            let roleObj = msg.guild.roles.find("name", roleToAdd);
            let authorHighestRole = msg.member.highestRole.position;
            let archoidHighRole = archoid.highestRole.position;
            let rolePos = roleObj.position;
            if (rolePos >= authorHighestRole && rolePos >= archoidHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your and my role!");
            if (rolePos >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your role!");
            if (rolePos >= archoidHighRole) return msg.channel.send(":warning: That role is higher than my role!");
            memb.addRole(roleObj, `addrole command executed by ${msg.author.tag}`).catch(console.error);
            msg.channel.send(`:white_check_mark: Done. Added **${roleToAdd}** to <@${memb.id}>`);
        } else {
            return msg.channel.send(":warning: You do not have the ``MANAGE_ROLES`` permission!");
        }

    }
}

exports.help = {
    name: 'addrole',
    description: 'Adds a role to a specific user or everyone in the server.',
    usage: 'addrole [mention] / everyone [role name]',
    category: 'Rolemanagement',
    mPerm: 'Manage Roles',
    bPerm: 'Manage Roles'
};

