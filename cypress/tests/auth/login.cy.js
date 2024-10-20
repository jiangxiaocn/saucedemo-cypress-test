///<reference types="cypress"/>
import strings from "../../constants/strings";

describe ('Login',()=>{

    const users = [
        { username: Cypress.env('username'), password: Cypress.env('password'), error: null },
        { username: 'invalid_user', password: Cypress.env('password'), error: strings.wrongUsernameAndPasswd },
        { username: Cypress.env('username'), password: 'invalid_passwd', error: strings.wrongUsernameAndPasswd },
        { username: 'invalid_user', password: 'invalid_passwd', error: strings.wrongUsernameAndPasswd },
        { username: '{selectall}{backspace}', password: Cypress.env('password'), error: strings.wrongUsername },//{selectall}{backspace} equal to empty
        { username: Cypress.env('username'), password: '{selectall}{backspace}', error: strings.wrongPasswd },
        { username: '{selectall}{backspace}', password: '{selectall}{backspace}', error: strings.wrongUsername },
      ];

    beforeEach(()=>{
         cy.visit('/')
    })
    
      
      users.forEach((user) => {
        it(`login with ${user.username === '{selectall}{backspace}' ? 'empty' : user.username === Cypress.env('username') ? 'valid' : 'invalid'} username and ${user.password === '{selectall}{backspace}' ? 'empty' : user.password === Cypress.env('password') ? 'valid' : 'invalid'} password`, () => {
          cy.login(user.username, user.password);
          if (user.error) {
            cy.getByDataTest('error').should('exist').invoke('text').should('equal', user.error);
          } else {
            cy.url().should('include', '/inventory');
            cy.getByDataTest('inventory-list').should('be.visible');
          }
        });
      });
      
})