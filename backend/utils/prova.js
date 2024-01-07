const { getConnection } = require('./db');
const sql = require('mssql');

async function loginUser(req, res) {
    const { username, password } = req.body;
  
    const pool = await getConnection();
  
    try {
      const result = await pool
        .request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query('SELECT * FROM Users WHERE username = @username AND password = @password');
  
      if (result.recordset.length > 0) {
        res.status(200).json({ message: 'Login successful' });
        console.log("login creado")
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
        console.log("usuario o contrasegna invalida")
      }
    } catch (error) {
      console.error('Error al ejecutar la consulta', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      sql.close();
    console.log("hi")
    }
  }
  

  async function createUser(req, res) {
    const { username, password } = req.body;
  
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query('INSERT INTO Users (username, password) VALUES (@username, @password)');
  
      res.status(201).json({ message: 'User created successfully', result });
      console.log("usuario creado")
    } catch (error) {
      console.log("usuario ya registrado")
      console.error('Error al ejecutar la consulta', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  
    
    async function logOut(req,res){
    try {
        
      req.session.destroy();

  
      res.json({ success: true, message: 'Logout exitoso' });
    } catch (error) {
      console.error('Error durante el logout:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
}





  module.exports = { loginUser, createUser, logOut };