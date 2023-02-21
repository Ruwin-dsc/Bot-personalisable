const fs = require("fs");

module.exports = async (client) => {
let config = require("./../../config.json")
console.log(`
                                 ___________________________________________________ \n`.blue)
console.log(`[BOTS]`.blue + `                           Informations du bot ` + `${client.user.username}`.yellow + `#${client.user.discriminator}` + ` (` + `${client.user.id}`.blue + `) \n> ` + 
  `                                                        ${client.guilds.cache.size}`.blue + ` guildes \n> ` + 
`                                                        ${client.users.cache.size}`.blue +  ` membres`)

// -- Définir les guildes

let str_content = { 
    prefix: '+',
    color: "#2f3136",
    giveaway: {
        duree: "1",
        channel: "876437219022368792",
        gagnant: false,
        voice: false,
        gain: "Nitro Classic",
        last: "704833402515488880"
    },
    statut: {
        role: "876437218581942289",
        state: "discord.gg/npg",
        module: false
    },
    tempo: {
        category: "876437218607128635",
        channel: "876437219022368792",
        emoji: "🌊",
        module: false
    },
    logs: {
        serveur: false,
        vocal: false,
        role: false,
        message: false
    },
    membercounter: {
        guild: "667",
        total: "667",
        totalformat: "🌹 Membres: <count>",
        online: "667",
        onlineformat: "🌹 En ligne: <count>",
        vocal: "667",
        vocalformat: "🌹 En vocal: <count>",
    },
    autorole: {
        role: "876437218581942289",
        module: false
    },
    mods: {
        logs: "876437219022368791",
        mute: "876437219022368791",
        muted: "876437219022368791",
        ban: "876437219022368791"
    }
};
let str_data = JSON.stringify(str_content);
// --
await client.guilds.cache.forEach(async g => {
await fs.readFile(`./serveur/${g.id}.json`, async (err, data) => {
        if (err) await fs.writeFileSync(`./serveur/${g.id}.json`, str_data);
});
});

var interval = setInterval (function () {

// -- 
client.guilds.cache.forEach(guild => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${guild.id}.json`, "utf8"));
    if(db) { 
    var guild = client.guilds.cache.get(db.membercounter.guild)
    if(!guild) return;
    if(db.membercounter.total !== false) { 
    var total = guild.channels.cache.get(db.membercounter.total)
    if(total) total.setName(db.membercounter.totalformat.replace(`<count>`, guild.memberCount)).catch(console.error)
    } 
    
    if(db.membercounter.vocal !== false) {
        var vocal = guild.channels.cache.get(db.membercounter.vocal)
        if(vocal) vocal.setName(db.membercounter.vocalformat.replace(`<count>`, guild.members.cache.filter(m => m.voice.channel).size)).catch(console.error)
    }
    
    if(db.membercounter.online !== false) {
        var online = guild.channels.cache.get(db.membercounter.online)
        if(online) online.setName(db.membercounter.onlineformat.replace(`<count>`, guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size)).catch(console.error)
    }
    
    }
    });
    
}, 1 * 300000); 
// -- 
client.guilds.cache.forEach(guild => {
fs.readFile(`./serveur/${guild.id}.json`, async (err, data) => {
        if (err) return;
});
let db = JSON.parse(fs.readFileSync(`./serveur/${guild.id}.json`, "utf8"));
if(db) { 
var guild = client.guilds.cache.get(db.membercounter.guild)
if(!guild) return;
if(db.membercounter.total !== false) { 
var total = guild.channels.cache.get(db.membercounter.total)
if(total) total.setName(db.membercounter.totalformat.replace(`<count>`, guild.memberCount)).catch(console.error)
} 

if(db.membercounter.vocal !== false) {
    var vocal = guild.channels.cache.get(db.membercounter.vocal)
    if(vocal) vocal.setName(db.membercounter.vocalformat.replace(`<count>`, guild.members.cache.filter(m => m.voice.channel).size)).catch(console.error)
}

if(db.membercounter.online !== false) {
    var online = guild.channels.cache.get(db.membercounter.online)
    if(online) online.setName(db.membercounter.onlineformat.replace(`<count>`, guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size)).catch(console.error)
}

}
});
};