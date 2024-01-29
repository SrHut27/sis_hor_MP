// Importando módulos necessários para a aplicação
const express = require('express'); // Framework web para Node.js
const app = express(); // Criando uma instância do Express
const hbs = require('express-handlebars'); // Template engine para renderizar HTML
const bodyParser = require('body-parser'); // Para processar dados de formulários
const session = require('express-session'); // Para gerenciar sessões de usuário
const mysql = require('mysql'); // Cliente MySQL para Node.js
const PORT = 3000; // Define a porta do servidor

// Configurando a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1', // Endereço do servidor do banco de dados
    user: 'root', // Usuário do banco de dados
    password: '', // Senha do banco de dados
    database: 'db_sdh' // Nome do banco de dados
});

// Conectando ao banco de dados
connection.connect((err) => {
    if (err) throw err; // Lança um erro se a conexão falhar
    console.log('Conectado ao MySQL!'); // Log no console se a conexão for bem-sucedida
});

// Configurações do Handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs', // Define a extensão dos arquivos de template
    defaultLayout: 'main' // Define o layout padrão
})); 
app.set('view engine', 'hbs'); // Define o Handlebars como o motor de renderização de templates
app.use(express.static("images"));

// Middlewares
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'
app.use(bodyParser.urlencoded({extended:false})); // Processa dados de formulários
app.use(session({ // Configurações da sessão
    secret: 'ChaveSecretadaAplicacao1234', // Chave secreta para a sessão
    resave: false, // Evita salvar a sessão se não houver mudanças
    saveUninitialized: true // Salva sessões novas e não inicializadas
}))


// Rota para a página Cadastrar
app.get('/', (req, res) => {
    // Verifica se há erros na sessão e os exibe
    if (req.session.errors) {
        var arrayErros = req.session.errors;
        req.session.errors = "";
        return res.render('index', {NavActiveCad: true, error: arrayErros})
    }

    // Exibe mensagem de sucesso se a operação anterior foi bem-sucedida
    if (req.session.success) {   
        req.session.success = false;    
        return res.render('index', {NavActiveCad: true, MsgSuccess: true})
    }

    // Renderiza a página inicial
    res.render('index', {NavActiveCad: true});
})

// Rota para listar usuários
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM usuarios"; // Consulta SQL para selecionar todos os usuários
    connection.query(sql, (err, results) => {
        // Trata erros na consulta
        if (err) {
            console.log(`Houve um problema: ${err}`);
            res.render('users', {NavActiveUsers: true, table: false});
        } else {
            // Renderiza a página com os resultados da consulta
            if (results.length > 0) {
                res.render('users', {NavActiveUsers: true, table: true, usuarios: results});
            } else {
                res.render('users', {NavActiveUsers: true, table: false});
            }
        }
    });
});

app.get('/liststudents', (req, res) => {
    const sql = "SELECT * FROM alunos"; // Consulta SQL para selecionar todos os usuários
    connection.query(sql, (err, results) => {
        // Trata erros na consulta
        if (err) {
            console.log(`Houve um problema: ${err}`);
            res.render('liststudents', {NavActiveUsers: true, table: false});
        } else {
            // Renderiza a página com os resultados da consulta
            if (results.length > 0) {
                res.render('liststudents', {NavActiveListstudents: true, table: true, alunos: results});
            } else {
                res.render('liststudents', {NavActiveListstudents: true, table: false});
            }
        }
    });
});

app.get('/cadstudents', (req, res) => {
    // Verifica se há erros na sessão e os exibe
    if (req.session.errors) {
        var arrayErros = req.session.errors;
        req.session.errors = "";
        return res.render('cadstudents', {NavActiveCadstudents: true, error: arrayErros, table: false});
    }

    // Exibe mensagem de sucesso se a operação anterior foi bem-sucedida
    if (req.session.success) {   
        req.session.success = false;    
        return res.render('cadstudents', {NavActiveCadstudents: true, MsgSuccess: true, table: false});
    }

    // Renderiza a página inicial
    res.render('cadstudents', {NavActiveCadstudents: true, table: false});
});

