/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Custom command to fill contact form
       */
      fillContactForm(formData: {
        firstName: string;
        lastName: string;
        email: string;
        message: string;
      }): Chainable<void>;
      
      /**
       * Custom command to navigate to page
       */
      navigateToPage(page: string): Chainable<void>;
      
      /**
       * Custom command to check responsive design
       */
      checkResponsive(breakpoints: string[]): Chainable<void>;
    }
  }
}

Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('fillContactForm', (formData) => {
  cy.get('input[formControlName="firstName"]').type(formData.firstName);
  cy.get('input[formControlName="lastName"]').type(formData.lastName);
  cy.get('input[formControlName="email"]').type(formData.email);
  cy.get('textarea[formControlName="message"]').type(formData.message);
});

Cypress.Commands.add('navigateToPage', (page: string) => {
  cy.get(`a[routerLink="/${page}"]`).click();
  cy.url().should('include', `/${page}`);
});

Cypress.Commands.add('checkResponsive', (breakpoints: string[]) => {
  breakpoints.forEach(breakpoint => {
    if (breakpoint === 'mobile') {
      cy.viewport(375, 667);
    } else if (breakpoint === 'tablet') {
      cy.viewport(768, 1024);
    } else if (breakpoint === 'desktop') {
      cy.viewport(1280, 720);
    }
    cy.wait(500); // Allow time for responsive changes
  });
});

export {};