import jwt from 'jsonwebtoken';
import User from '../models/User';

// Os métodos da classe controller são as requisições do Postman
class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id } = user;
    // o payload são os dados que vamos conseguir resgatar de dentro do token
    // neste caso o payload é enviado com o id e o email do usuário
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION });

    return res.status(200).json({ token, user: { nome: user.nome, id, email } });
  }
}

// exporta a classe já instanciada, já que eu quero o objeto já instanciado e não a classe em si
export default new TokenController();
