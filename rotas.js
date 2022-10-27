const { Router } = require('express');

const controleDisciplinas = require('./controladores/disciplinas');
const controleProfessores = require('./controladores/professores');
const seguranca = require('./controladores/seguranca');

const rotas = new Router();

rotas.route('/login')
    .post(seguranca.login);

rotas.route('/disciplinas')
     .get(seguranca.verificaJWT, controleDisciplinas.getDisciplinas)
     .post(seguranca.verificaJWT, controleDisciplinas.addDisciplina)
     .put(seguranca.verificaJWT, controleDisciplinas.updateDisciplina)

rotas.route('/disciplinas/:codigo')
     .get(seguranca.verificaJWT, controleDisciplinas.getDisciplinaPorCodigo)
     .delete(seguranca.verificaJWT, controleDisciplinas.deleteDisciplina)

rotas.route('/professores')
     .get(seguranca.verificaJWT, controleProfessores.getProfessores)
     .post(seguranca.verificaJWT, controleProfessores.addProfessor)
     .put(seguranca.verificaJWT, controleProfessores.updateProfessor)

rotas.route('/professores/:codigo')
     .get(seguranca.verificaJWT, controleProfessores.getProfessorPorCodigo)
     .delete(seguranca.verificaJWT, controleProfessores.deleteProfessor)

module.exports = rotas;