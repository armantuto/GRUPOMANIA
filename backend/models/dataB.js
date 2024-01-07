const sql = require("mssql")
 const config ={
    user: "arma",
    password: "23411397",
    server: 'localhost',  // Cambia esto al nombre de tu servidor SQL Server
    database: 'Escuela',  // Cambia esto al nombre de tu base de datos
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
    
}

console.log(sql)
console.log(config)
// async function getConnection() {
//     try {
//         // Conectar a la base de datos
//         await sql.connect(config);

//         // Realizar una consulta de prueba (SELECT 1)
//         const result = await sql.query("SELECT * FROM Alumnos");
//         console.log(result.recordset); // Resultados de la consulta

//     } catch (err) {
//         // Manejar errores
//         console.error('Error al conectar o consultar la base de datos:', err);
//     } finally {
//         // Cerrar la conexión (importante hacer esto)
//         await sql.close();
//     }
// }

// getConnection();