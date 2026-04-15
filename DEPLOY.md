# Deploy Instructions - Clínica Hailife

## Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Conta no Netlify (para deploy staging)

## Passo a Passo para Deploy

### 1. Instalação Local

```bash
# Clone ou baixe o projeto
npm install
```

### 2. Teste Local

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### 3. Build para Produção

```bash
# Crie a versão otimizada para produção
npm run build

# O build será gerado na pasta 'out'
```

### 4. Deploy Manual (via CLI)

```bash
# Instale o CLI do Netlify
npm install -g netlify-cli

# Faça login
netlify login

# Inicialize o projeto
netlify init

# Faça o deploy
netlify deploy --prod
```

### 5. Deploy Automático (Recomendado)

1. Crie conta no [Netlify](https://netlify.com)
2. Conecte ao seu repositório GitHub/GitLab/Bitbucket
3. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `out`
   - **Branch**: main/master
4. O deploy será feito automaticamente a cada push

## Verificação de Performance

Após o deploy, utilize o PageSpeed Insights para verificar a performance:

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Alvo: 95+ para Mobile e Desktop

## Validação do Schema.org

Utilize as ferramentas do Google para validar o schema:

- [Rich Results Test](https://search.google.com/test/rich-results)
- [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

## Links Importantes

- **Netlify Dashboard**: https://app.netlify.com
- **Analytics**: Acessar via Netlify Dashboard
- **Logs**: Disponíveis no Netlify Dashboard

## Troubleshooting

### Problemas Comuns

1. **Build falhando**: Verifique as dependências no package.json
2. **Mobile performance baixa**: Verifique imagens e scripts desnecessários
3. **Schema não aparecendo**: Use as ferramentas de validação acima

### Soluções

1. **Limpar cache**: `npm run build` novamente
2. **Verificar console**: Execute `npm run dev` e verifique o console do navegador
3. **Revisar SEO**: Verifique títulos, meta tags e schema.org

## Contato para Suporte

- **Desenvolvimento**: Cody (implementação)
- **SEO**: Elena (otimização)
- **Projeto**: Bob (coordenação)