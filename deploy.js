# Deploy script para Netlify
# Run: node deploy.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname);
const distDir = path.join(projectDir, '.next');

console.log('🚀 Iniciando deploy da Clínica Hailife...');

// Build do Next.js
console.log('🔨 Rodando build do Next.js...');
try {
  execSync('npm run build', { cwd: projectDir, stdio: 'inherit' });
  console.log('✅ Build concluído com sucesso');
} catch (error) {
  console.error('❌ Erro no build:', error);
  process.exit(1);
}

// Verifica se distDir existe
if (!fs.existsSync(distDir)) {
  console.error('❌ Diretório .next não encontrado');
  process.exit(1);
}

console.log('✅ Projeto pronto para deploy!');
console.log('\nPara fazer deploy manual no Netlify:');
console.log('1. Acesse https://app.netlify.com');
console.log('2. Crie um novo site');
console.log('3. Arraste a pasta .next ou conecte ao GitHub');
console.log('\nOu use Netlify CLI:');
console.log('npm install -g netlify-cli');
console.log('cd web-hailife');
console.log('netlify deploy --prod');
