const sql = require('mssql');
const dbConfig = require('./dbconfig');

async function getConnection() {
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(dbConfig);

    // Realizar una consulta de prueba (SELECT 1)
    const result = await pool.query("SELECT * FROM Users");
    console.log(result.recordset); // Resultados de la consulta
    console.log("coneccion exitosa")

    return pool; // Devuelve el objeto pool para su uso posterior
  } catch (err) {
    // Manejar errores
    console.error('Error al conectar o consultar la base de datos:', err);
    throw err; // Lanza el error para que pueda ser manejado en la llamada
  }
}

module.exports = { getConnection };
