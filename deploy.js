const { execSync } = require('child_process');
const fs = require('fs');

// Script de deploy para Netlify
console.log('🚀 Iniciando processo de deploy...');

try {
  // Verificar se o build já existe
  if (!fs.existsSync('./out')) {
    console.log('📦 Executando build...');
    execSync('npm run build', { stdio: 'inherit' });
  }

  console.log('✅ Build concluído com sucesso!');
  console.log('📁 Pasta "out" criada com os arquivos estáticos');

  // Mostrar informações do diretório de saída
  const outDirContents = fs.readdirSync('./out');
  console.log('📄 Arquivos gerados:', outDirContents);

  console.log('✨ Projeto Hailife pronto para deploy no Netlify!');
  console.log('🔗 URL prevista: https://dancing-lollipop-aa5add.netlify.app');
  
} catch (error) {
  console.error('❌ Erro durante o processo de deploy:', error.message);
  process.exit(1);
}