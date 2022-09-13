const getUserData = async (client, email) =>{
   const user_result  = await client.query(`SELECT * FROM users WHERE email='${email}'`)
   const user = user_result.rows[0]

   const recipes_result = await client.query(`SELECT * FROM recipes WHERE user_email='${email}'`)
   const recipes = recipes_result.rows

   const fav_recipes_result = await client.query(`SELECT * FROM fav_recipes WHERE user_email='${email}'`)
   const fav_recipes = fav_recipes_result.rows

   const result = {
      ...user,
      recipes,
      fav_recipes
   }

   return result
}

module.exports = {getUserData}