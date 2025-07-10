describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should display contact form elements', () => {
    cy.get('.contact-form').should('be.visible');
    cy.get('input[formControlName="firstName"]').should('be.visible');
    cy.get('input[formControlName="lastName"]').should('be.visible');
    cy.get('input[formControlName="email"]').should('be.visible');
    cy.get('textarea[formControlName="message"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should validate required fields', () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click();
    
    // Check for validation errors
    cy.get('mat-error').should('contain.text', 'First name is required');
    cy.get('mat-error').should('contain.text', 'Last name is required');
    cy.get('mat-error').should('contain.text', 'Email is required');
    cy.get('mat-error').should('contain.text', 'Message is required');
  });

  it('should validate email format', () => {
    cy.get('input[formControlName="email"]').type('invalid-email');
    cy.get('input[formControlName="email"]').blur();
    
    cy.get('mat-error').should('contain.text', 'Please enter a valid email');
  });

  it('should validate message minimum length', () => {
    cy.get('textarea[formControlName="message"]').type('short');
    cy.get('textarea[formControlName="message"]').blur();
    
    cy.get('mat-error').should('contain.text', 'Message must be at least 10 characters long');
  });

  it('should submit form with valid data', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'This is a test message that is long enough to pass validation'
    };

    cy.fillContactForm(formData);
    
    // Fill optional fields
    cy.get('input[formControlName="phone"]').type('+1234567890');
    cy.get('input[formControlName="company"]').type('Test Company');
    cy.get('mat-select[formControlName="projectType"]').click();
    cy.get('mat-option').contains('Web Application').click();
    cy.get('mat-select[formControlName="budget"]').click();
    cy.get('mat-option').contains('$5,000 - $15,000').click();

    // Submit form
    cy.get('button[type="submit"]').click();
    
    // Check for success message
    cy.get('simple-snack-bar').should('contain.text', 'Message sent successfully');
    
    // Form should be reset
    cy.get('input[formControlName="firstName"]').should('have.value', '');
  });

  it('should reset form when reset button is clicked', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'Test message'
    };

    cy.fillContactForm(formData);
    
    cy.get('button').contains('Reset Form').click();
    
    // All fields should be empty
    cy.get('input[formControlName="firstName"]').should('have.value', '');
    cy.get('input[formControlName="lastName"]').should('have.value', '');
    cy.get('input[formControlName="email"]').should('have.value', '');
    cy.get('textarea[formControlName="message"]').should('have.value', '');
  });

  it('should display contact information', () => {
    cy.get('.contact-info-section').should('be.visible');
    cy.get('.method-value').should('contain.text', 'sebastian.rubio');
    cy.get('.contact-method').should('contain.text', '+54 11 1234-5678');
    cy.get('.contact-method').should('contain.text', 'Buenos Aires, Argentina');
  });

  it('should display FAQ section', () => {
    cy.get('.faq-section').should('be.visible');
    cy.get('.faq-item').should('have.length.greaterThan', 0);
    cy.get('.faq-question').first().should('contain.text', 'How long does a typical project take?');
  });

  it('should be responsive', () => {
    cy.checkResponsive(['mobile', 'tablet', 'desktop']);
    
    // Check mobile layout
    cy.viewport(375, 667);
    cy.get('.contact-content').should('have.css', 'grid-template-columns', 'none');
    
    // Check desktop layout
    cy.viewport(1280, 720);
    cy.get('.contact-content').should('not.have.css', 'grid-template-columns', 'none');
  });
});