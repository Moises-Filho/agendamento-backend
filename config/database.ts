import mysql from 'mysql2';

// Crie a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Substitua pelo seu usuário do banco de dados
  password: '',           // Substitua pela sua senha do banco de dados
  database: 'test',       // Substitua pelo nome do seu banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida');
  }
});

export default db;
