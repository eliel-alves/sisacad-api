const { pool } = require('../config');
const { request, response } = require('express');

const getProfessores = (request, response) => {
    pool.query(`SELECT p.codigo as codigo, p.nome as nome, 
        p.cpf as cpf, p.titulacao as titulacao, 
        p.disciplina as disciplina, d.sigla as sigladisciplina
        FROM professores p
        JOIN disciplinas d on p.disciplina = d.codigo
        ORDER BY p.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar os professores: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addProfessor = (request, response) => {
    const {nome, cpf, titulacao, disciplina} = request.body;
    pool.query(`INSERT INTO professores (nome, cpf, titulacao, disciplina) 
    VALUES ($1, $2, $3, $4)
    RETURNING codigo, nome, cpf, titulacao, disciplina`, 
    [nome, cpf, titulacao, disciplina] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir o professor!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Professor inserido!",
            objeto : results.rows[0]
        });
    })
}

const updateProfessor = (request, response) => {
    const {codigo, nome, cpf, titulacao, disciplina} = request.body;
    pool.query(`UPDATE professores
	SET nome=$1, cpf=$2, titulacao=$3, disciplina=$4
	WHERE codigo=$5
    RETURNING codigo, nome, cpf, titulacao, disciplina`, 
    [nome, cpf, titulacao, disciplina, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar o professor!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Professor editado!",
            objeto : results.rows[0]
        });
    })
}

const deleteProfessor = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM professores WHERE codigo=$1`, 
    [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover o professor: ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Professor removido!"
        });
    })
}

const getProfessorPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    
    pool.query(`SELECT * FROM professores WHERE codigo=$1`, 
    [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar o professor!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = { getProfessores, addProfessor, updateProfessor, deleteProfessor, getProfessorPorCodigo }