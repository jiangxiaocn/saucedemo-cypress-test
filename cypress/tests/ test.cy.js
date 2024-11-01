describe ("seesion",()=>{

    let userCookie
    beforeEach(() => {
    if (userCookie) {
        cy.setCookie('session-username', userCookie.value, userCookie)
        cy.visit('/inventory.html')
        // confirm we are logged in and not redirected to the root page
        cy.location('pathname').should('equal', '/inventory.html')
    } else {
        cy.log('**log in**')
        cy.visit('/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.location('pathname').should('equal', '/inventory.html')
        cy.getCookie('session-username')
        .should('exist')
        .then((c) => {
            userCookie = c
        })
    }
    })
    it('steg 1',()=>{
        cy.getByDataTest('add-to-cart-sauce-labs-backpack').click()
    })
    it('steg 2',()=>{
        cy.getByDataTest('shopping-cart-link').click()
    })

})