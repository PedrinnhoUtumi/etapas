import { ContatoRepository } from '../repositories/contato.repository.js';

export class ContatoService {
  
  // O Service está "amarrado" à implementação do ContatoRepository.
  constructor() {
    this.contatoRepository = new ContatoRepository();
  }

  getAllContatos() {
    return this.contatoRepository.findAll();
  }

  getContatoById(id) {
    return this.contatoRepository.findById(id);
  }

  getContatoByEmail(email) {
    return this.contatoRepository.findByEmail(email);
  }

  createContato(contatoData) {
    // imaginando que contatoData tenha campos contatoData = {id: '', nome: '' ...}
    if (contatoData.nome.length < 3) return null
    return this.contatoRepository.create(contatoData);
  }

  updateContato(id, contatoData) {
    return this.contatoRepository.update(id, contatoData);
  }

  deleteContato(id) {
    return this.contatoRepository.remove(id);
  }
}