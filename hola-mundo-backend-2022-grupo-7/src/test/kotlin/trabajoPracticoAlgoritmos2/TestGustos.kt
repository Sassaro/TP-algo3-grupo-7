package trabajoPracticoAlgoritmos2

import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import java.time.LocalDate

class TestGustosSpec: DescribeSpec({
    var autoPerfecto = Autos(true,"Fiat","Fiat", LocalDate.parse ("2022-01-01"),2000.0,15)
    var autoMalo = Autos(true,"Honda","Civic", LocalDate.parse ("2015-01-01"),2000.0,15)
    autoMalo.kilometrajeLibre=false
    var autoMedio = Autos(true,"Honda","Hd", LocalDate.parse ("2016-01-01"),2000.0,15)

    var neofilo = Neofilo()
    var supersticioso = Supersticioso()
    var caprichoso = Caprichoso()
    var selectivo = Selectivo("Fiat")
    var sinlimites = SinLimite()
    var combinado = Combinado(mutableListOf(caprichoso,supersticioso))
    var combinado2 = Combinado(mutableListOf(neofilo,supersticioso))

    describe("Test neofilo"){
        it("Le gusta autoPerfecto"){
            neofilo.condicion(autoPerfecto) shouldBe true
        }
        it("No le gusta autoMalo"){
            neofilo.condicion(autoMalo) shouldBe false
        }
        it("no le gusta autoMedio"){
            neofilo.condicion(autoMedio) shouldBe false
        }
    }
    describe("Test supersticioso"){
        it("Le gusta autoPerfecto"){
            supersticioso.condicion(autoPerfecto) shouldBe true
        }
        it("No le gusta autoMalo"){
            supersticioso.condicion(autoMalo) shouldBe false
        }
        it("Le gusta autoMedio"){
            supersticioso.condicion(autoMedio) shouldBe true
        }
    }
    describe("Test caprichoso"){
        it("Le gusta autoPerfecto"){
            caprichoso.condicion(autoPerfecto) shouldBe true
        }
        it("No le gusta autoMalo"){
            caprichoso.condicion(autoMalo) shouldBe false
        }
        it("Le gusta autoMedio"){
            caprichoso.condicion(autoMedio) shouldBe true
        }
    }
    describe("Test selectivo"){
        it("Le gusta autoPerfecto"){
            selectivo.condicion(autoPerfecto) shouldBe true
        }
        it("No le gusta autoMalo"){
            selectivo.condicion(autoMalo) shouldBe false
        }
        it("no le gusta autoMedio"){
            selectivo.condicion(autoMedio) shouldBe false
        }
    }
    describe("Test sinlimites"){
        it("Le gusta autoPerfecto"){
            sinlimites.condicion(autoPerfecto) shouldBe true
        }
        it("No le gusta autoMalo"){
            sinlimites.condicion(autoMalo) shouldBe false
        }
        it("Le gusta autoMedio"){
            sinlimites.condicion(autoMedio) shouldBe true
        }

    }
    describe("Test combinado"){
        it("Le gusta autoPerfecto"){
            combinado.condicion(autoPerfecto) shouldBe true
        }
        it("No le gusta autoMalo"){
            combinado.condicion(autoMalo) shouldBe false
        }
        it("Le gusta autoMedio"){
            combinado.condicion(autoMedio) shouldBe true
        }
    }
    describe("Test combinado2"){
        it("Le gusta autoPerfecto"){
            combinado2.condicion(autoPerfecto) shouldBe true
        }
        it("No le gusta autoMalo"){
            combinado2.condicion(autoMalo) shouldBe false
        }
        it("No le gusta autoMedio"){
            combinado2.condicion(autoMedio) shouldBe false
        }
    }
})