const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "prefix",
    category: "Information",
    cooldown: 2,
    usage: "prefix <new-prefix>",
    description: "set a new prefix of the bot",
    run: async (client, message, args, user, text, prefix) => {
    if (message.author.bot || message.webhookID || !message.guild) return;
    let Prefix = await client.settings.get(`prefix_${message.guild.id}`);
    if (!Prefix) Prefix = config.prefix;
      
    const NewPrefix = args.join(" ");

    if (!NewPrefix) return message.channel.send(`Provide a new prefix to set!`).then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix.length > 10) return message.channel.send(`That prefix is too long to set as prefix`).then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix === Prefix) return message.channel.send(`This prefix is already set currently!`).then(m=>m.delete({timeout:5000}).catch(e=>{}));
    const Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`New Prefix - ${NewPrefix}`)
      .setFooter(`Set by ${message.author.username}`)
      .setTimestamp();
      await client.settings.set(`prefix_${message.guild.id}`, NewPrefix);
      try {
      return message.channel.send(Embed).then(m=>m.delete({timeout:9000}).catch(e=>{}));
    } catch (error) {
      return message.channel.send(`New Prefix - ${NewPrefix}`);
    };
  }
}
