const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "invite",
    category: "Information",
    aliases: ["inv"],
    cooldown: 2,
    usage: "invite",
    description: "Gives you invite link",
    run: async (client, message, args, user, text, prefix) => {
    try{
      let oldate = new Date().getMilliseconds()
      message.channel.send(new MessageEmbed()
        //.setThumbnail(`https://images-ext-2.discordapp.net/external/OqtMRnq-Gu3Jz_RQuYXY3LxUBHzsmfZNV3RL6gAxnCc/https/cdn.discordapp.com/avatars/235088799074484224/9b29bfc497a70b6cc85bb2087936f8fd.png`)

        .setAuthor(`Links!`,  `https://cdn.discordapp.com/attachments/1112028646505451591/1139774787078602783/unnamed.jpg`)
        .setDescription(`[Official Discord](https://discord.gg/rMvwJfghXb)\n[Add Me](https://discord.com/api/oauth2/authorize?client_id=887943283555332117&permissions=463859936576&scope=bot)`)

                           .setFooter('Noel Music')
        //.setImage(`https://images-ext-2.discordapp.net/external/OqtMRnq-Gu3Jz_RQuYXY3LxUBHzsmfZNV3RL6gAxnCc/https/cdn.discordapp.com/avatars/235088799074484224/9b29bfc497a70b6cc85bb2087936f8fd.png`)

      )
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
