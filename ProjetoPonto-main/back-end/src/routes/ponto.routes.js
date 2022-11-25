/**
 * rotas da parte da interação da api com a tabela de clientes
 */

 const router = require('express-promise-router')();
 const pontoController = require('../controllers/ponto.controller');
 
 // Definindo as rotas do CRUD
 
 router.post('/pontos', pontoController.createPonto);
 router.get('/pontos', pontoController.listAllPontos);
 
 module.exports = router;