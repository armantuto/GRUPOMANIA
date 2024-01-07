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
    
    module.exports = config;