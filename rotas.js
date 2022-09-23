const { Router } = require('express');

const controleDisciplinas = require('./controladores/disciplinas');
const controleProfessores = require('./controladores/professores');

const rotas = new Router();

rotas.route('/disciplinas')
     .get(controleDisciplinas.getDisciplinas)
     .post(controleDisciplinas.addDisciplina)
     .put(controleDisciplinas.updateDisciplina)

rotas.route('/disciplinas/:codigo')
     .get(controleDisciplinas.getDisciplinaPorCodigo)
     .delete(controleDisciplinas.deleteDisciplina)

rotas.route('/professores')
     .get(controleProfessores.getProfessores)
     .post(controleProfessores.addProfessor)
     .put(controleProfessores.updateProfessor)

rotas.route('/professores/:codigo')
     .get(controleProfessores.getProfessorPorCodigo)
     .delete(controleProfessores.deleteProfessor)

module.exports = rotas;