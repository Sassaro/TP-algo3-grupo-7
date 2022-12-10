/// <reference types="cypress" />


import { getByDataTestId } from "../utils"

describe('Test Vehicles', function () {
    it('In the Vehicles page, if the user inputs "Honda" in the search field, a result should appear', function () {
        cy.visit("./")
        const inputUsername = getByDataTestId('username')
        const inputPassword = getByDataTestId('password')
        const loginButton = getByDataTestId('loginButton')
        inputUsername.type('pepe')
        inputPassword.type('1234567')
        loginButton.click()
        const vehiclePageButton = getByDataTestId('vehiculosButton')
        vehiclePageButton.click()
        const vehicleSearch = getByDataTestId('inputSearch')
        const buttonSearch = getByDataTestId('buttonSearch')
        vehicleSearch.type('Honda')
        buttonSearch.click()
        cy.wait(5000)
        cy.get('.itemsContainer').contains('Honda').should('exist')
    })

    it("if the user creates a new Vehicle, it should appear on the list", function(){
        cy.visit("./")
        const inputUsername = getByDataTestId('username')
        const inputPassword = getByDataTestId('password')
        const loginButton = getByDataTestId('loginButton')

        inputUsername.type('pepe')
        inputPassword.type('1234567')
        loginButton.click()

        const vehiclePageButton = getByDataTestId('vehiculosButton')
        vehiclePageButton.click()
        const addButton = getByDataTestId("addButton")
        addButton.click()

        const marca = getByDataTestId('marca')
        const tipo = getByDataTestId('tipo')
        const modelo = getByDataTestId('modelo')
        const anio = getByDataTestId('anio')
        const costo = getByDataTestId('costo')
        const acceptButton = getByDataTestId('acceptButton')
        marca.type('Chevrolet')
        tipo.select('Camioneta')
        modelo.type('Blazer')
        anio.type('2000')
        costo.type('1500')
        acceptButton.click()

        const vehicleSearch = getByDataTestId('inputSearch')
        const buttonSearch = getByDataTestId('buttonSearch')

        vehicleSearch.type('Chevrolet')
        buttonSearch.click()

        cy.wait(5000)

        cy.get('.itemsContainer').contains('Chevrolet').should('exist')
        
    })

    it('if the user deletes the added Vehicle, it should not appear on the list', function() {
        cy.visit("./")
        const inputUsername = getByDataTestId('username')
        const inputPassword = getByDataTestId('password')
        const loginButton = getByDataTestId('loginButton')
        inputUsername.type('pepe')
        inputPassword.type('1234567')
        loginButton.click()
        const vehiclePageButton = getByDataTestId('vehiculosButton')
        vehiclePageButton.click()
        const deleteButton = getByDataTestId('deleteButtonChevroletBlazer')
        deleteButton.click()
        cy.get('.itemsContainer').contains('Chevrolet').should('not.exist')
    })
})
