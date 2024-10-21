# saucedemo-cypress-test
# E2E tests with [Cypress](https://www.cypress.io/)

"A suite of automated tests developed in JavaScript using the Cypress framework for the website https://www.saucedemo.com/"

# 🛠️Setup and installation 

Install the necessary package, run:

`npm install dotenv --save-dev`

### ⚠️ Important Note
Create a `.env` file in the root directory of your project. Add the following information to the file, replacing validUsername and validPassword with the actual credentials:

`USERNAME=validUsername`
`PASSWORD=validPassword`
`FIRSTNAME=xiao`
`LASTNAME=jiang`
`POSTALCODE=12067`


Install Cypress via npm:

`cd /your/project/path`

`npm install cypress --save-dev`

Open Cypress UI:

`npx cypress open`

Run Cypress tests on Electron in headless mode:

`npx cypress run`

Run Cypress tests on Chrome in headless mode:

`npx cypress run --browser chrome`

## Folder structure

```sh
cypress/

├── constants/ # put constants that's used by tests here
│   ├── strings.js
│   └── ...
├── fixtures/ # stubbed responses from API endpoints
│   ├── example.json
│   └── ...
├── helpers/ # helper code that can be shared between commands or scenarios
│   └── ...
├── screenshots/ # automatically save screenshots when tests failing
├── support/ # put custom commands that interact with the app here.
│   ├── commands.js
│   └── ...
├── tests/ # test specs
│   ├── checkout.cy.js
│   └── ...
├── vedios/ 
│   └── ...
├── .gitignore
>>>>>>> version2
├── README.md # this doc
```
## How to name and where to put your tests and other related code
-  scenarios should be named after features that they test, examples: login.cy.js
-  data stubs should be named after endpoints they stub
-  name elements so that it would be easy for others to figure out what they refer to and reuse them
-  don't hesitate and add helpers whenever you see repetitive actions in the scenarios

## General best practices
-   Use data-test attribute for locating element 
-   keep tests independent -- a nice rule of thumb is to be able to run any test case separately (e.g. using `it.only()`)
-   tests must be fast,concise
-   write clear `describe` and `it` messages so that it would be easy to figure out which feature failed without having to dive into the code of the test case
-   when a test failed, think about if the error message understanable, if not, try to improve it
-   always to think about when UI render slowly due to internet problem, will our test fail, try to think about the stability
-   Best Practices for writing Cypress Tests, please refer to : https://docs.cypress.io/guides/references/best-practices

## limitations
Unable to set the application state programmatically (e.g., adding a product to the cart via API or other methods), or clean up tests before/after execution or upon failures. This prevents the tests from being fully atomic.

Unable to log in programmatically (e.g., setting cookies or local storage or via API), which forces the checkout test to rely on UI-based login, reducing efficiency.
