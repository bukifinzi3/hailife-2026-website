#!/usr/bin/env node

/**
 * Script de Validação de Performance para o Site da Clínica Hailife
 * 
 * Este script verifica os principais elementos de performance e SEO
 * usando APIs públicas e técnicas de verificação.
 */

const https = require('https');
const { exec } = require('child_process');

// URL do site
const SITE_URL = 'https://dancing-lollipop-aa5add.netlify.app';

async function checkPageLoadTime(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    https.get(url, (response) => {
      response.on('data', () => {});
      response.on('end', () => {
        const loadTime = Date.now() - startTime;
        resolve(loadTime);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function validateSchemaOrg(html) {
  const schemaPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const matches = [...html.matchAll(schemaPattern)];
  
  if (matches.length === 0) {
    return { valid: false, message: 'Schema.org não encontrado' };
  }

  for (const match of matches) {
    try {
      const schema = JSON.parse(match[1]);
      if (schema['@type'] === 'MedicalClinic' || (schema['@graph'] && schema['@graph'].some(item => item['@type'] === 'MedicalClinic'))) {
        return { 
          valid: true, 
          message: 'Schema.org MedicalClinic encontrado e válido',
          data: schema
        };
      }
    } catch (e) {
      return { valid: false, message: 'Schema.org encontrado mas inválido: ' + e.message };
    }
  }
  
  return { valid: false, message: 'Schema.org encontrado mas não é do tipo MedicalClinic' };
}

function validateWhatsAppCTAs(html) {
  const ctaCount = (html.match(/WhatsApp/gi) || []).length;
  const buttonPattern = /<button[^>]*class="[^"]*whatsapp/gi;
  const buttonMatches = [...html.matchAll(buttonPattern)];
  
  return {
    valid: ctaCount >= 6, // Esperamos pelo menos 6 CTAs
    message: `CTAs WhatsApp encontrados: ${ctaCount}`,
    buttonCount: buttonMatches.length
  };
}

function checkMetaTags(html) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["'](.*?)["']/i);
  
  const checks = {
    title: {
      valid: titleMatch && titleMatch[1].includes('WhatsApp'),
      message: titleMatch ? `Título encontrado: "${titleMatch[1].substring(0, 50)}..."` : 'Título não encontrado'
    },
    description: {
      valid: descriptionMatch && descriptionMatch[1].length > 0,
      message: descriptionMatch ? `Descrição encontrada: "${descriptionMatch[1].substring(0, 50)}..."` : 'Descrição não encontrada'
    },
    keywords: {
      valid: keywordsMatch && keywordsMatch[1] && keywordsMatch[1].length > 0,
      message: keywordsMatch ? `Keywords encontradas: "${keywordsMatch[1]}"` : 'Keywords não encontradas'
    }
  };
  
  return {
    valid: checks.title.valid && checks.description.valid && checks.keywords.valid,
    checks
  };
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runFullValidation() {
  console.log('🔍 Iniciando validação completa do site da Clínica Hailife...\n');
  
  try {
    // Verificar tempo de carregamento
    console.log('⏱️  Verificando tempo de carregamento...');
    const loadTime = await checkPageLoadTime(SITE_URL);
    console.log(`⏱️  Tempo de carregamento: ${loadTime}ms`);
    
    // Buscar HTML da página
    console.log('\n📄 Buscando conteúdo da página...');
    const html = await fetchPage(SITE_URL);
    console.log('✅ Página carregada com sucesso!\n');
    
    // Validar Schema.org
    const schemaValidation = validateSchemaOrg(html);
    console.log(`🤖 Schema.org: ${schemaValidation.valid ? '✅' : '❌'} ${schemaValidation.message}`);
    
    // Validar CTAs do WhatsApp
    const whatsappValidation = validateWhatsAppCTAs(html);
    console.log(`📱 WhatsApp CTAs: ${whatsappValidation.valid ? '✅' : '❌'} ${whatsappValidation.message} (${whatsappValidation.buttonCount} botões)`);
    
    // Validar Meta Tags
    const metaValidation = checkMetaTags(html);
    console.log(`🏷️  Meta Tags: ${metaValidation.valid ? '✅' : '❌'} Título: ${metaValidation.checks.title.valid ? 'OK' : 'FAIL'}, Descrição: ${metaValidation.checks.description.valid ? 'OK' : 'FAIL'}, Keywords: ${metaValidation.checks.keywords.valid ? 'OK' : 'FAIL'}`);
    
    // Avaliar tempo de carregamento
    const speedRating = loadTime < 2000 ? '✅' : loadTime < 3000 ? '⚠️' : '❌';
    const speedMessage = loadTime < 2000 ? 'Excelente velocidade!' : loadTime < 3000 ? 'Velocidade razoável' : 'Precisa melhorar!';
    console.log(`⚡ Velocidade: ${speedRating} ${speedMessage} (${loadTime}ms)`);
    
    // Avaliação geral
    const overallValid = schemaValidation.valid && 
                        whatsappValidation.valid && 
                        metaValidation.valid &&
                        loadTime < 3000; // Menos de 3 segundos
    
    console.log(`\n🎯 AVALIAÇÃO GERAL: ${overallValid ? '✅ SITE TOTALMENTE OTIMIZADO!' : '⚠️  ALGUMAS MELHORIAS NECESSÁRIAS'}`);
    
    if (overallValid) {
      console.log('\n🎉 Parabéns! O site da Clínica Hailife está otimizado para conversão e SEO.');
      console.log('✅ Todos os elementos críticos foram validados com sucesso!');
    } else {
      console.log('\n⚠️  Algumas validações falharam. Revise os itens marcados com ❌');
    }
    
    // Recomendações
    console.log('\n💡 RECOMENDAÇÕES:');
    if (!schemaValidation.valid) {
      console.log('- Verifique a implementação do Schema.org MedicalClinic');
    }
    if (!whatsappValidation.valid) {
      console.log('- Confirme que todos os CTAs do WhatsApp estão presentes');
    }
    if (!metaValidation.valid) {
      console.log('- Revise as meta tags (título, descrição, keywords)');
    }
    if (loadTime >= 3000) {
      console.log('- Otimize o tempo de carregamento (atualmente ' + loadTime + 'ms)');
    }
    
  } catch (error) {
    console.error('❌ Erro ao validar o site:', error.message);
  }
}

// Executar validação
runFullValidation();