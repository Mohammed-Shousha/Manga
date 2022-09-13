const handleAddingRecipe = async (args, client) => {
   const { email, title, time, type, ingredients, directions, image } = args
   const query = `INSERT INTO recipes( title, time, type, ingredients, directions, image, user_email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
   const values = [title, time, type, ingredients, directions, image, email]
   const res = await client.query(query, values)
   const { rows } = await client.query(`SELECT * FROM recipes WHERE user_email='${email}'`)
   return {
      data: rows,
      result: res.rowCount
   }
}

const handleEditingRecipe = async (args, client) => {
   const { email, id, title, time, type, ingredients, directions, image } = args
   const query = `UPDATE recipes SET title=$1, time=$2, type=$3, ingredients=$4, directions=$5, image=$6 WHERE id=$7 AND user_email=$8 RETURNING *`
   const values = [title, time, type, ingredients, directions, image, id, email]
   const res = await client.query(query, values)
   const { rows } = await client.query(`SELECT * FROM recipes WHERE user_email='${email}'`)
   return {
      data: rows,
      result: res.rowCount
   }
}

const handleDeletingRecipe = async (args, client) => {
   const { email, id } = args
   const res = await client.query(`DELETE FROM recipes WHERE id='${id}' AND user_email='${email}' RETURNING *`)
   const { rows } = await client.query(`SELECT * FROM recipes WHERE user_email='${email}'`)
   return {
      data: rows,
      result: res.rowCount
   }
}

const handleLikingRecipe = async (args, client) => {
   const { email, id, title, image } = args
   const query = `INSERT INTO fav_recipes(id, title, image, user_email) VALUES ($1, $2, $3, $4) RETURNING *`
   const values = [id, title, image, email]
   const res = await client.query(query, values)
   const { rows } = await client.query(`SELECT * FROM fav_recipes WHERE user_email='${email}'`)
   return {
      data: rows,
      result: res.rowCount
   }
}

const handleUnlikingRecipe = async (args, client) => {
   const { email, id } = args
   const res = await client.query(`DELETE FROM fav_recipes WHERE id='${id}' AND user_email='${email}' RETURNING *`)
   const { rows } = await client.query(`SELECT * FROM fav_recipes WHERE user_email='${email}'`)
   return {
      data: rows,
      result: res.rowCount
   }
}


module.exports = {
   handleAddingRecipe,
   handleEditingRecipe,
   handleDeletingRecipe,
   handleLikingRecipe,
   handleUnlikingRecipe,
}