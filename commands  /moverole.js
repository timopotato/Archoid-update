exports.run = async (bot, msg, args) => {
    if (msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
        let archoid = msg.guild.me
        let role = args.slice(1).join(" ");
        if (!role) return msg.channel.send(":warning: You must give a role to change the position of!");
        if (!msg.guild.roles.find("name", role)) return msg.channel.send(":warning: I cannot find this role, did you spell it right?");
        let roleObj = msg.guild.roles.find("name", role);
        let rolePos = roleObj.position;
        let archoidHighRole = archoid.highestRole.position;
        let authorHighestRole = msg.member.highestRole.position;
        if (rolePos >= authorHighestRole && rolePos >= archoidHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your and my role!");
        if (rolePos >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your role!");
        if (rolePos >= archoidHighRole) return msg.channel.send(":warning: That role is higher than my role!");
        let postion69 = args[0];
        roleObj.setPosition(`${postion69}`)
        msg.channel.send(`:white_check_mark: Done. Changed the postion of ${role} to ${postion69}!`)
    } else {
        return msg.channel.send(":warning: You do not have the ``MANAGE_ROLES`` permission!");
    }
}

exports.help = {
    name: 'moverole',
    description: "Changes the position of a given role. Counting goes from buttom to top.",
    usage: 'moverole [position] [role name]',
    category: 'Rolemanagement',
    mPerm: 'Manage Roles',
    bPerm: 'Manage Roles'
};