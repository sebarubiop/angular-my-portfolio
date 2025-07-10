describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display hero section', () => {
    cy.get('.hero-section').should('be.visible');
    cy.get('.hero-title').should('contain.text', 'Sebastian Rubio');
    cy.get('.hero-subtitle').should('contain.text', 'Senior Frontend Developer');
    cy.get('.hero-description').should('contain.text', '8+ years');
  });

  it('should display hero image', () => {
    cy.get('.hero-image img').should('be.visible');
    cy.get('.hero-image img').should('have.attr', 'alt').and('contain', 'Sebastian Rubio');
  });

  it('should have working CTA buttons', () => {
    cy.get('.primary-cta').should('contain.text', 'View My Work');
    cy.get('.secondary-cta').should('contain.text', 'Get In Touch');
    
    // Test primary CTA navigation
    cy.get('.primary-cta').click();
    cy.url().should('include', '/projects');
    
    // Go back to home
    cy.visit('/');
    
    // Test secondary CTA navigation
    cy.get('.secondary-cta').click();
    cy.url().should('include', '/contact');
  });

  it('should display technology stack', () => {
    cy.get('.tech-stack-section').should('be.visible');
    cy.get('.tech-chip').should('have.length.greaterThan', 0);
    cy.get('.tech-chip').first().should('contain.text', 'Angular');
  });

  it('should display stats section', () => {
    cy.get('.stats-section').should('be.visible');
    cy.get('.stat-card').should('have.length', 4);
    
    // Check first stat
    cy.get('.stat-card').first().within(() => {
      cy.get('.stat-number').should('contain.text', '8+');
      cy.get('.stat-label').should('contain.text', 'Years Experience');
    });
  });

  it('should display featured projects', () => {
    cy.get('.featured-section').should('be.visible');
    cy.get('.project-card').should('have.length', 3);
    
    // Check first project
    cy.get('.project-card').first().within(() => {
      cy.get('.project-title').should('contain.text', 'E-Commerce Platform');
      cy.get('.project-description').should('be.visible');
      cy.get('.tech-chip-small').should('have.length.greaterThan', 0);
    });
  });

  it('should have working "View All Projects" button', () => {
    cy.get('.view-all-btn').should('contain.text', 'View All Projects');
    cy.get('.view-all-btn').click();
    cy.url().should('include', '/projects');
  });

  it('should be responsive', () => {
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get('.hero-content').should('have.css', 'grid-template-columns', 'none');
    cy.get('.stats-grid').should('have.css', 'grid-template-columns').and('not.contain', 'repeat');
    
    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get('.hero-content').should('have.css', 'grid-template-columns', 'none');
    
    // Test desktop layout
    cy.viewport(1280, 720);
    cy.get('.hero-content').should('not.have.css', 'grid-template-columns', 'none');
  });

  it('should have proper image loading', () => {
    // Check that images load properly
    cy.get('.hero-image img').should('be.visible').and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
    
    cy.get('.project-image img').each(($img) => {
      cy.wrap($img).should('be.visible').and(() => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    });
  });

  it('should have smooth animations', () => {
    // Test hover effects on cards
    cy.get('.stat-card').first().trigger('mouseover');
    cy.get('.stat-card').first().should('have.css', 'transform').and('not.equal', 'none');
    
    cy.get('.project-card').first().trigger('mouseover');
    cy.get('.project-card').first().should('have.css', 'transform').and('not.equal', 'none');
  });
});