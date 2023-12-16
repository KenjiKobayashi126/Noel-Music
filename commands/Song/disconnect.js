module.exports = {
  name: `disconnect`,
  category: `Queue`,
  aliases: [`dc`, "leave", "dis"],
  description: `Disconnects the bot from the voice channel it is in.`,
  usage: `disconnect`,
  run: async (client, message, args, cmduser, text, prefix) => {
      //get the voice channel of the member
      const { channel } = message.member.voice;
      //if he is not connected to a vc return error
      if (!channel)  return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
      //send error if member is Deafed
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
      //get voice channel of the bot
      const botchannel = message.guild.me.voice.channel;
      //get the music player
      const player = client.manager.players.get(message.guild.id);
      //if no player or no botchannel return error
      if(!botchannel) return message.channel.send(`**:x: I'm not in a Voice channel to disconnect**`);
    
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as ${client.user.username} to use this command**`);
      //clear the QUEUE
      player.destroy();
      //Send Success Message
      return message.channel.send(`**:mailbox_with_no_mail: Successfully disconnected**`);
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
