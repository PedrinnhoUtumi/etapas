// O import do ContatoService não é mais necessário aqui.

export class ContatoController {
  
  // Agora o Controller RECEBE o serviço.
  constructor(contatoService) {
    this.contatoService = contatoService;
  }

  // O resto dos métodos permanece EXATAMENTE IGUAL.
  async getContatos(request, reply) {
    const contatos = this.contatoService.getAllContatos();
    return reply.send(contatos);
  }

  async getContatoByEmail(request, reply) {
    const { email } = request.query
    const contatos = this.contatoService.getContatoByEmail(email);
    if(!contatos) return reply.status(404).json({message: "Não foram encontrados contatos"});
    return reply.send(contatos);
  }

  async createContato(request, reply) {
    const contatos = this.contatoService.createContato();
    if(!contatos) return reply.status(400).json({message: "Você deve colocar seu nome com mais de 3 caracteres"});
    return reply.send(contatos);
  }
  // ... etc ...
}