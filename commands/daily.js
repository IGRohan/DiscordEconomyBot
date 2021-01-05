const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const ms = require('parse-ms')

module.exports = {
    name: 'daily',
    description: 'Gives you your daily amount of free money',
    usage: 'daily',
    aliases: [],
    async execute(client, message, args) {
        const profiles = new db.table('Profile')
        const profile = profiles.get(`profiles_${message.author.id}`)
        if(profile === null) {
            return message.channel.send(`You don't seem to have a profile. Try running the command again.`)
        }

        const dailyCooldown = await profiles.fetch(`profiles_${message.author.id}.dailyCooldown`)
        if(dailyCooldown !== null && 86400000 - (Date.now() - dailyCooldown) > 0) {
            let time = ms(86400000 - (Date.now() - dailyCooldown))
            const dailyError = new MessageEmbed()
            .setDescription(`You may now claim your daily reward in ${time.hours}h, ${time.minutes}m & ${time.seconds}s`)
            .setColor('RANDOM')
            return message.channel.send(dailyError)
        } else {
            const random = Math.floor(Math.random() * 150) + 1
            profiles.add(`profiles_${message.author.id}.cash`, random)
            profiles.set(`profiles_${message.author.id}.dailyCooldown`, Date.now())
            const daily = new MessageEmbed()
            .setDescription(`Here, Take \$${random} as your daily free money!\nI've added this into your cash balance`)
            .setColor('RANDOM')
            return message.channel.send(daily)
        }  
    } 
}
