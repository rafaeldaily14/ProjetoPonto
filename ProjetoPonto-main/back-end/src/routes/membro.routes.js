/**
 * rotas da parte da interação da api com a tabela de clientes
 */

const router = require('express-promise-router')();
const membroController = require('../controllers/membro.controller');

// Definindo as rotas do CRUD

router.post('/membros', membroController.createMembro);
router.put('/membros', membroController.updateMembro);
router.get('/membros', membroController.listAllMembros);
router.get('/membros/:id', membroController.findMembroById);
router.delete('/membros/:id', membroController.removeMembroById);

module.exports = router;
