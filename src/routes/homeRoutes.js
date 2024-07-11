import { Router } from 'express';
import homeController from '../controllers/homeController';

const router = new Router();

router.get('/', homeController.index);

export default router;

/*
Um controller deve ter no máximo 5 métodos
index -> lista todos os usuários -> GET
store/create -> cria novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/
