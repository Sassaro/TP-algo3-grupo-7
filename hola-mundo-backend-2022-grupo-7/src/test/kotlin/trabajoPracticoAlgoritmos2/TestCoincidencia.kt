package trabajoPracticoAlgoritmos2

import funcionesAuxiliaresYConstantes.coincidenciaCompleta
import funcionesAuxiliaresYConstantes.coincidenciaParcial
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe

class TestCoincidenciaSpec : DescribeSpec({

    describe("Test de coincidencia"){

        it("dados dos strings muy parecidos, el metodo de coincidenciaParcial debe devolver true"){

            coincidenciaParcial("hola","hol") shouldBe true
            coincidenciaParcial("holis","ho") shouldBe true

        }
        it("dados dos strings muy distintos, el metodo de coincidenciaParcial debe devolver false"){

            coincidenciaParcial("tomas","pedro") shouldBe false
            coincidenciaParcial("hola","chau") shouldBe false

        }
        it("dados dos strings iguales, el metodo de coincidenciaCompleta debe devolver true"){
            coincidenciaCompleta("hola","hola") shouldBe true
            coincidenciaCompleta("hola","holA") shouldBe true
        }
        it("dados dos strings distintos, el metodo de coincidenciaCompleta debe devolver false"){
            coincidenciaCompleta("hola","holis") shouldBe false
        }
    }
})