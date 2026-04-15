#!/usr/bin/env node

/**
 * Script de Validação SEO para o Site da Clínica Hailife
 * 
 * Este script verifica os principais elementos de SEO e conversão
 * implementados no site da Clínica Hailife.
 */

const https = require('https');
const fs = require('fs');

// URL do site
const SITE_URL = 'https://dancing-lollipop-aa5add.netlify.app';

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

function validateSchemaOrg(html) {
  const schemaPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const matches = [...html.matchAll(schemaPattern)];
  
  if (matches.length === 0) {
    return { valid: false, message: 'Schema.org não encontrado' };
  }

  for (const match of matches) {
    try {
      const schema = JSON.parse(match[1]);
      if (schema['@type'] === 'MedicalClinic') {
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

function validateMetaTags(html) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["'](.*?)["']/i);
  
  const checks = {
    title: {
      valid: titleMatch && titleMatch[1].includes('WhatsApp'),
      message: titleMatch ? `Título encontrado: "${titleMatch[1]}"` : 'Título não encontrado'
    },
    description: {
      valid: descriptionMatch && descriptionMatch[1].length > 0,
      message: descriptionMatch ? `Descrição encontrada: "${descriptionMatch[1]}"` : 'Descrição não encontrada'
    },
    keywords: {
      valid: keywordsMatch && keywordsMatch[1].includes('WhatsApp'),
      message: keywordsMatch ? `Keywords encontradas: "${keywordsMatch[1]}"` : 'Keywords não encontradas'
    }
  };
  
  return {
    valid: checks.title.valid && checks.description.valid && checks.keywords.valid,
    checks
  };
}

function validateOpeningHours(html) {
  const openingHoursPattern = /openingHoursSpecification|Seg.*Sex|Ter.*Sáb|13h.*19h|8h.*12h/gi;
  const matches = html.match(openingHoursPattern);
  
  return {
    valid: matches && matches.length >= 4, // Esperamos pelo menos 4 menções
    message: `Horários encontrados: ${matches ? matches.length : 0}`
  };
}

function validateAddresses(html) {
  const addresses = [
    'Rua Correia Dias, 184',
    'Rua Vieira de Moraes, 2110',
    'Paraíso',
    'Campo Belo',
    '04104-000',
    '04617-007'
  ];
  
  const foundAddresses = addresses.filter(addr => html.includes(addr));
  
  return {
    valid: foundAddresses.length >= 5, // Esperamos pelo menos 5 endereços
    message: `Endereços encontrados: ${foundAddresses.length}/${addresses.length}`,
    found: foundAddresses
  };
}

async function runValidation() {
  console.log('🔍 Iniciando validação SEO do site da Clínica Hailife...\n');
  
  try {
    const html = await fetchPage(SITE_URL);
    
    console.log('✅ Página carregada com sucesso!\n');
    
    // Executar validações
    const schemaValidation = validateSchemaOrg(html);
    const whatsappValidation = validateWhatsAppCTAs(html);
    const metaValidation = validateMetaTags(html);
    const hoursValidation = validateOpeningHours(html);
    const addressValidation = validateAddresses(html);
    
    // Resultados
    console.log('📋 RESULTADOS DA VALIDAÇÃO:\n');
    
    console.log(`🤖 Schema.org: ${schemaValidation.valid ? '✅' : '❌'} ${schemaValidation.message}`);
    console.log(`📱 WhatsApp CTAs: ${whatsappValidation.valid ? '✅' : '❌'} ${whatsappValidation.message} (${whatsappValidation.buttonCount} botões)`);
    console.log(`🏷️  Meta Tags: ${metaValidation.valid ? '✅' : '❌'} Título: ${metaValidation.checks.title.valid ? 'OK' : 'FAIL'}, Descrição: ${metaValidation.checks.description.valid ? 'OK' : 'FAIL'}, Keywords: ${metaValidation.checks.keywords.valid ? 'OK' : 'FAIL'}`);
    console.log(`⏰ Horários: ${hoursValidation.valid ? '✅' : '❌'} ${hoursValidation.message}`);
    console.log(`📍 Endereços: ${addressValidation.valid ? '✅' : '❌'} ${addressValidation.message}\n`);
    
    // Avaliação geral
    const overallValid = schemaValidation.valid && 
                        whatsappValidation.valid && 
                        metaValidation.valid && 
                        hoursValidation.valid && 
                        addressValidation.valid;
    
    console.log(`🎯 AVALIAÇÃO GERAL: ${overallValid ? '✅ SITE TOTALMENTE OTIMIZADO!' : '❌ AJUSTES NECESSÁRIOS'}`);
    
    if (overallValid) {
      console.log('\n🎉 Parabéns! O site da Clínica Hailife está completamente otimizado para conversão e SEO.');
      console.log('✅ Todos os elementos críticos foram validados com sucesso!');
    } else {
      console.log('\n⚠️  Algumas validações falharam. Revise os itens marcados com ❌');
    }
    
  } catch (error) {
    console.error('❌ Erro ao validar o site:', error.message);
  }
}

// Executar validação
runValidation();