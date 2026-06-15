# 📋 TaskFlow — Sistema de Gerenciamento de Tarefas

> Aplicação web para organização de tarefas com visualização em lista e quadro Kanban, desenvolvida com React, TypeScript e animações profissionais com Framer Motion.

---

## 🖼️ Visão Geral

O **TaskFlow** é um sistema completo de gerenciamento de tarefas pensado para quem quer ter controle visual do fluxo de trabalho. Com ele é possível criar tarefas detalhadas, acompanhar o progresso por colunas personalizáveis no Kanban e registrar soluções e motivos de pendência diretamente no sistema.

Todos os dados ficam salvos no próprio navegador — sem necessidade de servidor ou banco de dados.

---

## ✨ Funcionalidades

- **Duas visualizações** — Lista e Kanban, com troca animada entre elas
- **Kanban com drag and drop** — arraste tarefas entre colunas livremente e reordene dentro da coluna
- **Colunas personalizáveis** — crie, edite, reordene e exclua colunas com 8 cores disponíveis
- **Tarefas completas** — título, descrição, responsável, prazo, prioridade e etiquetas
- **Subtarefas** — checklist interno por tarefa com progresso visual
- **Registro de conclusão** — descreva a solução e a data ao concluir uma tarefa
- **Registro de pendência** — informe o motivo ao marcar uma tarefa como pendente
- **Filtros e ordenação** — filtre por status e responsável, ordene por prioridade, prazo ou data
- **Etiquetas coloridas** — sistema de tags com paleta de 10 cores, configurável nas definições
- **Tema claro e escuro** — alternância persistida entre sessões
- **Busca global** — localize tarefas por título, descrição, responsável ou etiqueta
- **Exportar / Importar** — backup completo em `.json` para migrar ou restaurar dados
- **Responsivo** — funciona de dispositivos móveis até desktop

---

## 🎨 Animações com Framer Motion

- Entrada escalonada das colunas Kanban ao carregar a página
- Sliding pill animado no toggle de visualização (Lista ↔ Kanban)
- Cards com hover lift e transição suave ao entrar/sair
- Campos do formulário aparecem em cascata ao abrir o modal
- Tab indicator deslizante animado nas configurações
- Toasts com spring physics ao aparecer e desaparecer
- Microinterações em todos os botões (escala no hover e tap)
- Badge de contagem das colunas com pop animation ao mudar
- Ícone de fechar (X) com rotação de 90° no hover
- Checkbox com animação de spring ao marcar/desmarcar

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 19 | Interface e gerenciamento de estado |
| [TypeScript](https://www.typescriptlang.org/) | 6 | Tipagem estática |
| [Vite](https://vite.dev/) | 8 | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilização utilitária |
| [Framer Motion](https://motion.dev/) | 12 | Animações e transições |
| [dnd kit](https://dndkit.com/) | 6 / 10 | Drag and drop |
| [Lucide React](https://lucide.dev/) | — | Ícones |

**Editor utilizado:** Visual Studio Code

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão **18 ou superior**
- npm (já incluído na instalação do Node.js)

---

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/taskflow.git
```

**2. Entre na pasta do projeto**

```bash
cd taskflow
```

**3. Instale as dependências**

```bash
npm install
```

**4. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

**5. Acesse no navegador**

```
http://localhost:5173
```

---

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build` | Gera a build de produção na pasta `dist/` |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Executa o ESLint para verificar o código |

---

## 📁 Estrutura do Projeto

```
taskflow/
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Barra de navegação e busca
│   │   ├── KanbanView.tsx        # Visualização Kanban com DnD
│   │   ├── KanbanColumn.tsx      # Coluna do Kanban com drop zone
│   │   ├── TaskCard.tsx          # Card de tarefa (Kanban)
│   │   ├── ListView.tsx          # Visualização em lista com filtros
│   │   ├── TaskRow.tsx           # Linha de tarefa (lista)
│   │   ├── TaskModal.tsx         # Modal de criar / editar tarefa
│   │   ├── TaskViewModal.tsx     # Modal de visualizar tarefa
│   │   ├── SettingsModal.tsx     # Configurações (pipeline, tags, dados)
│   │   ├── SubtarefasSection.tsx # Checklist de subtarefas
│   │   ├── ConfirmDialog.tsx     # Dialog de confirmação de exclusão
│   │   ├── Toast.tsx             # Notificações toast
│   │   ├── PriorityBadge.tsx     # Badge de prioridade
│   │   ├── DueDateLabel.tsx      # Label de prazo com alerta de vencimento
│   │   ├── Avatar.tsx            # Avatar gerado por inicial do nome
│   │   └── EmptyState.tsx        # Estado vazio da lista
│   ├── context/
│   │   └── AppContext.tsx        # Estado global da aplicação
│   ├── types/
│   │   └── index.ts              # Tipos TypeScript e constantes
│   ├── utils/
│   │   └── seed.ts               # Dados iniciais de exemplo
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

---

## 🗂️ Prioridades

| Nível | Cor |
|---|---|
| 🟢 Baixa | Verde |
| 🟡 Média | Amarelo |
| 🟠 Alta | Laranja |
| 🔴 Urgente | Vermelho |

---

## 💾 Persistência de Dados

Todos os dados (tarefas, colunas e etiquetas) são salvos automaticamente no **localStorage** do navegador. Não é necessário nenhum banco de dados ou servidor.

Para fazer backup ou transferir os dados para outro dispositivo, use a opção **Exportar** disponível em **Configurações → Dados**. Para restaurar, use **Importar** com o arquivo `.json` gerado anteriormente.

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado pessoal.

---

<p align="center">Feito com 💜 durante minha jornada de aprendizado em desenvolvimento web</p>
