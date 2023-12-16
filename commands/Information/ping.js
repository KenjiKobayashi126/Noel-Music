const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "ping",
    category: "Information",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Gives you information on how fast the Bot can respond to you",
    run: async (client, message, args, user, text, prefix) => {
    try{
      let oldate = new Date().getMilliseconds()
      message.channel.send(new MessageEmbed()
        .setColor("#00ff00")
        .setTitle(`🏓 Pinging....`)
      ).then(msg=>{
        let newtime = new Date().getMilliseconds() - oldate;
        msg.edit(new MessageEmbed()
          .setColor("#00ff00")
          .setDescription(`:hourglass: ${Date.now() - message.createdTimestamp}ms\n\n:heartbeat: ${Math.floor(client.ws.ping)}ms`)
        );
      })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}

