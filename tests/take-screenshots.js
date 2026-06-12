/**
 * Script para capturar screenshots em diferentes resoluções
 * 
 * Instalação: npm install puppeteer
 * Execução: node tests/take-screenshots.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configurações
const CONFIG = {
  urls: [
    { name: 'home', url: 'http://localhost:8000/' },
    { name: 'trilha-00', url: 'http://localhost:8000/trilha-00/' },
    { name: 'ebook', url: 'http://localhost:8000/trilha-00/ebook/' },
    { name: 'caderno', url: 'http://localhost:8000/trilha-00/caderno/' },
    { name: 'bundle', url: 'http://localhost:8000/trilha-00/completo/' },
    { name: 'sobre', url: 'http://localhost:8000/sobre/' },
    { name: 'contato', url: 'http://localhost:8000/contato/' }
  ],
  viewports: [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1366, height: 768 }
  ],
  outputDir: path.join(__dirname, 'screenshots')
};

async function takeScreenshots() {
  // Criar diretório de saída
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  console.log('📸 Iniciando captura de screenshots...\n');
  
  const browser = await puppeteer.launch();
  
  for (const pageConfig of CONFIG.urls) {
    console.log(`📄 Processando: ${pageConfig.name}`);
    
    for (const viewport of CONFIG.viewports) {
      const page = await browser.newPage();
      await page.setViewport(viewport);
      
      try {
        await page.goto(pageConfig.url, { waitUntil: 'networkidle2' });
        await page.waitForTimeout(1000);
        
        const filename = `${pageConfig.name}_${viewport.name}.png`;
        const filepath = path.join(CONFIG.outputDir, filename);
        
        await page.screenshot({ path: filepath, fullPage: true });
        console.log(`  ✅ ${viewport.name} - ${filename}`);
      } catch (error) {
        console.log(`  ❌ Erro em ${viewport.name}: ${error.message}`);
      }
      
      await page.close();
    }
  }
  
  await browser.close();
  console.log('\n✅ Screenshots salvos em:', CONFIG.outputDir);
}

// Verificar se o servidor está rodando
console.log('⚠️ Certifique-se de que o servidor está rodando:');
console.log('   python3 -m http.server 8000\n');

takeScreenshots().catch(console.error);
