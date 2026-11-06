require('dotenv').config();
const express = require('express');
const app = express();
// file system arquivo e path = caminho''
const fs = require('fs');
//path
const path = require('path')

// 1. definir rota caminho
const arquivoProdutos = path.join(__dirname, 'database', 'produtos.json');

app.use(express.json());

// rota POST para o produto
app.post('/produto', (req,res) => {
    const { codigo, nome, quantidade, preco } = req.body;

    // 2. Transformar e calcular os dados
    const novoProduto = {
        codigo,
        nome: String(nome).toUpperCase(),
        quantidade: Number(quantidade),
        preco: Number(preco),
        total: Number(quantidade)* Number(preco)
    }

    // 3. ler arquivos produtos.json
    const conteudoTexto = fs.readFileSync(arquivoProdutos, 'utf-8');
    console.log(conteudoTexto);
    const listaProdutos = JSON.parse(conteudoTexto); //converte em texto em array JS

    // 4. adicionar o novo produto na lista
    listaProdutos.push(novoProduto);

    // 5. salvar
    fs.writeFileSync(arquivoProdutos, JSON.stringify(listaProdutos, null, 2));


    return res.json({
        mensagem: "Produto recebido com sucesso",
        dadosOriginais: { codigo, nome, quantidade, preco}
    })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});