// Rota para editar usuário
app.post('/recuperaruser', (req, res) => {
    var id = req.body.id; // Obtém o ID do usuário do formulário
    const sql = "SELECT * FROM usuarios WHERE id = ?"; // Consulta SQL para buscar o usuário pelo ID
    connection.query(sql, [id], (err, results) => {
        // Trata erros na consulta
        if (err) {
            console.log(err);
            res.render('editar', {error: true, problema: 'Não é possível editar este registro'});
        } else {
            // Renderiza a página de edição com os dados do usuário
            if (results.length > 0) {
                const usuario = results[0];
                res.render('editar', {
                    error: false,
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    sobrenome: usuario.sobrenome,
                    funcao: usuario.funcao
                });

            } else {
                res.render('editar', {error: true, problema: 'Registro não encontrado'});
            }
        }
    });
});

// Rota para cadastrar usuário
app.post('/cad', (req, res) => {
    // Validações e tratamento dos dados aqui...
    // Inserir usuário no banco de dados
    const sql = "INSERT INTO usuarios (nome, email, funcao, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())";
    connection.query(sql, [req.body.nome, req.body.email.toLowerCase(), req.body.funcao], (err, results) => {
        // Trata erros de inserção
        if (err) {
            console.error(err);
        } else {
            console.log('Usuário inserido com sucesso');
            req.session.success = true;
            res.redirect('/');
        }
    });
});

//Método post para o cadastro de usuários
app.post('/cadstudents', (req, res) => {
    // Validações e tratamento dos dados aqui...
    // Inserir usuário no banco de dados
    const sql = "INSERT INTO alunos (nome, sobrenome, email, ano, tutor, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
    connection.query(sql, [req.body.nome, req.body.email.toLowerCase(), req.body.sobrenome, req.body.ano, req.body.tutor], (err, results) => {
        // Trata erros de inserção
        if (err) {
            console.error(err);
        } else {
            console.log('Aluno inserido com sucesso');
            req.session.success = true;
            res.redirect('/cadstudents');
        }
    });
});

// Rota para atualizar usuário
app.post('/update', (req, res) => {
    // Validações e tratamento dos dados aqui...
    // Atualizar usuário no banco de dados
    const sql = "UPDATE usuarios SET nome = ?, email = ?, funcao = ? WHERE id = ?";
    connection.query(sql, [req.body.nome, req.body.email.toLowerCase(), req.body.funcao, req.body.id], (err, results) => {
        // Trata erros de atualização
        if (err) {
            console.error(err);
        } else {
            console.log('Usuário atualizado com sucesso');
            res.redirect('/users');
        }
    });
});

app.post('/recuperarstudents', (req, res) => {
    var id = req.body.id; // Obtém o ID do aluno do formulário
    const sql = "SELECT * FROM alunos WHERE id = ?"; // Consulta SQL para buscar o aluno pelo ID
    connection.query(sql, [id], (err, results) => {
        // Trata erros na consulta
        if (err) {
            console.log(err);
            res.render('editstudents', {error: true, problema: 'Não é possível editar este registro'});
        } else {
            // Renderiza a página de edição com os dados do aluno
            if (results.length > 0) {
                const aluno = results[0];
                res.render('editstudents', {
                    error: false,
                    id: aluno.id,
                    nome: aluno.nome,
                    sobrenome: aluno.sobrenome,
                    email: aluno.email,
                    ano: aluno.ano,
                    tutor: aluno.tutor
                });
            } else {
                res.render('editstudents', {error: true, problema: 'Registro não encontrado'});
            }
        }
    });
});

app.post('/updatestudents', (req, res) => {
    // Validações e tratamento dos dados aqui...
    // Atualizar usuário no banco de dados
    const sql = "UPDATE alunos SET nome = ?,  sobrenome = ?, email = ?, ano = ?, tutor = ?  WHERE id = ?";
    connection.query(sql, [req.body.nome, req.body.sobrenome,  req.body.email.toLowerCase(), req.body.ano, req.body.tutor, req.body.id], (err, results) => {
        // Trata erros de atualização
        if (err) {
            console.error(err);
        } else {
            console.log('Aluno atualizado com sucesso');
            res.redirect('/liststudents');
        }
    });
});


// Rota para deletar usuário
app.post('/del', (req, res) => {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    connection.query(sql, [req.body.id], (err, results) => {
        // Trata erros de deleção
        if (err) {
            console.error(err);
        } else {
            console.log('Usuário deletado com sucesso');
            res.redirect('/users');
        }
    });
});

app.post('/delstudents', (req, res) => {
    const sql = "DELETE FROM alunos WHERE id = ?";
    connection.query(sql, [req.body.id], (err, results) => {
        // Trata erros de deleção
        if (err) {
            console.error(err);
        } else {
            console.log('Aluno deletado com sucesso');
            res.redirect('/liststudents');
        }
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:' + PORT);
});
