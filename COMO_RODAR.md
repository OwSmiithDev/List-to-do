# Como rodar o TaskFlow

## Pré-requisitos

Antes de começar, verifique se você tem instalado:

- **Node.js** versão 18 ou superior → [nodejs.org](https://nodejs.org)
- **npm** versão 9 ou superior (já vem com o Node.js)

Para verificar, abra o terminal e execute:

```bash
node -v
npm -v
```

---

## Primeira vez (instalação)

No PowerShell do Windows como administrador rode este comando abaixo:

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

1. Abra o terminal na pasta do projeto:

   ```
   C:\Users\denilson\Desktop\Tarefas\taskflow
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

   Aguarde o download terminar (pode levar alguns minutos na primeira vez).

---

## Rodar em desenvolvimento

Execute no terminal, dentro da pasta `taskflow`:

```bash
npm run dev
```

O terminal vai exibir algo como:

```
VITE v8.x.x  ready in 300ms

➜  Local:   http://localhost:5173/
```

Abra o navegador e acesse **http://localhost:5173**

> O servidor fica ativo enquanto o terminal estiver aberto. Para parar, pressione `Ctrl + C`.

---

## Gerar build de produção

Para gerar uma versão otimizada para publicar:

```bash
npm run build
```

Os arquivos finais serão gerados na pasta `dist/`.

Para visualizar o build localmente antes de publicar:

```bash
npm run preview
```

Acesse **http://localhost:4173**

---

## Comandos resumidos

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências (só na primeira vez) |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção na pasta `dist/` |
| `npm run preview` | Visualiza o build de produção localmente |

---

## Solução de problemas

### Porta 5173 já está em uso

```bash
npx kill-port 5173
npm run dev
```

### Erro ao instalar dependências

Delete a pasta `node_modules` e o arquivo `package-lock.json`, depois reinstale:

```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### O navegador não abre automaticamente

Acesse manualmente: **http://localhost:5173**
