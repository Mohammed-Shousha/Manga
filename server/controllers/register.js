const bcrypt = require('bcrypt')
const saltRounds = 10

const handleRegister = async (args, client) =>{
   const { name, email, password } = args

   const { rows } = await client.query(`SELECT * FROM users WHERE email='${email}'`)
   const user = rows[0]
   if (user) return { message: "This Email Already Have an Account Linked to It"}

   const hash = await bcrypt.hash(password, saltRounds)

   const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`
   const values = [name, email, hash]
   const res = await client.query(query, values)
   return res.rows[0] //user
}

module.exports = handleRegister