
 /**
 * rotas da parte da interação da api com a tabela de faltas
 */

  const router = require('express-promise-router')();
  const senhasController = require('../controllers/senhas.controller');
  
  // Definindo as rotas do CRUD
  router.get('/senhas', senhasController.listAllSenha);
  router.post('/senhas', senhasController.createSenha);
  router.post('/login/', senhasController.readSenha);
  router.put('/senhas/', senhasController.updateSenha);
  
  module.exports = router;