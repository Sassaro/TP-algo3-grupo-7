/// <reference types="cypress" />


import { getByDataTestId } from "../utils"

describe("Destination Test", function () {
    it("if user type Argentina in search bar shoud exists destination with that name", function () {
    
        cy.visit("./")

        const inputUsername = getByDataTestId("username")
        const inputPassword = getByDataTestId("password")
        const loginButton = getByDataTestId("loginButton")
        
        inputUsername.type("JoPe1989")
        inputPassword.type("1234567")
        loginButton.click()

        const destinoButton = getByDataTestId("destinosButton")
        
        destinoButton.click()

        const inputSearch = getByDataTestId("inputSearch")
        const buttonSearch = getByDataTestId("buttonSearch")
        
        
        inputSearch.type("Argentina")
        buttonSearch.click()
        cy.wait(5000)
        cy.get('.itemsContainer').contains('Argentina').should('exist')
    })

    it("If user type a destination that not exist, should not exist", function () {
        cy.visit("./")

        const inputUsername = getByDataTestId("username")
        const inputPassword = getByDataTestId("password")
        const loginButton = getByDataTestId("loginButton")
        
        inputUsername.type("JoPe1989")
        inputPassword.type("1234567")
        loginButton.click()

        const destinoButton = getByDataTestId("destinosButton")
        
        destinoButton.click()

        const inputSearch = getByDataTestId("inputSearch")
        const buttonSearch = getByDataTestId("buttonSearch")
        

        inputSearch.type("asdassalkdsala")
        buttonSearch.click()
        cy.wait(5000)
        getByDataTestId('emptyDestinationList').should('exist')
    })

    it("if user add destination, should exist in card", function(){

        cy.visit("./")

        const inputUsername = getByDataTestId("username")
        const inputPassword = getByDataTestId("password")
        const loginButton = getByDataTestId("loginButton")
        
        inputUsername.type("JoPe1989")
        inputPassword.type("1234567")
        loginButton.click()

        const destinoButton = getByDataTestId("destinosButton")
        
        destinoButton.click()
        
        const addButton = getByDataTestId("addButton")

        addButton.click()

        const selectorPais = getByDataTestId("selectorPais")
        const ciudad = getByDataTestId("ciudad")
        const costoBase = getByDataTestId("costoBase")
        const acceptButton = getByDataTestId("acceptButton")
        

        selectorPais.select("Japón")
        ciudad.type("Tokyo")
        costoBase.type(150000)
        acceptButton.click()
        cy.wait(5000)
        cy.get('.itemsContainer').contains('Japón').should('exist')
        cy.get('.itemsContainer').contains('Tokyo').should('exist')

        
    })

    it("If user delete card, should not exist", function () {
        cy.visit("./")

        const inputUsername = getByDataTestId("username")
        const inputPassword = getByDataTestId("password")
        const loginButton = getByDataTestId("loginButton")
        
        inputUsername.type("JoPe1989")
        inputPassword.type("1234567")
        loginButton.click()

        const destinoButton = getByDataTestId("destinosButton")
        
        destinoButton.click()

        const borrar = getByDataTestId("deleteButtonJapónTokyo")

        borrar.click()
        cy.wait(5000)
        cy.get('.itemsContainer').contains('Japón').should('not.exist')

    })
})