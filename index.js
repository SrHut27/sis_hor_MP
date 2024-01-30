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
    database: 'db_shn' // Nome do banco de dados
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
app.use(express.static("public")); //Permite o uso de imagens

// Middlewares
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'
app.use(bodyParser.urlencoded({extended:false})); // Processa dados de formulários
app.use(session({ // Configurações da sessão
    secret: 'ChaveSecretadaAplicacao1234', // Chave secreta para a sessão
    resave: false, // Evita salvar a sessão se não houver mudanças
    saveUninitialized: true // Salva sessões novas e não inicializadas
}))


//Rota para rota inicial
app.get('/', (req, res) => {
    // Verifica se há erros na sessão e os exibe
    if (req.session.errors) {
        var arrayErros = req.session.errors;
        req.session.errors = "";
        return res.render('index', {NavActiveIndex: true, error: arrayErros})
    }
    // Exibe mensagem de sucesso se a operação anterior foi bem-sucedida
    if (req.session.success) {   
        req.session.success = false;    
        return res.render('index', {NavActiveIndex: true, MsgSuccess: true})
    }   
    // Renderiza a página inicial
    res.render('index', {NavActiveIndex: true});
})

// Rota para a página Cadastrar
app.get('/cad', (req, res) => {
    // Verifica se há erros na sessão e os exibe
    if (req.session.errors) {
        var arrayErros = req.session.errors;
        req.session.errors = "";
        return res.render('cad', {NavActiveCad: true, error: arrayErros})
    }
    // Exibe mensagem de sucesso se a operação anterior foi bem-sucedida
    if (req.session.success) {   
        req.session.success = false;    
        return res.render('cad', {NavActiveCad: true, MsgSuccess: true})
    }   
    // Renderiza a página inicial
    res.render('cad', {NavActiveCad: true});
})

//Rota do sistema de horários
app.get('/system', (req, res) => {
res.render('system', {NavActiveSystem: true})});


// Rota para listar usuários
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM tb_usuario"; // Consulta SQL para selecionar todos os usuários
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

//Rota para listar alunos
app.get('/liststudents', (req, res) => {
    const sql = "SELECT * FROM tb_aluno"; // Consulta SQL para selecionar todos os usuários
    connection.query(sql, (err, results) => {
        // Trata erros na consulta
        if (err) {
            console.log(`Houve um problema: ${err}`);
            res.render('liststudents', {NavActiveListstudents: true, table: false});
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

//Rota ara listar turmas
app.get('/listclass', (req, res) => {
    const sql = "SELECT  nome_turma FROM tb_turma"; // Consulta SQL para selecionar todos os usuários
    connection.query(sql, (err, results) => {
        // Trata erros na consulta
        if (err) {
            console.log(`Houve um problema: ${err}`);
            res.render('listclass', {NavActiveListclass: true, table: false});
        } else {
            // Renderiza a página com os resultados da consulta
            if (results.length > 0) {
                res.render('listclass', {NavActiveListclass: true, table: true, alunos: results});
            } else {
                res.render('listclass', {NavActiveListclass: true, table: false});
            }
        }
    });
});

//Rota para cadstrar alunos
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


//Rota para recuperar usuario
app.post('/recuperaruser', (req, res) => {
    var id = req.body.id; // Obtém o ID do usuário do formulário
    const sql = "SELECT * FROM tb_usuario WHERE id_usuario = ?"; // Consulta SQL para buscar o usuário pelo ID
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
                    tipo: usuario.tipo
                });
            } else {
                res.render('editar', {error: true, problema: 'Registro não encontrado'});
            }
        }
    });
});


app.post('/cad', (req, res) => {
    // Validações e tratamento dos dados aqui...
    
    // Verificar se o campo 'nome' está presente e não é nulo
    if (!req.body.nome) {
        res.status(400).send('O campo nome é obrigatório.');
        return;
    }

    // Inserir usuário no banco de dados
    const sql = "INSERT INTO tb_usuario (nome_usuario, email_usuario, nome_tipo_usuario) VALUES (?, ?, ?)";

    connection.query(sql, [req.body.nome, req.body.email, req.body.tipo], (err, results) => {
        // Trata erros de inserção
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao cadastrar usuário.');
        } else {
            console.log('Usuário inserido com sucesso');
            req.session.success = true;
            res.redirect('/cad');
        }
    });
});





//Método post para o cadastro de alunos
app.post('/cadstudents', (req, res) => {
    // Validações e tratamento dos dados aqui...
    // Inserir usuário no banco de dados
    const sql = "INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES (?, ?)";
    connection.query(sql, [req.body.nome, req.body.email.toLowerCase()], (err, results) => {
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
    const sql = "UPDATE tb_usuario SET nome_usuario = ?, email_usuario = ?, nome_tipo_usuario = ? WHERE id_usuario = ?";
    connection.query(sql, [req.body.nome, req.body.email.toLowerCase(), req.body.tipo, req.body.id], (err, results) => {
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
    const sql = "SELECT * FROM tb_aluno WHERE id_aluno = ?"; // Consulta SQL para buscar o aluno pelo ID
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
                    email: aluno.email,
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
    const sql = "UPDATE tb_aluno SET nome_aluno = ?, email_aluno = ?  WHERE id_aluno = ?";
    connection.query(sql, [req.body.nome, req.body.email.toLowerCase(), req.body.id], (err, results) => {
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
    const sql = "DELETE FROM tb_usuario WHERE id_usuario = ?";
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
    const sql = "DELETE FROM tb_aluno WHERE id_aluno = ?";
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

