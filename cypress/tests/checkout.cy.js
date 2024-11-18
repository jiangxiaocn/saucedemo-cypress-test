///<reference types="cypress"/>
import { productTitle } from "../constants/productTitle";
import { selectors } from "../constants/selectors";
import strings from "../constants/strings";
import { URLs } from "../constants/urls";
import { captureProductDetails, validateProductInfo, addToCartButton } from "../helpers/productHelpers";

describe('add product to cart and checkout', () => {

  beforeEach(() => {
    cy.loginSession(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    cy.visit(URLs.inventoryPage, { failOnStatusCode: false })
    captureProductDetails(productTitle.sauceLabsBackpack)
  })

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('add product to cart and check product info on Cart page', () => {

    addToCartButton(productTitle.sauceLabsBackpack)
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
    cy.getByDataTest(selectors.firstName).type(Cypress.env('FIRSTNAME'))
    cy.getByDataTest(selectors.lastName).type(Cypress.env('LASTNAME'))
    cy.getByDataTest(selectors.postalCode).type(Cypress.env('POSTALCODE'))
    cy.getByDataTest(selectors.continueButton).click()
    cy.url().should('contain', URLs.checkoutStepTwo)

    // Validate product information on the checkout overview page
    validateProductInfo(selectors.checkoutSummary)

    cy.getByDataTest(selectors.finishButton).click()
    cy.contains(strings.checkoutSuccess)

  })

})