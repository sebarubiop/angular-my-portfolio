describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main navigation elements', () => {
    cy.get('.header-toolbar').should('be.visible');
    cy.get('.header-title').should('contain.text', 'Sebastian Rubio');
    cy.get('.header-subtitle').should('contain.text', 'Frontend Developer');
  });

  it('should navigate between pages', () => {
    // Test navigation to About page
    cy.get('a[routerLink="/about"]').click();
    cy.url().should('include', '/about');
    cy.get('.page-title').should('contain.text', 'About Me');

    // Test navigation to Experience page
    cy.get('a[routerLink="/experience"]').click();
    cy.url().should('include', '/experience');
    cy.get('.page-title').should('contain.text', 'Professional Experience');

    // Test navigation to Projects page
    cy.get('a[routerLink="/projects"]').click();
    cy.url().should('include', '/projects');
    cy.get('.page-title').should('contain.text', 'My Projects');

    // Test navigation to Contact page
    cy.get('a[routerLink="/contact"]').click();
    cy.url().should('include', '/contact');
    cy.get('.page-title').should('contain.text', 'Get In Touch');

    // Test navigation back to Home
    cy.get('a[routerLink="/"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('.hero-title').should('contain.text', 'Sebastian Rubio');
  });

  it('should toggle theme', () => {
    cy.get('.theme-toggle').click();
    cy.get('.app-container').should('have.class', 'dark-theme');
    
    cy.get('.theme-toggle').click();
    cy.get('.app-container').should('not.have.class', 'dark-theme');
  });

  it('should work on mobile devices', () => {
    cy.viewport(375, 667);
    
    // Menu button should be visible on mobile
    cy.get('.menu-button').should('be.visible');
    
    // Click menu button to open sidenav
    cy.get('.menu-button').click();
    cy.get('mat-sidenav').should('have.class', 'mat-drawer-opened');
    
    // Navigate to a page from mobile menu
    cy.get('a[routerLink="/about"]').click();
    cy.url().should('include', '/about');
    
    // Sidenav should close after navigation on mobile
    cy.get('mat-sidenav').should('not.have.class', 'mat-drawer-opened');
  });

  it('should display language selector', () => {
    cy.get('[matMenuTriggerFor="languageMenu"]').should('be.visible');
    cy.get('[matMenuTriggerFor="languageMenu"]').click();
    
    // Should show available languages
    cy.get('button[mat-menu-item]').should('have.length', 2);
    cy.get('button[mat-menu-item]').first().should('contain.text', 'English');
    cy.get('button[mat-menu-item]').last().should('contain.text', 'Español');
  });
});