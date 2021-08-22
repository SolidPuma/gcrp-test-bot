const fs = require('fs');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { time } = require('console');


console.log(`Puma's Test Bot has Successfully Launched. Status = Online`)

const client = new discord.Client({ disableMentions: 'everyone' });
client.config = require('./config/config');


//Kick Command 
client.on('message', message => {
    if (!message.guild) return;
    
    if (message.content.startsWith('!kick')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              return message.channel.send(KickEmbed);
            })
            .catch(err => {
              return message.channel.send(ERRORKICK);
              console.error(err);
            });
        } else {
          return message.channel.send(NISKICK);
        }
      } else {
        return message.channel.send(NYMKick);
    }
    }
  });

  //Embeds for Kick Command
const KickEmbed = new MessageEmbed()
.setColor('#9be7ff')
.setDescription('<:BotTickYes:879042197352222760> User was Sucessfully Kicked from the Server.')
.setTimestamp()
.setFooter('Golden Coast Roleplay', 'https://media.discordapp.net/attachments/879016407902335020/879038758601768990/GCRP.png?width=678&height=678');
const NYMKick = new MessageEmbed()
.setColor('#9be7ff')
.setDescription('<:BotTickNo:879042197079617546> Please Mention a Valid User to Kick.')
.setTimestamp()
.setFooter('Golden Coast Roleplay', 'https://media.discordapp.net/attachments/879016407902335020/879038758601768990/GCRP.png?width=678&height=678');
const NISKICK = new MessageEmbed()
.setColor('#9be7ff')
.setDescription('<:BotTickNo:879042197079617546> User you Mentioned is not in the Server.')
.setTimestamp()
.setFooter('Golden Coast Roleplay', 'https://media.discordapp.net/attachments/879016407902335020/879038758601768990/GCRP.png?width=678&height=678');
const ERRORKICK = new MessageEmbed()
.setColor('#9be7ff')
.setDescription('<:BotTickNo:879042197079617546> An Error Occured. You likely lack the required permissions to peform the command.')
.setTimestamp()
.setFooter('Golden Coast Roleplay', 'https://media.discordapp.net/attachments/879016407902335020/879038758601768990/GCRP.png?width=678&height=678');


//Deleted Message Log
  client.on('messageDelete', message => {
    if (message.author.bot) return;
    const DeletedMessageLog = new MessageEmbed() 
      .setAuthor('Message Deleted', 'https://media.discordapp.net/attachments/879016407902335020/879058673782108261/879057562513858560.png', '')
      .setDescription(`**User:** <@${message.author.id}> | (${message.author.tag}) | (${message.author.id}) \n**Channel:** ${message.channel}\n**Message Content:** ${message.content}`)
      .setColor('#9be7ff')
      .setFooter(`Message ID: ${message.id}`)
      .setTimestamp()
  
    const channel = client.channels.cache.get('879063093337026620')
    channel.send(DeletedMessageLog)
  })

client.login(client.config.token);