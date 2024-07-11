import { Router } from 'express';
import userController from '../controllers/userController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Essas duas rotas NÃO DEVERIAM EXISTIR e só foram criadas para exemplos de CRUD
router.get('/', userController.index); // Lista usuários
router.get('/:id', userController.show); // Lista usuário

// Rotas que devem existir
router.post('/', userController.store); // Cria usuário
router.put('/', loginRequired, userController.update); // Edita usuário
router.delete('/', loginRequired, userController.delete); // Deleta usuário

export default router;
