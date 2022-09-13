const bcrypt = require('bcrypt')
const { getUserData } = require('./functions')

const handleSignIn = async (args, client) => {
   const { email, password } = args
   const { rows } = await client.query(`SELECT * FROM users WHERE email='${email}'`)
   const user = rows[0]

   const result = getUserData(client, email)

   if (user) {
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid) {
         return result
      } else {
         return { message: 'Wrong Email or Password' }
      }
   } else {
      return { message: 'Email Not Registered' }
   }
}

module.exports = handleSignIn
