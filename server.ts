import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import db from "./config/database";

const app = express();
const port = 3000;
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200", // Permite apenas o front-end
  })
);

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Usando as rotas de autenticação
app.use("/api", authRoutes);

// Testar a conexão com o banco
app.get("/users", (req, res) => {
  // Consulte os usuários no banco de dados
  db.query("SELECT * FROM users", (err: any, results: any) => {
    if (err) {
      res.status(500).json({ error: "Erro ao consultar o banco" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
