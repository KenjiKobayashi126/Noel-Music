//here the event starts
const config = require("../../botconfig/config.json")
module.exports = client => {
  try{
    const stringlength = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
  }catch{/* */ }

  /*try{
    client.user.setActivity("!!?help / !!?commands", { type: "PLAYING" });
  }catch (e) {
      console.log(String(e.stack).red);
  }*/
  //Change status each 10 minutes
  let users = 0;
    client.guilds.cache.forEach(x => {
      users += x.memberCount;
    });
  function toFancyNum(users) {
      return String(users).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const activities = [
    `${config.prefix}help / ${config.prefix}commands`,
    `${toFancyNum(client.guilds.cache.size)} Servers ${toFancyNum(users)} Users`,
    `${config.prefix}help / ${config.prefix}commands`,
    `${toFancyNum(client.guilds.cache.size)} Servers ${toFancyNum(users)} Users`
    ];
    setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity, { type: "PLAYING" });
  }, 5000);
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/