const { MessageEmbed } = require('discord.js');

module.exports = {
  name: `queue`,
  category: `Queue`,
  aliases: [`q`, "list"],
  description: `Show Queue`,
  usage: `Queue`,
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
      if(!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
      //if queue size too small return error
      if(!player.current < 1) return message.channel.send(`**:x: Nothing playing in this server**`);
      //if user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as ${client.user.username} to use this command**`);
      //if bot connected bot not with the lavalink player then try to delete the player
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
     const queue = player.queue;
    const embed = new MessageEmbed().setTitle(`Queue for ${message.guild.name}`);

    const multiple = 10;
    let page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    let end = page * multiple;
    let start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embed.setAuthor(`Current Playing: ${queue.current.title}\nRequested by: ${queue.current.requester.username}`,`${client.user.displayAvatarURL(dynamic = true)}`,`${queue.current.uri}`);
    let thumbnailURL = '';
    if (queue.current.uri.includes("soundcloud")) {
        thumbnailURL = queue.current.thumbnail || queue.current.displayThumbnail();
    } else if (queue.current.uri.includes("youtube")) {
        thumbnailURL = `https://img.youtube.com/vi/${queue.current.identifier}/maxresdefault.jpg`;
    }
  
      if (thumbnailURL) {
          embed.setThumbnail(thumbnailURL);
      }

    if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));

    const maxPages = Math.ceil(queue.length / multiple);

    embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

    message.channel.send(embed).then(msg => {
  if (maxPages > 1) {
    msg.react("⬅️").then(() => msg.react("➡️")).then(() => msg.react("❌"));
    const filter = (reaction, user) => ["⬅️", "➡️", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = msg.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", reaction => {
      reaction.users.remove(message.author.id);
      if (reaction.emoji.name === "⬅️") {
        if (page === 1) return;
        page--;
      } else if (reaction.emoji.name === "➡️") {
        if (page === maxPages) return;
        page++;
      } else if (reaction.emoji.name === "❌") {
        msg.delete();
        return;
      }

        let start = (page - 1) * multiple;
        let end = start + multiple;
        const tracks = queue.slice(start, end);

          embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));
          embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);
          msg.edit(embed);
        });
      }
    });
  }
};

/*

*/