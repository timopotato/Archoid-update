exports.run = async (bot, msg, args) => {
    if (msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
        let archoid = msg.guild.me
        let role = args.slice(1).join(" ");
        if (!role) return msg.channel.send(":warning: You must give a role to change color of!");
        if (!msg.guild.roles.find("name", role)) return msg.channel.send(":warning: I cannot find this role, did you spell it right?");
        let roleObj = msg.guild.roles.find("name", role);
        let rolePos = roleObj.position;
        let archoidHighRole = archoid.highestRole.position;
        let authorHighestRole = msg.member.highestRole.position;
        if (rolePos >= authorHighestRole && rolePos >= archoidHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your and my role!");
        if (rolePos >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your role!");
        if (rolePos >= archoidHighRole) return msg.channel.send(":warning: That role is higher than my role!");
        let colour = args[0];
        if (!isHex(colour)) return msg.channel.send("All characters in the colour must be between 0 and 9, and a to f.");
        roleObj.setColor(`${colour}`)
        msg.channel.send(`:white_check_mark: Done. Changed the color of ${role} to ${colour}!`)
            .catch(error => msg.channel.send(":warning: The given color is not a hex color."));
    } else {
        return msg.channel.send(":warning: You do not have the ``MANAGE_ROLES`` permission!");
    }
}

exports.help = {
    name: 'colorrole',
    description: "Changes the color of a given role.",
    usage: 'colorrole [HEX-code] [role name]',
    category: 'Rolemanagement',
    mPerm: 'Manage Roles',
    bPerm: 'Manage Roles'
};