
/**
 * Lighthouse Performance Audit - Mente & Dados
 * 
 * Instalação: npm install -g lighthouse
 * Execução: node tests/lighthouse-audit.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname, '../reports/lighthouse');
const BASE_URL = 'http://localhost:8000';

// Páginas para auditar
const PAGES = [
  { name: 'home', url: `${BASE_URL}/` },
  { name: 'trilha-00', url: `${BASE_URL}/trilha-00/` },
  { name: 'ebook', url: `${BASE_URL}/trilha-00/ebook/` },
  { name: 'caderno', url: `${BASE_URL}/trilha-00/caderno/` },
  { name: 'bundle', url: `${BASE_URL}/trilha-00/completo/` },
  { name: 'sobre', url: `${BASE_URL}/sobre/` },
  { name: 'contato', url: `${BASE_URL}/contato/` }
];

// Criar diretório de relatórios
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

console.log('🚀 Iniciando auditoria de performance Lighthouse...\n');

for (const page of PAGES) {
  console.log(`📄 Auditando: ${page.name}`);
  
  // Mobile audit
  try {
    const mobileOutput = path.join(REPORTS_DIR, `${page.name}-mobile.html`);
    execSync(`lighthouse ${page.url} --output=html --output-path=${mobileOutput} --preset=mobile --quiet --chrome-flags="--headless"`);
    console.log(`  ✅ Mobile: ${page.name}-mobile.html`);
  } catch (error) {
    console.log(`  ❌ Mobile error: ${error.message}`);
  }
  
  // Desktop audit
  try {
    const desktopOutput = path.join(REPORTS_DIR, `${page.name}-desktop.html`);
    execSync(`lighthouse ${page.url} --output=html --output-path=${desktopOutput} --preset=desktop --quiet --chrome-flags="--headless"`);
    console.log(`  ✅ Desktop: ${page.name}-desktop.html`);
  } catch (error) {
    console.log(`  ❌ Desktop error: ${error.message}`);
  }
}

console.log('\n✅ Auditoria concluída!');
console.log(`📁 Relatórios salvos em: ${REPORTS_DIR}`);
