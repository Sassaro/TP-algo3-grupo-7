/// <reference types="cypress" />

import { getByDataTestId } from "../utils"

describe("home test ", function () {


it("the user login, after him logout", function () {
    cy.visit("./")

    const inputUsername = getByDataTestId("username")
    const inputPassword = getByDataTestId("password")
    const loginButton = getByDataTestId("loginButton")
    
    inputUsername.type("JoPe1989")
    inputPassword.type("1234567")
    loginButton.click()
    cy.wait(5000)
    cy.url().should('eq',"http://localhost:3000/home")

    const salirButton = getByDataTestId("salirButton")

    salirButton.click()
    cy.wait(5000)
    cy.url().should('eq',"http://localhost:3000/")

})

it("the user access with other user", function () {

    const inputUsername = getByDataTestId("username")
    const inputPassword = getByDataTestId("password")
    const loginButton = getByDataTestId("loginButton")

    inputUsername.type("pepe")
    inputPassword.type("1234567")
    loginButton.click()
    cy.wait(5000)
    cy.url().should('eq',"http://localhost:3000/home")


})

})