package trabajoPracticoAlgoritmos2

import funcionesAuxiliaresYConstantes.coincidenciaCompleta
import funcionesAuxiliaresYConstantes.coincidenciaInicial
import io.kotest.core.spec.IsolationMode
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import java.time.LocalDate

class TestVehiculosSpec : DescribeSpec({
    isolationMode = IsolationMode.InstancePerTest
    var motoBajaCilindrada = Motos(250, "Bmw", "300", LocalDate.parse("2019-01-01"), 900.0)
    var motoAltaCilindrada = Motos(500, "Honda", "Honda", LocalDate.parse("2019-01-01"), 1000.0)
    var autoHachBack = Autos(true, "Fiat", "Tipo", LocalDate.parse("2005-01-01"), 3000.0)
    var autoNoHachBack = Autos(false, "Peugeot", "408", LocalDate.parse("2001-01-01"), 2000.0)
    var camionetaSinDescuento = Camionetas(true, "Honda", "Honda", LocalDate.parse("2005-01-01"), 5000.0)

    describe("Test de vehiculos") {

        it("Moto baja cilindrada pocos dias") {
            motoBajaCilindrada.costoDeAlquiler(5) shouldBe 4500.0
        }
        it("Moto alta cilindrada muchos dias con convenio de descuento") {
            motoAltaCilindrada.tieneConvenio = true
            motoAltaCilindrada.costoDeAlquiler(10) shouldBe 13500.0
        }
        it("auto Hatchback muchos dias") {
            autoHachBack.costoDeAlquiler(15) shouldBe 49500.0
        }
        it("auto No Hatchback muchos dias con descuento") {
            autoNoHachBack.tieneConvenio = true
            autoNoHachBack.costoDeAlquiler(7) shouldBe 15750.0
        }
        it("camioneta sin descuento un dia") {
            camionetaSinDescuento.costoDeAlquiler(1) shouldBe 20000.0
        }
        it("camioneta sin descuento muchos dias") {
            camionetaSinDescuento.costoDeAlquiler(8) shouldBe 56500
        }
    }
    describe("test de vehiculos relacionados con las condiciones de busqueda dentro de un repositorio") {
        it("si el string de busqueda es igual al inicio del modelo del vehiculo, debe devolver true"){
            coincidenciaInicial(motoBajaCilindrada.modelo,"3") shouldBe true
            coincidenciaInicial(motoAltaCilindrada.modelo,"Ho") shouldBe true
        }
        it("si el string de busqueda no es igual al inicio del modelo del vehiculo, debe devolver false"){
            coincidenciaInicial(motoBajaCilindrada.modelo,"0") shouldBe false
            coincidenciaInicial(motoBajaCilindrada.modelo,"da") shouldBe false
        }
        it("si el string de busqueda es igual a la marca del vehiculo devuelve true"){
            coincidenciaCompleta(motoBajaCilindrada.marca,"bmw") shouldBe true
        }
        it("si el string de busqueda no es igual a la marca del vehiculo devuelve false"){
            coincidenciaCompleta(motoBajaCilindrada.marca,"bmo") shouldBe false
        }

    }
})