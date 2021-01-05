const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
const db = require('quick.db')

client.once('ready', () => {
    console.log(`${client.user.username} has Logged In!`)
})

const fs = require('fs')
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const commands = require(`./commands/${file}`)
    client.commands.set(commands.name, commands)
    console.log(`✅ Successfully loaded command ${commands.name}`)
}
const functions = require('./functions')

client.on('message', async message => {
    const prefix = config.prefix
    if (!message.guild) return
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    const profiles = new db.table('Profile')
    var profile = profiles.get(`profiles_${message.author.id}`) || functions.createUser(message.author, profiles)

    const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command))
    if (cmd) cmd.execute(client, message, args)
})

client.login(config.token)