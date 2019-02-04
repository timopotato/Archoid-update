exports.run = async (bot, msg, args) => {
    if (msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR")|| msg.author.id === bot.config.ownerID) {
        let archoid = msg.guild.me
        const name = args.slice(0).join(" ");
        if (!name)
            return msg.channel.send(":warning: You must provide a name for the role")
        if (name.length > 100)
            return msg.channel.send(":warning: The name of a role cannot be longer than 100 characters")
        msg.guild.createRole({
            name: name,
        })
            .then(role => msg.channel.send(`:white_check_mark: Done. Created new role with name ${role.name}!`))
    } else {
        return msg.channel.send(":warning: You do not have the ``MANAGE_ROLES`` permission!");
    }
}

exports.help = {
    name: 'createrole',
    description: "Creates a role in the server.",
    usage: 'createrole [role name]',
    category: 'Rolemanagement',
    mPerm: 'Manage Roles',
    bPerm: 'Manage Roles'
};