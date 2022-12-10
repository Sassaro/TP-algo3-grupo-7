package trabajoPracticoAlgoritmos2

import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import java.time.LocalTime

class DiaDeActividadSpec :DescribeSpec({

    val actividadBAJA = Actividad(1000.0, "Senderismo", LocalTime.of(9, 30,0), LocalTime.of(10, 30,0), Dificultad.BAJA)
    val actividadBAJA2 = Actividad(1000.0, "Nadar", LocalTime.of(11, 30,0), LocalTime.of(13, 30,0), Dificultad.BAJA)
    val actividad1 = Actividad(1000.0, "Senderismo", LocalTime.of(9, 30,0), LocalTime.of(12, 30,0), Dificultad.BAJA)
    val actividad2 = Actividad(1000.0, "Nadar", LocalTime.of(8, 0,0), LocalTime.of(10, 30,0), Dificultad.BAJA)

    val listaDeActividadesBAJA = mutableListOf(actividadBAJA,actividadBAJA2)
    val listaDeActividadesSolapada = mutableListOf(actividad1,actividad2)

    val diaDeActividadBAJA = DiaDeActividad(listaDeActividadesBAJA)
    val diaDeActividadesSolapadas = DiaDeActividad(listaDeActividadesSolapada)
    val diaDeActividadesVacio = DiaDeActividad(mutableListOf())

    describe("Test relacionados con el funcionamiento de los dias de actividades"){

        it("Si se pide calcular la cantidad de tiempo de actividad en un dia, el resultado deberia de ser correcto"){
            //En este caso seria 180 minutos (60 de senderismo + 120 de nadar)
            diaDeActividadBAJA.tiempoDeActividadEnElDia() shouldBe 180
        }
        it("Teniendo un dia de actividades sin actividades solapadas, el mismo debe devolver que no tiene actividades solapadas") {
            diaDeActividadBAJA.tieneActividadesSolapadas() shouldBe false
        }
        it("Teniendo un dia de actividades con actividades solapadas, el mismo debe devolver que tiene actividades solapadas") {
            diaDeActividadesSolapadas.tieneActividadesSolapadas() shouldBe true
        }
        it("Dado un dia de actividades con vacio, este debe devolver que esta vacio"){
            diaDeActividadesVacio.estaVacio() shouldBe true
        }
    }
})