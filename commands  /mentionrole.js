exports.run = async (bot, msg, args) => {
    if (msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
        let archoid = msg.guild.me
        let thing;
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
        if (args[0] == "true") {
            roleObj.setMentionable(true, 'Updated mentionable')
        }
        if (args[0] == "false") {
            roleObj.setMentionable(false, 'Updated mentionable')
        }
        return msg.channel.send(":white_check_mark: Done. Toggled mention function of the role")
    } else {
        return msg.channel.send(":warning: You do not have the ``MANAGE_ROLES`` permission!");
    }
}

exports.help = {
    name: 'mentionrole',
    description: "Toggle if a role is mentionable.",
    usage: 'mention role [true/false] [role name]',
    category: 'Rolemanagement',
    mPerm: 'Manage Roles',
    bPerm: 'Manage Roles'
};