const bcrypt = require('bcrypt')
const { getUserData } = require('./functions')
const saltRounds = 10

const handleChangingData = async (args, client) => {
   const { email, name, image } = args
   const query = `UPDATE users SET name=$1, image=$3 WHERE email=$2`
   const values = [name, email, image]
   const res = await client.query(query, values)
   const result = getUserData(client, email)
   if (res.rowCount === 1) { //updated rows
      return result
   } else {
      return { message: "Couldn't Update Data" }
   }
}

const handleChangingPassword = async (args, client) => {
   const { email, password, newPassword } = args
   const res = await client.query(`SELECT * FROM users WHERE email='${email}'`)
   const user = res.rows[0]
   const isValid = await bcrypt.compare(password, user.password)
   if (!isValid) {
      return { message: 'Wrong Password' }
   } else if (password === newPassword) {
      return { message: 'You Need to Write a New Password' }
   } else {
      const hash = await bcrypt.hash(newPassword, saltRounds)
      const query = `UPDATE users SET password=$1 WHERE email=$2`
      const values = [hash, email]
      await client.query(query, values)
      const result = getUserData(client, email)
      return result
   }
}

module.exports = {
   handleChangingData,
   handleChangingPassword
}