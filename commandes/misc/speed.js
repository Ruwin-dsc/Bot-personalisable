const { MessageEmbed } = require("discord.js");
const { default_prefix } = require("../../config.json")
const fs = require("fs")

module.exports.run = async (client, message, args) => {
  let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

const Embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setTitle("**<a:5f96b13bdc594edf89754f99d99b6791:892035860982288514>Temps de réponse**")
.addField('> **Temps de réponse du bot**' , `${client.ws.ping}ms`)
.setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
.setTimestamp()  
.setColor(db.color)
message.channel.send(Embed)

  }
module.exports.help = {
  name: "speed",
};

