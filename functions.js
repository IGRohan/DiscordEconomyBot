module.exports = {
    /**
     * Returns a proper date in proper format
     * 
     * @param {Date} date The date that will be formatted
     * @returns The proper date and time (string) 
     */
    printDate(date) {
        let monthNames = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ]
        let dates = date.getDate()
        let monthIndex = date.getMonth()
        let year = date.getFullYear()
        let hour = date.getHours()
        let minute = date.getMinutes()

        return dates+' '+monthNames[monthIndex]+' '+year+' at '+hour+'h '+minute+'minutes'
    },

    /**
     * Creates a new profile for the user
     * 
     * @param {object} user The user for which the profile is created
     * @param {object} db The database in which it will be stored
     * 
     * @returns The user profile (object)
     */
    createUser(user, db) {
        db.set(`profiles_${user.id}`, {
            bankBalance: 0,
            cash: 0,
            bio: 'No Bio Set',
            reputation: 0,
            createdAt: require('./functions').printDate(new Date(Date.now()))
        })

        console.log("\x1b[32m","[DB]","\x1b[0m", "User \""+user.username+"\" registered ! ID : \""+user.id+"\"");
        return db.get(user.id)
    },

    /**
     * Creates a capitalized string out of a lower case string
     * 
     * @param {string} string The string that will be capitalized
     * 
     * @returns The capitalized string (string) 
     */
    capitalize(string) {
        return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ')
    }
}