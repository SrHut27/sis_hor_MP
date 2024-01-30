-- ## TABELA TIPO DE USUÁRIOS
DROP TABLE IF EXISTS tb_tipo_usuario;

CREATE TABLE tb_tipo_usuario (
    id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);
INSERT INTO tb_tipo_usuario (descricao) VALUES ('Professor');
INSERT INTO tb_tipo_usuario (descricao) VALUES ('Tutor');
INSERT INTO tb_tipo_usuario (descricao) VALUES ('Responsável do Aluno');
INSERT INTO tb_tipo_usuario (descricao) VALUES ('Coordenador');
INSERT INTO tb_tipo_usuario (descricao) VALUES ('Administrador');


-- ## TABELA USUÁRIOS
DROP TABLE IF EXISTS tb_usuario;

CREATE TABLE tb_usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_usuario INT,
    nome_usuario VARCHAR(255) NOT NULL,
    email_usuario VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL,
    FOREIGN KEY (id_tipo_usuario) REFERENCES tb_tipo_usuario(id_tipo_usuario)
);

-- Inserções para Professores
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (1, 'Professor 1', 'professor1@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (1, 'Professor 2', 'professor2@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (1, 'Professor 3', 'professor3@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (1, 'Professor 4', 'professor4@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (1, 'Professor 5', 'professor5@exemplo.com', TRUE);

-- Inserções para Tutores
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (2, 'Tutor 1', 'tutor1@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (2, 'Tutor 2', 'tutor2@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (2, 'Tutor 3', 'tutor3@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (2, 'Tutor 4', 'tutor4@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (2, 'Tutor 5', 'tutor5@exemplo.com', TRUE);

-- Inserções para Responsáveis do Aluno
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (3, 'Responsável 1', 'responsavel1@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (3, 'Responsável 2', 'responsavel2@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (3, 'Responsável 3', 'responsavel3@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (3, 'Responsável 4', 'responsavel4@exemplo.com', TRUE);
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (3, 'Responsável 5', 'responsavel5@exemplo.com', TRUE);

-- Inserção para Coordenador
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (4, 'Coordenador 1', 'coordenador1@exemplo.com', TRUE);

-- Inserção para Administrador
INSERT INTO tb_usuario (id_tipo_usuario, nome_usuario, email_usuario, ativo) VALUES (5, 'Administrador 1', 'administrador1@exemplo.com', TRUE);

-- ## TABELA SEMANA
CREATE TABLE tb_semana (
    id_semana INT AUTO_INCREMENT PRIMARY KEY,
    nome_semana VARCHAR(255) NOT NULL
);
INSERT INTO tb_semana (nome_semana) VALUES ('Domingo');
INSERT INTO tb_semana (nome_semana) VALUES ('Segunda-feira');
INSERT INTO tb_semana (nome_semana) VALUES ('Terça-feira');
INSERT INTO tb_semana (nome_semana) VALUES ('Quarta-feira');
INSERT INTO tb_semana (nome_semana) VALUES ('Quinta-feira');
INSERT INTO tb_semana (nome_semana) VALUES ('Sexta-feira');
INSERT INTO tb_semana (nome_semana) VALUES ('Sábado');

-- ## TABELA HORARIO
CREATE TABLE tb_horario (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    nome_horario VARCHAR(255) NOT NULL,
    desc_horario TEXT,
    horario_inicial DATETIME NOT NULL,
    horario_final DATETIME NOT NULL
);
-- Horários regulares de hora em hora
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('07:00', 'Horário de 07:00 até 08:00', '2024-01-01 07:00:00', '2024-01-01 08:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('08:00', 'Horário de 08:00 até 09:00', '2024-01-01 08:00:00', '2024-01-01 09:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('09:00', 'Horário de 09:00 até 10:00', '2024-01-01 09:00:00', '2024-01-01 10:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('10:00', 'Horário de 10:00 até 11:00', '2024-01-01 10:00:00', '2024-01-01 11:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('11:00', 'Horário de 11:00 até 12:00', '2024-01-01 11:00:00', '2024-01-01 12:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('12:00', 'Horário de 12:00 até 13:00', '2024-01-01 12:00:00', '2024-01-01 13:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('13:00', 'Horário de 13:00 até 14:00', '2024-01-01 13:00:00', '2024-01-01 14:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('14:00', 'Horário de 14:00 até 15:00', '2024-01-01 14:00:00', '2024-01-01 15:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('15:00', 'Horário de 15:00 até 16:00', '2024-01-01 15:00:00', '2024-01-01 16:00:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('16:00', 'Horário de 16:00 até 17:00', '2024-01-01 16:00:00', '2024-01-01 17:00:00');

-- Horários com conflitos
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('09:00', 'Horário de 09:00 até 10:30', '2024-01-01 09:00:00', '2024-01-01 10:30:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('14:00', 'Horário de 14:00 até 15:30', '2024-01-01 14:00:00', '2024-01-01 15:30:00');
INSERT INTO tb_horario (nome_horario, desc_horario, horario_inicial, horario_final) VALUES ('15:30', 'Horário de 15:30 até 17:00', '2024-01-01 15:30:00', '2024-01-01 17:00:00');

-- ## TABELA ALUNO
CREATE TABLE tb_aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(255) NOT NULL,
    email_aluno VARCHAR(255) NOT NULL,
    id_responsavel INT,
    FOREIGN KEY (id_responsavel) REFERENCES tb_usuario(id_usuario)
);
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('João', 'aluno1@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Maria', 'aluno2@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Ana', 'aluno3@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Pedro', 'aluno4@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Lucas', 'aluno5@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Luana', 'aluno6@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Gabriel', 'aluno7@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Sofia', 'aluno8@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Rafael', 'aluno9@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Julia', 'aluno10@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Paulo', 'aluno11@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Leticia', 'aluno12@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Mateus', 'aluno13@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Beatriz', 'aluno14@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Carlos', 'aluno15@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Fernanda', 'aluno16@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Eduardo', 'aluno17@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Camila', 'aluno18@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Rodrigo', 'aluno19@escola.com');
INSERT INTO tb_aluno (nome_aluno, email_aluno) VALUES ('Aline', 'aluno20@escola.com');


-- ## TABELA AGENDA ESCOLA

CREATE TABLE tb_agenda_escola (
    id_agenda INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_semana INT,
    id_horario INT,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario),	
    FOREIGN KEY (id_semana) REFERENCES tb_semana(id_semana),
    FOREIGN KEY (id_horario) REFERENCES tb_horario(id_horario),
    UNIQUE (id_semana, id_horario)
);
-- AGENDA ESCOLA EXEMPLO 1 - SEM COMFLITO GRADE COMPLETA
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 1);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 2);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 3);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 4);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 5);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 6);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 7);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 8);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 9);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (1, 2, 10);

-- AGENDA ESCOLA EXEMPLO 4 - COM COMFLITO 
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 1);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 2);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 3);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 4);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 5);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 6);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 7);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 8);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 9);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 10);
INSERT INTO tb_agenda_escola (id_usuario, id_semana, id_horario) VALUES (6, 3, 13);

-- ## TABELA AGENDA ALUNO

CREATE TABLE tb_agenda_aluno (
    id_agenda_aluno INT AUTO_INCREMENT PRIMARY KEY,
    id_agenda INT,
    id_aluno INT,
    FOREIGN KEY (id_agenda) REFERENCES tb_agenda_escola(id_agenda),
    FOREIGN KEY (id_aluno) REFERENCES tb_aluno(id_aluno)
);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (1, 1);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (10, 1);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (12, 1);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (17, 1);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (2, 2);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (3, 2);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (4, 2);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (5, 2);
INSERT INTO tb_agenda_aluno (id_agenda, id_aluno) VALUES (6, 2);


-- Tabela de Materias

CREATE TABLE tb_materia (
    id_materia INT AUTO_INCREMENT PRIMARY KEY,
    nome_materia VARCHAR(255) NOT NULL
);
-- Inserts for Subjects
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Matemática');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Português');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Ciências');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('História');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Geografia');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Inglês');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Artes');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Educação Física');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Química');
INSERT INTO `db_teste`.`tb_materia` (`nome_materia`) VALUES ('Física');
