const db = require('quick.db')
const ms = require('parse-ms')
const { MessageEmbed } = require('discord.js')
const workData = require('../data/work.json')

module.exports = {
    name: 'work',
    description: 'Work and earn money!', 
    usage: 'work',
    aliases: [],
    async execute(client, message, args) {
        const profiles = new db.table('Profile')
        const profile = profiles.get(`profiles_${message.author.id}`)
        if(profile === null) {
            return message.channel.send(`You don't seem to have a profile. Try running the command again.`)
        }

        const workCooldown = profiles.get(`profiles_${message.author.id}.workCooldown`)
        if(workCooldown !== null && 21600000 - (Date.now() - workCooldown) > 0) {
            let time = ms(21600000 - (Date.now() - workCooldown))
            const workError = new MessageEmbed()
            .setDescription(`You're tired. Work again in ${time.hours}h, ${time.minutes}m & ${time.seconds}s`)
            .setColor('RANDOM')
            return message.channel.send(workError)
        } else {
            let random = Math.floor(Math.random() * 25) + 1 
            profiles.add(`profiles_${message.author.id}.cash`, random)
            profiles.set(`profiles_${message.author.id}.workCooldown`, Date.now())
            const randomWork = workData[Math.floor(Math.random() * workData.length)]
            const work = new MessageEmbed()
            .setDescription(`${randomWork} and earned \$${random}`)
            .setColor('RANDOM')
            return message.channel.send(work)
        }
    }
}