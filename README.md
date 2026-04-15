# Website Hailife - Clínica de Olhos Dra. Simone Finzi

**URL:** https://www.clinicahailife.com.br  
**Deploy:** https://dancing-lollipop-aa5add.netlify.app (Netlify - PAUSED)  
**Status:** Migrando para Vercel + GitHub

## 📋 Estrutura do Projeto

```
web-hailife/
├── app/
│   ├── page.tsx (Home page com slider,médicas,unidades)
│   ├── layout.tsx (Root layout com Head metadata)
│   └── _not-found/page.tsx (404 page)
├── public/
│   ├── images/
│   │   ├── slider/ (8 slides)
│   │   ├── medicas/ (simone.jpg, liliana.jpg)
│   │   └── unidades/ (paraiso.jpg, campobelo.jpg)
│   ├── file.svg, vercel.svg, next.svg, globe.svg, window.svg
├── out/
│   ├── index.html (Entry point para HostGator)
│   ├── robots.txt
│   └── static/ (assets estáticos)
├── next.config.js (output: export, trailingSlash: true)
└── netlify.toml (Netlify config)

```

## 🔧 Configuração Vercel + GitHub

### 1. Criar repo no GitHub
```bash
git remote rename origin upstream
git remote add origin https://github.com/[seu-usuario]/hailife-website.git
git push -u origin main
```

### 2. Conectar no Vercel
1. Acesse https://vercel.com
2. Importar repo GitHub
3. Configurar variáveis de ambiente (se necessário)
4. Deploy automático em cada push

### 3. Configuração Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node.js Version:** 20.x

### 4. Custom Domain (opcional)
- Adicionar `www.clinicahailife.com.br` no Vercel
- Configurar DNS para apontar para Vercel

## 🚀 Deploy no HostGator (backup)

**Credenciais FTP:**
- Host: `ftp.simonefinzi.com.br`
- User: `bob@clinicahailife.com.br`
- Pass: `*L*9j2Pyy7gz!&`
- Path: `/hailife-test/`

**Upload script:** `upload-static.sh`

## 📊 Status

| Item | Status |
|------|--------|
| Website code | ✅ 100% completo |
| Images | ✅ Baixadas (27 arquivos) |
| Next.js build | ✅ OK (Next.js 14.2.35) |
| Vercel connection | ✅ Conectado ao GitHub |
| Netlify deploy | ⚠️ PAUSED (bandwidth exceeded) |
| HostGator upload | 🔄 Upload para /hailife-test/ OK |

## 📝 Próximos Passos

1. Push para GitHub automatica deploy no Vercel
2. Testar em `hailife-website.vercel.app`
3. Migrar para HostGator se necessário
