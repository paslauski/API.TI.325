
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

// Rota GET principal
app.get('/', (req, res) => {
    return res.json({
        mensagem: 'Servidor funcionando!'
    });
});

// Rota POST para usuário
app.post('/usuario', (req, res) => {
    const { nome, idade } = req.body;

    if (typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({
            erro: 'Informe um nome válido.'
        });
    }

    if (!Number.isInteger(idade) || idade < 0) {
        return res.status(400).json({
            erro: 'Informe uma idade válida.'
        });
    }

    return res.status(201).json({
        mensagem: 'Usuário recebido com sucesso!',
        usuario: {
            nome: nome.trim(),
            idade: idade
        }
    });
});

// Rota POST para produto
app.post('/produto', (req, res) => {
    const { nomeProduto, marca, quantidade, preco } = req.body;

    if (
        typeof nomeProduto !== 'string' ||
        nomeProduto.trim() === '' ||
        typeof marca !== 'string' ||
        marca.trim() === ''
    ) {
        return res.status(400).json({
            erro: 'Informe o nome e a marca do produto.'
        });
    }

    if (
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        typeof preco !== 'number' ||
        !Number.isFinite(preco) ||
        preco < 0
    ) {
        return res.status(400).json({
            erro: 'Informe uma quantidade e um preço válidos.'
        });
    }

    return res.status(201).json({
        mensagem: 'Produto recebido com sucesso!',
        produto: {
            nomeProduto: nomeProduto.trim(),
            marca: marca.trim(),
            quantidade: quantidade,
            preco: preco
        }
    });
});

// Porta do servidor
const PORT = process.env.PORT || 4500;

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
