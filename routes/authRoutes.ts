import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/database";
import { QueryError, RowDataPacket } from "mysql2";

const router = Router();

// Rota de cadastro
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send("Erro ao criptografar a senha");
    }

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err: QueryError | null, result: any) => {
        if (err) {
          return res.status(500).send("Erro ao salvar usuário");
        }
        res.status(200).send({ message: "Usuário cadastrado com sucesso" });
      }
    );
  });
});

// Rota de login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err: QueryError | null, results: RowDataPacket[]) => {
      if (err) {
        return res.status(500).send("Erro ao consultar o usuário");
      }

      if (results.length === 0) {
        return res.status(404).send("Usuário não encontrado");
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          return res.status(500).send("Erro ao comparar a senha");
        }

        if (!match) {
          return res.status(401).send("Senha incorreta");
        }

        const token = jwt.sign({ id: user.id }, "secrettoken", {
          expiresIn: "1h",
        });
        res.status(200).send({ message: "Login bem-sucedido", token });
      });
    }
  );
});

export default router;
