const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria o app e define a porta
const app = express();
const PORT = 3000;

// Conectando ao banco de dados SQLite em memória
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conexão ao banco de dados em memória estabelecida.');

        // Cria a tabela 'usuarios' se não existir
        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err.message);
            } else {
                console.log('Tabela "usuarios" criada com sucesso.');
            }
        });
    }
});

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota raiz redireciona para a página de cadastro
app.get('/', (req, res) => {
    res.redirect('cadastro.html');
});



// Rota para cadastro de usuário (POST)
app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    const params = [nome, email, senha];
    
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('login.html'); // Redireciona para a página de login
    });
});

// Rota para login (POST)
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    const params = [email, senha];
    
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.redirect('home.html'); // Redireciona para a página inicial
        } else {
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    });
});

// Rota para confirmar a senha
app.post('/confirmar', (req, res) => {
    const { email, senha } = req.body;

    // Lógica para confirmar a senha
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.get(sql, [email, senha], (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Erro no servidor" });
        }

        if (row) {
            res.json({ message: "Senha confirmada. Compra realizada!" });
        } else {
            res.status(401).json({ message: "Email ou senha incorretos" });
        }
    });
});
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
