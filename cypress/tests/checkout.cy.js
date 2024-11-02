///<reference types="cypress"/>
import { selectors } from "../constants/selectors";
import strings from "../constants/strings";
import { URLs } from "../constants/urls";
import { captureProductDetails, validateProductInfo } from "../helpers/productHelpers";

describe('add product to cart and checkout', () => {

  beforeEach(() => {
    cy.loginSession(Cypress.env('username'), Cypress.env('password'))
    cy.visit(URLs.inventoryPage, { failOnStatusCode: false })
    captureProductDetails();
  })

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('add product to cart and check product info on Cart page', () => {

    cy.getByDataTest(selectors.addToCartButton).click()
    cy.getByDataTest(selectors.cartLink).click()
    cy.url().should('contain', URLs.cart)

    // Validate product information on the cart page
    validateProductInfo(selectors.cartCotent)

  })

  it('add product to cart and check product info on Checkout page', () => {
    //add product into localstorage
    cy.window().then((window) => {
      window.localStorage.setItem('cart-contents', JSON.stringify([4]));
    });

    cy.visit(URLs.cart, { failOnStatusCode: false })

    // Fill out checkout form
    cy.getByDataTest(selectors.checkoutButton).click()
    cy.url().should('contain', URLs.checkoutStepOne)
    cy.getByDataTest(selectors.firstName).type(Cypress.env('firstname'))
    cy.getByDataTest(selectors.lastName).type(Cypress.env('lastName'))
    cy.getByDataTest(selectors.postalCode).type(Cypress.env('postalCode'))
    cy.getByDataTest(selectors.continueButton).click()
    cy.url().should('contain', URLs.checkoutStepTwo)

    // Validate product information on the checkout overview page
    validateProductInfo(selectors.checkoutSummary)

    cy.getByDataTest(selectors.finishButton).click()
    cy.contains(strings.checkoutSuccess)

  })

})