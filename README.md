# Next.js Frontend

Este é um frontend construído com Next.js

## Funcionalidades

- **Autenticação**: Login e gerenciamento de sessão.
- **Dashboard**: Visualização e gerenciamento de tarefas com gráficos e tabelas.
- **CRUD de Tarefas**: Adicionar, editar e excluir tarefas.

## Instruções para Rodar o Projeto Localmente

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/gabrielbomfimoliveira/nextjs-frontend
   cd nextjs-frontend

2. **Instale as Dependências**

   ```bash
   npm install
   
3. **Configure o Ambiente**

   ```bash
   npm run dev

   Crie um arquivo .env.local na raiz do projeto e adicione as variáveis de ambiente necessárias.
   
     # URL do Backend (AdonisJS)
    NEXT_PUBLIC_API_URL=http://localhost:3333
   
4. **Inicie o Servidor de Desenvolvimento**

   ```bash
   npm run dev

   
4. **Abra o Projeto**

   ```bash
   Acesse http://localhost:3000 no seu navegador.

   O servidor estará disponível em http://localhost:3000/login

**Melhorias Futuras**

- Websockets para Atualização Constante: Implementar Websockets para garantir a atualização em tempo real dos dados na aplicação.
- Tradução e Internacionalização (i18n): Adicionar suporte para múltiplos idiomas utilizando uma biblioteca de i18n.
- Testes Automatizados: Implementar testes unitários e de integração para garantir a estabilidade do código.
