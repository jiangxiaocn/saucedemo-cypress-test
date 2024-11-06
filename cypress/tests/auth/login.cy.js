///<reference types="cypress"/>
import strings from "../../constants/strings";
import { selectors } from "../../constants/selectors";

describe('Login', () => {

  const users = [
    { username: Cypress.env('USERNAME'), password: Cypress.env('PASSWORD'), error: null },
    { username: 'invalid_user', password: Cypress.env('PASSWORD'), error: strings.wrongUsernameAndPasswd },
    { username: Cypress.env('USERNAME'), password: 'invalid_passwd', error: strings.wrongUsernameAndPasswd },
    { username: 'invalid_user', password: 'invalid_passwd', error: strings.wrongUsernameAndPasswd },
    { username: '{selectall}{backspace}', password: Cypress.env('PASSWORD'), error: strings.wrongUsername },//{selectall}{backspace} equal to empty
    { username: Cypress.env('USERNAME'), password: '{selectall}{backspace}', error: strings.wrongPasswd },
    { username: '{selectall}{backspace}', password: '{selectall}{backspace}', error: strings.wrongUsername },
  ];

  beforeEach(() => {
    cy.visit('/')
  })


  users.forEach((user) => {
    it(`login with ${user.username === '{selectall}{backspace}' ? 'empty' : user.username === Cypress.env('USERNAME') ? 'valid' : 'invalid'} username and ${user.password === '{selectall}{backspace}' ? 'empty' : user.password === Cypress.env('PASSWORD') ? 'valid' : 'invalid'} password`, () => {
      cy.login(user.username, user.password);
      if (user.error) {
        cy.getByDataTest(selectors.logInError).should('exist').invoke('text').should('equal', user.error);
      } else {
        cy.url().should('include', '/inventory');
        cy.getByDataTest(selectors.inventoryList).should('be.visible');
      }
    });
  });

})