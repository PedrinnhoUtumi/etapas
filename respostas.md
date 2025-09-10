# PARTE 1 - Avaliação DW3 - Terceiro bimestre

## 1. (0.5 ponto) Qual camada é a mais apropriada para conter uma regra de negócio como "verificar se um e-mail já existe no banco de dados antes de criar um novo usuário"?
- C) Service

## 2. (0.5 ponto) Qual é a principal ideia por trás da "Arquitetura em Fatias Verticais" (Vertical Slice), vista na Etapa 4?
- B) Organizar o código por funcionalidade (feature), colocando todos os arquivos relacionados a uma feature (controller, service, etc.) juntos em um mesmo módulo.

## 3. (1.5 ponto) Explique, com suas palavras, por que a testabilidade da aplicação melhora drasticamente ao sair da "Etapa 2" (Acoplamento Forte) para a "Etapa 3" (Injeção de Dependência).
- Resposta: Com o acoplamento forte, todas as camadas superiores ao Repository (Service, Controller e Routes) ficam dependentes entre si. Logo, quando quisermos mudar algo em alguma camada, precisariamos alterar todo o resto para que não dê "bug". Já com a Injeção de Dependência, as instâncias são criadas apenas na última camada, transformando as outras intâncias (anteriormente criadas nas outras camadas, de forma sequencial) em objetos de classe, dando dinamismo ao código.

## 4. (0.5 ponto) Qual é a principal responsabilidade da camada de Controller em uma arquitetura MVC?
- D) Receber requisições HTTP, chamar a camada de serviço e formatar a resposta.

## 5. (0.5 ponto) Na "Etapa 0", qual dos seguintes problemas NÃO era uma consequência direta da abordagem de arquivo único? 
- A) Performance lenta da API devido ao uso do Fastify.

## 6. (0.5 ponto) Como uma dependência é tipicamente "injetada" em uma classe na abordagem vista na Etapa 3?
- D) A dependência é passada como um argumento para o construtor da classe.

## 7. (1.5 ponto) Descreva brevemente o fluxo de uma requisição DELETE /api/contatos/:id através das camadas da arquitetura da Etapa 3 (Routes -> Controller -> Service -> Repository). Explique o papel de cada camada nesse processo.
- Resposta: O server configura as rotas disponiveis em Routes, que por sua vez importa os arquivos para que eles sejam instanciados corretamente, com Injeção de Dependência e faz as rotas a partir do arquivo.controller.js. Neste arquivo, temos a chamada do arquivo.service.js por meio de um objeto de classe passado no construtor (este referencia o arquivo real pela importação feita no routes). No arquivo.service.js, temos toda a nossa lógica e regras de negócios implementada, chamando o arquivo.repository.js, que vai deletar o contato do banco de dados por meio do id 
```Javascript
//contato.routes.js

import { ContatoRepository } from '../repositories/contato.repository.js';
import { ContatoService } from '../services/contato.service.js';
import { ContatoController } from '../controllers/contato.controller.js';

const contatoRepository = new ContatoRepository();
const contatoService = new ContatoService(contatoRepository);
const contatoController = new ContatoController(contatoService);

export async function contatoRoutes(fastify, options) {
    fastify.delete('/api/contatos/:id', (request, reply) => 
        contatoController.deleteContato(request, reply)
    );
}

//contato.controller.js
export class ContatoController {
    constructor(contatoService) {
    this.contatoService = contatoService;
    }

    async deleteContato(request, reply) {
        const { id } = request.params
        const contatos = this.contatoService.deleteContato(id);
        return reply.send(contatos);
    }
}

//contato.service.js
import { ContatoRepository } from '../repositories/contato.repository.js';

export class ContatoService { 
    constructor() {
        this.contatoRepository = new ContatoRepository();
    }
    deleteContato(id) {
        return this.contatoRepository.remove(id);
    }
}

//contato.repository.js
export class ContatoRepository {
  #contatos = [];

  remove(id) {
    const index = this.#contatos.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.#contatos.splice(index, 1);
    return true;
  }
}
```

## 8. (0.5 ponto) O que caracteriza o anti-padrão "Fat Model" (Modelo Gordo), visto na Etapa 1?
- D) Uma classe de modelo que acumula tanto a lógica de negócio quanto a lógica de acesso a dados.

## 9. (0.5 ponto) Na Etapa 2, qual foi a principal função da camada de Repository?
- C) Ser a única camada responsável pelo acesso aos dados (buscar, salvar, etc.).

## 10. (0.5 ponto) Qual problema principal a Injeção de Dependência (DI), introduzida na Etapa 3, resolve?
- C) O "Acoplamento Forte", onde uma classe cria diretamente as instâncias de suas dependências.