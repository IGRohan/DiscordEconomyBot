const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'balance',
    description: 'Shows your or someone else\'s balance',
    usage: 'balance <@mention>',
    aliases: ['bal'],
    async execute(client, message, args) {
        const profiles = new db.table('Profile')
        const user = message.mentions.members.first() || message.member

        let bankBalance = profiles.fetch(`profiles_${user.id}.bankBalance`)
        if(bankBalance === null) bankBalance = 0
        let cash = profiles.fetch(`profiles_${user.id}.cash`)
        if(cash === null) cash = 0

        const balanceEmbed = new MessageEmbed()
        .setAuthor(`${user.user.username} \'s Balance`)
        .addField(':bank: Bank Balance', `\$${bankBalance}`)
        .addField(':dollar: Cash', `\$${cash}`)
        .setColor('#E9D8D8')

        message.channel.send(balanceEmbed)
    }
}