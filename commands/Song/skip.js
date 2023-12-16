const { MessageEmbed } = require("discord.js");

module.exports = {
  name: `skip`,
  category: `Song`,
  aliases: [`next`, "s"],
  description: `Votes to skip the current playing song`,
  usage: `skip`,
  run: async (client, message, args, cmduser, text, prefix) => {
  //get the voice channel of the member
  const { channel } = message.member.voice;
  //if he is not connected to a vc return error
  if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
  //send error if member is Deafed
  if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
  //get voice channel of the bot
  const botchannel = message.guild.me.voice.channel;
  //get the music player
  const player = client.manager.players.get(message.guild.id);
  const members = message.member.voice.channel.members.size - 1;
  //if no player or no botchannel return error
  if (!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
  //if queue size too small return error
  if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Nothing playing in this server**`);
  //if user is not in the right channel as bot, then return error
  if (player && channel.id !== player.voiceChannel)
    return message.channel.send(`**:x: You need to be in the same voice channel as ${client.user.username} to use this command**`);
   
  // Calculate the number of votes needed to skip the current song
  const required = Math.ceil(members / 2);
  const votes = player.get("votes") || [];
  // If the user has already voted, return an error message
  if (votes.includes(message.author.id)) {
    return message.channel.send(`:x: **You have already voted to skip this song.**`);
  } else {
    // Add the user's vote to the list of current votes
    votes.push(message.author.id);
    player.set("votes", votes);
    if (votes.length >= required) {
      // If enough votes have been cast, skip the current song
      player.stop();
      message.channel.send(`**:fast_forward: Skipped :thumbsup: | ${votes.length}/${required} votes.**`);
      votes.splice(0, votes.length);
    } else {
      message.channel.send(`:ballot_box_with_check: **${message.author.username}** has voted to skip! ${votes.length}/${required} votes needed.`);

    }
  }
}
};
