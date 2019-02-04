exports.run = (bot, msg, args) => {
    let member = msg.mentions.members.first() || msg.member;
    let user = msg.mentions.users.first() || msg.author;
    const n = "\n";
    let perms = member.permissions;
    let has_create_invite = member.hasPermission("CREATE_INSTANT_INVITE");
    let has_kick = member.hasPermission("KICK_MEMBERS");
    let has_ban = member.hasPermission("BAN_MEMBERS");
    let has_admin = member.hasPermission("ADMINISTRATOR");
    let has_manage_channels = member.hasPermission("MANAGE_CHANNELS");
    let has_manage_guild = member.hasPermission("MANAGE_GUILD");
    let has_add_reactions = member.hasPermission("ADD_REACTIONS");
    let has_read_messages = member.hasPermission("READ_MESSAGES");
    let has_send_messages = member.hasPermission("SEND_MESSAGES");
    let has_send_TTS_messages = member.hasPermission("SEND_TTS_MESSAGES");
    let has_manage_messages = member.hasPermission("MANAGE_MESSAGES");
    let has_embed_links = member.hasPermission("EMBED_LINKS");
    let has_attach_files = member.hasPermission("ATTACH_FILES");
    let has_read_message_history = member.hasPermission("READ_MESSAGE_HISTORY");
    let has_mention_everyone = member.hasPermission("MENTION_EVERYONE");
    let has_external_emotes = member.hasPermission("EXTERNAL_EMOJIS");
    let has_connect = member.hasPermission("CONNECT");
    let has_speak = member.hasPermission("SPEAK");
    let has_mute_members = member.hasPermission("MUTE_MEMBERS");
    let has_deafen_members = member.hasPermission("DEAFEN_MEMBERS");
    let has_move_members = member.hasPermission("MOVE_MEMBERS");
    let has_change_nickname = member.hasPermission("CHANGE_NICKNAME");
    let has_manage_nicknames = member.hasPermission("MANAGE_NICKNAMES");
    let has_manage_roles = member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
    let has_manage_webhooks = member.hasPermission("MANAGE_WEBHOOKS");
    let has_manage_emojis = member.hasPermission("MANAGE_EMOJIS");
    if (has_admin) {
      msg.channel.send("That user has administrator perm")
    } else {
      msg.channel.send('```' + `Perms for ${user.tag}` + n + " " + n + `• Create invite: ${has_create_invite}` + n + `• Kick members: ${has_kick}` + n + `• Ban members: ${has_ban}` + n + `• Manage server: ${has_manage_guild}` + n + `• Manage channels: ${has_manage_channels}` + n + `• Add reactions: ${has_add_reactions}` + n + `• Read messages: ${has_read_messages}` + n + `• Send messages: ${has_send_messages}` + n + `• Send TTS messages: ${has_send_TTS_messages}` + n + `• Manage messages: ${has_manage_messages}` + n + `• Embed links: ${has_embed_links}` + n + `• Attach files: ${has_attach_files}` + n + `• Read message history: ${has_read_message_history}` + n + `• Mention everyone: ${has_mention_everyone}` + n + `• External emotes: ${has_external_emotes}` + n + `• Connect: ${has_connect}` + n + `• Speak: ${has_speak}` + n + `• Mute members: ${has_mute_members}` + n + `• Deafen members: ${has_deafen_members}` + n + `• Move members: ${has_move_members}` + n + `• Change nickname: ${has_change_nickname}` + n + `• Manage_nicknames: ${has_manage_nicknames}` + n + `• Manage_roles: ${has_manage_roles}` + n + `• Manage webhooks: ${has_manage_webhooks}` + n + `• Manage emoji's: ${has_manage_emojis}` + '```')
    }
  }

  exports.help = {
    name: 'perms',
    description: "Check the permissions of a user.",
    usage: 'perms [mention]',
    category: 'Information',
    mPerm: 'None',
    bPerm: 'Send Messages'
};