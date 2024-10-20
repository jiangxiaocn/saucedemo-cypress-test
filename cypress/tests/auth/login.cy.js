import strings from "../../constans/strings"

describe ('Login',()=>{

    beforeEach(()=>{
         cy.visit('/')
    })
    it('login with valid username and valid password',()=>{
        cy.login(Cypress.env('username'),Cypress.env('password'))
        cy.url().should('include','/inventory')
        cy.getByDataTest('inventory-list').should('be.visible')
        cy.getByDataTest('inventory-item').should('have.length.greaterThan',0)
    })

    it('login with INVALID username & valid password',()=>{
        cy.login('standard',Cypress.env('password'))
        cy.getByDataTest('error').invoke('text').then((errorText)=>{
            expect(errorText).to.equal(strings.wrongUsernameAndPasswd)
        })
    })

    it('login with valid username & INVALID password',()=>{
        cy.login(Cypress.env('username'),'secret')
        cy.getByDataTest('error').invoke('text').then((errorText)=>{
            expect(errorText).to.equal(strings.wrongUsernameAndPasswd)
        })
    })

    it('login with INVALID username & INVALID password',()=>{
        cy.login('standard','secret')
        cy.getByDataTest('error').invoke('text').then((errorText)=>{
            expect(errorText).to.equal(strings.wrongUsernameAndPasswd)
        })
    })
    it('login with EMPTY username & VALID password',()=>{
        cy.login('{selectall}{backspace}','secret_sauce')
        cy.getByDataTest('error').invoke('text').then((errorText)=>{
            expect(errorText).to.equal(strings.wrongUsername)
        })
    })
    it('login with VALID username & EMPTY password',()=>{
        cy.login('standard_user','{selectall}{backspace}')
        cy.getByDataTest('error').invoke('text').then((errorText)=>{
            expect(errorText).to.equal(strings.wrongPasswd)
        })
    })
    it('login with EMPTY username & EMPTY password',()=>{
        cy.login('{selectall}{backspace}','{selectall}{backspace}')
        cy.getByDataTest('error').invoke('text').then((errorText)=>{
            expect(errorText).to.equal(strings.wrongUsername)
        })
    })
})