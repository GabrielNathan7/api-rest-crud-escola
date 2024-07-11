"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _userController = require('../controllers/userController'); var _userController2 = _interopRequireDefault(_userController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// Essas duas rotas NÃO DEVERIAM EXISTIR e só foram criadas para exemplos de CRUD
router.get('/', _userController2.default.index); // Lista usuários
router.get('/:id', _userController2.default.show); // Lista usuário

// Rotas que devem existir
router.post('/', _userController2.default.store); // Cria usuário
router.put('/', _loginRequired2.default, _userController2.default.update); // Edita usuário
router.delete('/', _loginRequired2.default, _userController2.default.delete); // Deleta usuário

exports. default = router;
