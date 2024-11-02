require('dotenv').config()
const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env:{
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    firstname: process.env.FIRSTNAME,
    lastName: process.env.LASTNAME,
    postalCode: process.env.POSTALCODE,
  },
  e2e: {
    baseUrl:'https://www.saucedemo.com',
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile:'cypress/support/e2e.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  },
});
