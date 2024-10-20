// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => { 
    cy.getByDataTest('username').type(username)
    cy.getByDataTest('password').type(password)
    cy.getByDataTest('login-button').click()
    })

// cypress/support/commands.js

Cypress.Commands.add('loginSession', (username, password) => {
    cy.session([username, password], () => {
    cy.visit('/')
    cy.getByDataTest('username').type(username)
    cy.getByDataTest('password').type(password)
    cy.getByDataTest('login-button').click()
    cy.url().should('include', '/inventory'); // Adjust based on your app
    });
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("getByDataTest", (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
  });
  