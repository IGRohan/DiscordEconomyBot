const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'setbio',
    description: 'Set your bio that will show up on your profile',
    usage: 'setbio <text>',
    aliases: ['setbiography', 'bio'],
    async execute(client, message, args) {
        const profiles = new db.table('Profile')
        const profile = profiles.get(`profiles_${message.author.id}`)
        if(profile === null) {
            return message.channel.send(`You don't seem to have a profile. Try running the command again.`)
        }

        const bio = args.join(' ')
        if(!bio) {
            return message.channel.send(`You need to provide some text for the bio\nUsage: \`bio <text>\``)
        }
        if(bio.length > 100) {
            return message.channel.send(`You cannot have a bio with more than 100 characters.`)
        }
        const regex = !/[^a-zA-Z0-9., ]+/g.test(bio)
        if(!regex) {
            return message.channel.send(`Your bio may only contain letters and numbers without any symbols.\n\
Allowed Symbols: \`.\`: Full Stop, \`,\`: Comma, \`!\`: Exclamation`)
        }

        profiles.set(`profiles_${message.author.id}.bio`, bio)
        const bioSet = new MessageEmbed()
        .setDescription(`Successfully set your bio! Use the profile command to have a look!`)
        .setColor('RANDOM')
        message.channel.send(bioSet)
    }
}