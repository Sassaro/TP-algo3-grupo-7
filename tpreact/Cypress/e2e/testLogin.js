/// <reference types="cypress" />

import { getByDataTestId } from "../utils";

describe("login test ", function () {
    it("if the user doesn't write a username or password it should display an error", function () {
      //visita la pagina de login de la aplicacion
      cy.visit("./");
      //obtiene los inputs del login
      const inputUsername = getByDataTestId("username")
      const loginButton = getByDataTestId("loginButton")
  
      inputUsername.type("Pedro")
      loginButton.click()
      cy.wait(5000)
      getByDataTestId("errorPassword").should('exist')
      
    });

    it("if the user writes an incorrect username or password should display a error toast", function () {
      cy.visit("./");

      const inputUsername = getByDataTestId("username")
      const inputPassword = getByDataTestId("password")
      const loginButton = getByDataTestId("loginButton")
      
      inputUsername.type("Pedro")
      inputPassword.type("1234567")
      loginButton.click()
      //toast-1 es el id que usa el toast de chakra
      cy.wait(3000)
      cy.get("#toast-1").should('exist')
  });

  it("if the user writes a correct password and username the user should be redirected to the home page", function () {
    cy.visit("./");

    const inputUsername = getByDataTestId("username")
    const inputPassword = getByDataTestId("password")
    const loginButton = getByDataTestId("loginButton")
    
    inputUsername.type("JoPe1989")
    inputPassword.type("1234567")
    loginButton.click()

    cy.url().should('eq',"http://localhost:3000/home")
    cy.wait(5000)
});

});