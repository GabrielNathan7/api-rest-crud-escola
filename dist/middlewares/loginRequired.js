"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

// verificação de token para efetuar login
exports. default = async (req, res, next) => {
  // Checa se o usuário está logado
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Checa na base de dados se este id e email ainda correspondem ao mesmo usuário
    // Se o usuário editou o email (update), ele precisa gerar um novo token
    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        errors: ['Invalid user'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (err) {
    return res.status(401).json({
      errors: ['Invalid or expired token'],
    });
  }
};

/*
Agora quem controla a sessão não é mais o servidor e sim o usuário com seu token,
mas quem gera o token para o usuário é o código. Loga, assim que o usuário digitar
seu usuário e senha, o código verifica se os mesmos são corretos e, em caso de suceso,
gera um token para o usuário. Toda vez que o usuário quiser fazer login, ele precisa
enviar o token gferado no header da requisção. Quando o token for enviado e for válido,
o código irá extrair de dentro do token o id e o email do usuário, que foram salvos
dentro do payload do token, no momento de sua criação, quando verificamos se o email
e a senha do usuário estavam no banco. Com isso, todas as páginas que precismam de
login já terão as informações de id e email, logo, é possível saber qual usuário está
logado e o que eles está fazendo no sistema. Com essas informações podemos aprimorar
o sistema, como por exemplo, impedindo que um usuário altere os dados de outro usuário,
permitindo que ele edite apenas seus próprios dados.
*/
