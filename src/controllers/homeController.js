// Os métodos da classe controller são as requisições do Postman
class HomeController {
  async index(req, res) {
    // formata a resposta em JSON
    res.status(200).json('Index');
  }
}

// exporta a classe já instanciada, já que eu quero o objeto já instanciado e não a classe em si
export default new HomeController();
