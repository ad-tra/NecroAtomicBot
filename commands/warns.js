const Schema = require('../schemas/warn')
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'warns', 
    description:'Lists a users warnings',
    async execute(message, args, client){
        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('Perms denied')

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(' ');
        if(!user) return message.channel.send('Member not found')

        Schema.findOne({guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) return message.channel.send('Something went wrong');

            if(data){
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            
                            (w, i) => 
                            `\`${i+1}\` | Moderator: ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                            
                        )
                    )
                    .setColor('RANDOM')
                
                )
            } else{
                message.channel.send('User has no data')
            }

        });

    }
}