const { MessageEmbed } = require("discord.js")
const functions = require('../functions')

module.exports = {
    name: 'help',
    description: 'Shows all the commands for this bot.',
    usage: 'help',
    aliases: [],
    async execute(client, message, args) {
        const name = args[0]
        const cmd = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name))

        if(!cmd) {
            const helpMenu = new MessageEmbed()
            .setAuthor(`${message.guild.name}\'s Help Menu`, message.guild.iconURL({ dynamic: true }))
            .setDescription('`help`: **Shows all the commands for this bot**\n\
`balance`: **Check your bank and cash balance**\n\
`profile`: **Shows you your profile**\n\
`daily`: **Get your daily amount of money**\n\
')
            .setColor('#E9D8D8')
            .setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

            return message.channel.send(helpMenu)
        }
        
        var data = []
        data.push(`**❯ Name:** ${cmd.name}`)
        data.push(`**❯ Description:** ${cmd.description}`)
        data.push(`**❯ Usage:** ${cmd.usage}`)
        data.push(`**❯ Aliases:** ${cmd.aliases.lenght ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`)
        const helpEmbed = new MessageEmbed()
        .setAuthor(`${functions.capitalize(cmd.name)} Command Help Menu`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(data)
        .setColor('#E9D8D8')
        .setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        return message.channel.send(helpEmbed)
        
    }
}