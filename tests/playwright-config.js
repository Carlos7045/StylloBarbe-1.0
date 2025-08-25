/**
 * Configuração padrão para testes Playwright do StylloBarber
 * Este arquivo define as configurações e utilitários para testes automatizados
 */

const STYLLO_BARBER_CONFIG = {
  // URLs base para testes
  baseUrl: 'http://localhost:3000',
  
  // Páginas principais da aplicação
  pages: {
    home: '/',
    login: '/login',
    register: '/cadastro',
    adminSaas: '/admin-saas',
    adminBarbearia: '/admin-barbearia',
    barbeiro: '/barbeiro',
    cliente: '/cliente',
    agendamento: '/agendamento'
  },
  
  // Seletores comuns para elementos da interface
  selectors: {
    // Header
    logo: '[data-testid="logo"]',
    loginButton: 'link[href="/login"]',
    registerButton: 'link[href="/cadastro"]',
    
    // Landing page
    heroTitle: 'h1:has-text("StylloBarber Sistema Completo")',
    ctaButton: 'button:has-text("Começar Agora")',
    pricingSection: '[data-testid="pricing-section"]',
    
    // Formulários
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    
    // Componentes comuns
    loadingSpinner: '[data-testid="loading"]',
    errorMessage: '[data-testid="error-message"]',
    successMessage: '[data-testid="success-message"]'
  },
  
  // Timeouts para diferentes tipos de operação
  timeouts: {
    navigation: 30000,
    element: 10000,
    api: 15000
  },
  
  // Dados de teste
  testData: {
    validUser: {
      email: 'teste@styllobarber.com',
      password: 'senha123',
      nome: 'Usuário Teste'
    },
    invalidUser: {
      email: 'invalido@test.com',
      password: 'senhaerrada'
    }
  }
};

/**
 * Utilitários para testes Playwright
 */
const PlaywrightUtils = {
  /**
   * Navega para uma página específica
   */
  async navigateToPage(page, pageName) {
    const url = STYLLO_BARBER_CONFIG.pages[pageName];
    if (!url) {
      throw new Error(`Página '${pageName}' não encontrada na configuração`);
    }
    
    await page.goto(STYLLO_BARBER_CONFIG.baseUrl + url, {
      waitUntil: 'networkidle',
      timeout: STYLLO_BARBER_CONFIG.timeouts.navigation
    });
  },
  
  /**
   * Aguarda um elemento aparecer na tela
   */
  async waitForElement(page, selector, timeout = STYLLO_BARBER_CONFIG.timeouts.element) {
    return await page.waitForSelector(selector, { timeout });
  },
  
  /**
   * Preenche um formulário de login
   */
  async fillLoginForm(page, email, password) {
    await page.fill(STYLLO_BARBER_CONFIG.selectors.emailInput, email);
    await page.fill(STYLLO_BARBER_CONFIG.selectors.passwordInput, password);
  },
  
  /**
   * Tira screenshot com nome padronizado
   */
  async takeScreenshot(page, name, fullPage = false) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    
    return await page.screenshot({
      path: `tests/screenshots/${filename}`,
      fullPage
    });
  },
  
  /**
   * Verifica se a página carregou corretamente
   */
  async verifyPageLoad(page, expectedTitle) {
    // Verifica se o título está correto
    const title = await page.title();
    if (!title.includes(expectedTitle)) {
      throw new Error(`Título esperado: ${expectedTitle}, encontrado: ${title}`);
    }
    
    // Verifica se não há erros de console críticos
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    return { title, errors };
  },
  
  /**
   * Testa responsividade em diferentes tamanhos de tela
   */
  async testResponsiveness(page, url) {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];
    
    const results = [];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(url);
      
      const screenshot = await this.takeScreenshot(page, `responsive-${viewport.name}`, true);
      
      results.push({
        viewport: viewport.name,
        dimensions: `${viewport.width}x${viewport.height}`,
        screenshot
      });
    }
    
    return results;
  }
};

module.exports = {
  STYLLO_BARBER_CONFIG,
  PlaywrightUtils
};