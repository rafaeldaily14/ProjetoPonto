
 /**
 * rotas da parte da interação da api com a tabela de faltas
 */

  const router = require('express-promise-router')();
  const faltaController = require('../controllers/falta.controller');
  
  // Definindo as rotas do CRUD
  
  router.post('/faltas', faltaController.createFalta);
  router.get('/lastCheck', faltaController.ultimaVerificacao);
  router.get('/faltas/:nome', faltaController.listAllFaltas);
  router.delete('/faltas', faltaController.removeAllFaltas);
  
  module.exports = router;