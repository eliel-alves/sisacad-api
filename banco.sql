-- Tabela de disciplinas
create table disciplinas (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(40) not null, 
	sigla varchar(4) not null 	
);

-- Tabela de professores
create table professores (
	codigo serial primary key, 
	nome varchar(100) not null,
	cpf varchar(11) not null, 
	titulacao varchar(40) not null, 
	disciplina integer not null, 
	foreign key (disciplina) references disciplinas (codigo)
);

-- Tabela de usuarios
create table usuarios (
	email varchar(50) not null primary key,
	senha varchar(20) not null,
	tipo char(1)  not null,
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null,
	nome varchar(50) not null
);

-- Inserindo dados na tabela de usuarios
insert into usuarios (email, senha, tipo, telefone, nome)
values ('eliel@ifsul.edu.br', 'senha123', 'A','(62)99856-0087','Eliel Alves'),
('jorge@ifsul.edu.br', '123456', 'U','(54)44484-4348','Jorge Bavaresco');