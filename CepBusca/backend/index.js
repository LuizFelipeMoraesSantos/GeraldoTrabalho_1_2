
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", async (res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
});

app.post("/users", async (req, res) => {
  const { nome, email } = req.body;
  const [result] = await db.query("INSERT INTO users (nome, email) VALUES (?, ?)", [nome, email]);
  res.json({ id: result.insertId, nome, email });
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  await db.query("UPDATE users SET nome=?, email=? WHERE id=?", [nome, email, id]);
  res.json({ id, nome, email });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM users WHERE id=?", [id]);
  res.json({ message: "Usuário deletado" });
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));
