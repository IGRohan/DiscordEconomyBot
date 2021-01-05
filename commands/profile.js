const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'profile',
    description: 'Shows your profile!',
    usage: 'profile',
    aliases: [],
    async execute(client, message, args) {
        const profiles = new db.table('Profile')
        const user = message.mentions.members.first() || message.member

        let bankBalance = await profiles.fetch(`profiles_${user.id}.bankBalance`)
        if(bankBalance === null) bankBalance = 0
        let CreatedAt = profiles.get(`profiles_${user.id}.createdAt`)
        let reputation = await profiles.fetch(`profiles_${user.id}.reputation`) 
        if(reputation === null) reputation = 0
        let bio = profiles.get(`profiles_${user.id}.bio`) || 'No Bio Set'

        const profileEmbed = new MessageEmbed()
        .setAuthor(`${user.user.username}\'s Profile!`)
        .setDescription(bio)
        .addField(':bank: Bank Balance', `\$${bankBalance}`, true)
        .addField(':star: Reputation', reputation, true)
        .addField(':calendar: Registered On', CreatedAt, false)
        .setColor('#E9D8D8')
        .setTimestamp()

        message.channel.send(profileEmbed)
    }
}