const { pool } = require('../config');
const { request, response } = require('express');

const getDisciplinas = (request, response) => {
    pool.query('SELECT * FROM disciplinas ORDER BY codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar a disciplina: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }
    )
}

const addDisciplina = (request, response) => {
    const {nome, descricao, sigla} = request.body;
    pool.query(`INSERT INTO disciplinas (nome, descricao, sigla) 
    VALUES ($1, $2, $3) RETURNING codigo, nome, descricao, sigla`,
    [nome, descricao, sigla],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao inserir a disciplina: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Disciplina criada!",
            objeto: results.rows[0]
        })
    })
}

const updateDisciplina = (request, response) => {
    const {codigo, nome, descricao, sigla} = request.body;
    pool.query(`UPDATE disciplinas SET nome=$1, descricao=$2, sigla=$3
    WHERE codigo=$4 RETURNING codigo, nome, descricao, sigla`,
    [nome, descricao, sigla, codigo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao alterar a disciplina: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Disciplina alterada!",
            objeto: results.rows[0]
        })
    })
}

const deleteDisciplina = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM disciplinas WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao remover a disciplina: ' + 
                (error ? error :'Não removeu nenhuma linha')
            })
        }
        response.status(200).json({
            status : "success" , message : "Disciplina removida!"
        })
    })
}

const getDisciplinaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM disciplinas WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar a disciplina: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = { getDisciplinas, addDisciplina, updateDisciplina, deleteDisciplina, getDisciplinaPorCodigo }