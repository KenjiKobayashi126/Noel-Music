const { MessageEmbed } = require("discord.js");

module.exports = {
  name: `volume`,
  aliases: [`v`],
  category: `Song`,
  description: `Change the player's volume`,
  usage: `volume 1-100`,
  run: async (client, message, args, cmduser, prefix, text) => {
    //get the voice channel of the member
    const {
      channel
    } = message.member.voice;
    //if he is not connected to a vc return error
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    //send error if member is Deafed
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
    //get voice channel of the bot
    const botchannel = message.guild.me.voice.channel;
    //get the music player
    const player = client.manager.players.get(message.guild.id);
    //if no player or no botchannel return error
    if (!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
    //if queue size too small return error
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Nothing playing in this server**`);
    //if user is not in the right channel as bot, then return error
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as ${client.user.username} to use this command**`);
    if (!message.member.roles.cache.some(role => role.name === 'DJ') &&
       !message.member.hasPermission("MANAGE_CHANNELS") && !message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("ADMINISTRATOR")
       ) {
      return message.reply(`You don't have permission to use this command!`);
    }

    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`Current volume is: **${player.volume}%**`);      
      return message.channel.send(embed);
    }
    const volume = parseInt(args[0]);
    if (isNaN(volume) || volume < 1 || volume > 100) {
      return message.channel.send("Please provide a volume between 1 and 100!");
    }
    player.setVolume(volume);
    const change_embed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`Volume now change to: **${player.volume}%**`);      
    await message.channel.send(change_embed)
  }
}
