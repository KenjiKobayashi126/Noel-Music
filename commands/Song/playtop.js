const {
  MessageEmbed
} = require(`discord.js`);
const playermanager = require(`../../handlers/lavalink/playermanager`);
module.exports = {
  name: `playtop`,
  category: `Song`,
  aliases: [`ptop`, `pt`],
  description: `Adds a song with the given name/url on the top of the queue`,
  usage: `playtop <link/query>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    const {
      channel
    } = message.member.voice;
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    //send error if member is Deafed
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
    const botchannel = message.guild.me.voice.channel;
    //if no args added return error message if allowed to send an embed
    if (!args[0]) {
      let string = `${prefix}playtop <link/query>`
      let embed = new MessageEmbed()
        .setTitle("**:x: Invalid usage**")
        .setDescription(string)
        .setColor("#ff0000")
      if (message.guild.me.hasPermission("EMBED_LINKS")) {
        message.channel.send(embed)
      } else {
        message.channel.send("**:x: Invalid usage**\n" + string)
      }
      return;
    }
    ///get the player
    const player = client.manager.players.get(message.guild.id);
    //if user is not in the right channel as bot, then return error
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as ${client.user.username} to use this command**`);
    //if bot connected bot not with the lavalink player then try to delete the player
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    if (!message.member.roles.cache.some(role => role.name === 'DJ') &&
       !message.member.hasPermission("MANAGE_CHANNELS") && !message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("ADMINISTRATOR")
       ) {
      return message.reply(`You don't have permission to use this command`);
    } 
    //IF YOUTUBE SEND INFO WITH YOUTUBE
    if (message.content.includes("youtu")) {
      //send searching
      message.channel.send(`<:youtube:873503175594893343> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
      //IF SPOTIFY SEARCH SEND INFO WITH SPOTIFY
    } else if (message.content.includes("spotify")) {
      //send searching
      message.channel.send(`<:spotify:873503176630870066> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
      //IF SOUNDCLOUD SEARCH SEND INFO WITH SOUNDCLOUD
    } else if (message.content.includes("soundcloud")) {
      //send searching
      message.channel.send(`<:soundcloud:873503176307908698> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:soundcloud`);
      //ELSE SEND RYTHM INFO
    } else if (message.content.includes("http")) {
      //send searching
      message.channel.send(`<a:tickpremium:842289629575381002> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
    } else {
      //send searching
      message.channel.send(`<:youtube:873503175594893343> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
    }
  }
};