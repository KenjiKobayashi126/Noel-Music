const config = require("../../botconfig/config.json");
module.exports = async (client, guild) => {
  let prefix = config.prefix
  let channel = guild.channels.cache.find(
    channel =>
    channel.type === "text" &&
    channel.permissionsFor(guild.me).has("SEND_MESSAGES")
  );
  channel.send(`**Thank you for adding me! :white_check_mark:**
     \`-\` My prefix here is \`${prefix}\`
     \`-\` You can see a list of commands by typing \`${prefix}help\` / \`${prefix}commands\`
     \`-\` You can change my prefix with \`${prefix}settings prefix <New Prefix>\`
     \`-\` If you need help, feel free to join our support server at **https://discord.gg/rMvwJfghXb**`);
}