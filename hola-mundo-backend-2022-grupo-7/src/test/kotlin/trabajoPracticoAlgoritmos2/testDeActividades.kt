package trabajoPracticoAlgoritmos2

import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import java.time.LocalTime

class TestActividadesSpec : DescribeSpec({

    val actividad = Actividad(1000.0, "Senderismo", LocalTime.of(9, 30,0), LocalTime.of(10, 30,0), Dificultad.BAJA)

    describe("tests Relacionados con el funcionamiento de las actividades individuales") {

        it("Al calcular la duracion de una actividad, esta debe dar su duracion correcta en minutos.") {
            //en este caso seria 1 hora (60 min)
            actividad.duracionActividad() shouldBe 60
        }

        it("Dada una actividad que finaliza antes de iniciar, esta debe dar su estado correctamente"){
            actividad.iniciaDespuesDeFinalizar() shouldBe false
            //solo se testea el caso falso ya que en caso de que la actividad finalize antes de iniciar, se generaria una excepcion.
        }

    }
})