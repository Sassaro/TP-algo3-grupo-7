/// <reference types="cypress" />

import { getByDataTestId } from "../utils"

describe("Activities Test", function () {
    it("If the tries to create an activity with errors, those error should be displayed", function () {

        cy.visit("./")

        const inputUsername = getByDataTestId("username")
        const inputPassword = getByDataTestId("password")
        const loginButton = getByDataTestId("loginButton")

        inputUsername.type("Pedro")
        inputPassword.type("HolaMundo")
        loginButton.click()

        const activityButton = getByDataTestId("activitiesButton")

        activityButton.click()

        const createButton = getByDataTestId("addButton")

        createButton.click()

        const descripcion = getByDataTestId("descripcion")
        const inicio = getByDataTestId("inicio")
        const fin = getByDataTestId("fin")
        const acceptButton = getByDataTestId("acceptButton")

        descripcion.type("Test 1")
        inicio.type("07:30")
        fin.type("08:30")
        acceptButton.click()
        cy.wait(5000)
        getByDataTestId("errorCosto").should("exist")
        getByDataTestId("errorDificultad").should("exist")

    })

    it("If the user creates an activity it should be created correctly", function () {

        cy.visit("./")

        const inputUsername = getByDataTestId("username")
        const inputPassword = getByDataTestId("password")
        const loginButton = getByDataTestId("loginButton")

        inputUsername.type("Pedro")
        inputPassword.type("HolaMundo")
        loginButton.click()

        const activityButton = getByDataTestId("activitiesButton")

        activityButton.click()

        const createButton = getByDataTestId("addButton")

        createButton.click()

        const descripcion = getByDataTestId("descripcion")
        const inicio = getByDataTestId("inicio")
        const fin = getByDataTestId("fin")
        const dificultad = getByDataTestId("dificultad")
        const costo = getByDataTestId("costo")
        const acceptButton = getByDataTestId("acceptButton")

        descripcion.type("Test 1")
        inicio.type("07:30")
        fin.type("08:30")
        dificultad.select("BAJA")
        costo.type("1500")
        acceptButton.click()
        cy.wait(5000)
        cy.get('.itemsContainer').contains('Test 1').should('exist')
    })

    it("If the user deletes an activity it should be deleted correctly", function () {

        cy.visit("./")

        const inputUsername = getByDataTestId("username")
        const inputPassword = getByDataTestId("password")
        const loginButton = getByDataTestId("loginButton")

        inputUsername.type("Pedro")
        inputPassword.type("HolaMundo")
        loginButton.click()

        const activityButton = getByDataTestId("activitiesButton")

        activityButton.click()
        
        const deleteButton = getByDataTestId("deleteButtonTest 1")
        deleteButton.click()
        cy.wait(5000)
        cy.get('.itemsContainer').contains('Test 1').should('not.exist')
    })
})