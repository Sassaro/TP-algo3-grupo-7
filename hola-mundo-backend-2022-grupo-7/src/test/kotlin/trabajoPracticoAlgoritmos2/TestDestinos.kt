package trabajoPracticoAlgoritmos2

import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe

class TestDestinos : DescribeSpec({

    describe("Testeo de destinos") {
        val destinoLocal = Destino("Argentina","Cordoba",50000.0)
        val destinoExtranjero = Destino("Francia","Paris",80000.0)

        describe("Testeo de funciones de la clase destino"){

            describe("funcion esLocal()"){
                it("Dado un destino local"){
                    destinoLocal.esLocal() shouldBe true
                }
                it("Dado un destino extranjero"){
                    destinoExtranjero.esLocal() shouldBe false
                }
            }

            describe("Funcion calcularCostoBase()"){
                it("Dado un destino local"){
                    destinoLocal.calcularCostoBase() shouldBe 50000.0
                }
                it("Dado un destino extranjero"){
                    destinoExtranjero.calcularCostoBase() shouldBe 96000.0
                }
            }
        }

        describe("tests relacionados con el funcionamiento de la busqueda"){

            it("busqueda por el pais del destino"){
                destinoLocal.busquedaPorPais("arg") shouldBe true
                destinoLocal.busquedaPorPais("nicaragua") shouldBe false
            }

            it("busqueda por la ciudad del destino"){
                destinoLocal.busquedaPorCiudad("cord") shouldBe true
                destinoLocal.busquedaPorCiudad("Buenos Aires") shouldBe false
            }
        }

    }
})