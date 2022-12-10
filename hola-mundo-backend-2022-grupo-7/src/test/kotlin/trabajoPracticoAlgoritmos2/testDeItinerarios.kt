package trabajoPracticoAlgoritmos2

import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import java.time.LocalDate
import java.time.LocalTime

class TestDeItinerariosSpec : DescribeSpec({

    describe("test relacionados con el funcionamiento de los itinerarios") {
        //destinos usados en los test
        val destino = Destino("Francia", "Paris", 20000.0)
        var destinoParaValidacion = Destino("Destino de validacion", "Destino de validacio", 48.0)
        var neofilo = Neofilo()
        //usuarios usados en los test
        var usuarioDeValidacion = Usuario(
            "usuarioDeValidacion",
            "usuarioDeValidacion",
            "usuarioDeValidacion",
            LocalDate.parse("2000-10-10"),
            "Argentina",
            15,
            destinosDeseados = mutableListOf(destinoParaValidacion),
            criterio = Relajado(),
            gustos = neofilo
        )
        var viajanteRelajado = Usuario(
            "Juan",
            "Perez",
            "Juancho7",
            LocalDate.parse("2000-10-10"),
            "Argentina",
            15,
            destinosDeseados = mutableListOf(destinoParaValidacion),
            criterio = Relajado(),
            gustos = neofilo
        )
        var viajantePrecavido = Usuario(
            "Pedro",
            "Garcia",
            "Pepo33",
            LocalDate.parse("2010-03-04"),
            "Uruguay",
            50,
            destinosDeseados = mutableListOf(destinoParaValidacion),
            criterio = Precavido(),
            gustos = neofilo
        )

        //actividades usadas en los test
        val actividadSenderismo =
            Actividad(100.0, "Senderismo", LocalTime.of(9, 30, 0), LocalTime.of(10, 30, 0), Dificultad.BAJA)
        val actividadNatacion =
            Actividad(500.0, "Nadar", LocalTime.of(11, 30, 0), LocalTime.of(13, 30, 0), Dificultad.BAJA)
        val actividadRafting =
            Actividad(2000.0, "Rafting en el rio", LocalTime.of(17, 30, 0), LocalTime.of(18, 30, 0), Dificultad.MEDIA)
        val actividadEscalar1 =
            Actividad(1000.0, "Escalar", LocalTime.of(9, 0, 0), LocalTime.of(12, 30, 0), Dificultad.ALTA)
        val actividadEscalar2 =
            Actividad(1000.0, "Escalar", LocalTime.of(9, 0, 0), LocalTime.of(12, 30, 0), Dificultad.ALTA)
        val actividadEscalar3 =
            Actividad(1000.0, "Escalar", LocalTime.of(12, 31, 0), LocalTime.of(13, 30, 0), Dificultad.ALTA)
        val actividadEscalar4 =
            Actividad(1000.0, "Escalar una montania", LocalTime.of(15, 0, 0), LocalTime.of(18, 30, 0), Dificultad.ALTA)
        val actividadPaintBall =
            Actividad(1500.0, "PaintBall", LocalTime.of(13, 30, 0), LocalTime.of(14, 30, 0), Dificultad.BAJA)

        //diasDeActividades usadas en los test
        val diaDeActividadVacio = DiaDeActividad(actividades = mutableListOf())
        val diaDeActividadBAJA = DiaDeActividad(actividades = mutableListOf(actividadSenderismo, actividadNatacion))
        val diaDeActividadMEDIO = DiaDeActividad(actividades = mutableListOf(actividadRafting, actividadNatacion))
        val diaDeActividadALTO = DiaDeActividad(actividades = mutableListOf(actividadEscalar1, actividadPaintBall))

        val listaDeDiaDeActividades =
            mutableListOf(diaDeActividadVacio, diaDeActividadBAJA, diaDeActividadMEDIO, diaDeActividadALTO)
        val listaDeDiaDeActividadesMEDIA = mutableListOf(diaDeActividadMEDIO)

        //Puntuaciones usadas en los test
        val puntuacion1 = Puntuacion(5, usuarioDeValidacion)
        val puntuacion2 = Puntuacion(10, viajanteRelajado)
        val puntuacion3 = Puntuacion(1, viajantePrecavido)

        val listaDePuntuaciones = mutableListOf(puntuacion1, puntuacion2, puntuacion3)

        //Itinerarios usados en los test
        val itinerario =
            Itinerario(listaDeDiaDeActividades, destino, listaDePuntuaciones, creador = usuarioDeValidacion)
        val itinerario2 =
            Itinerario(listaDeDiaDeActividadesMEDIA, destino, creador = usuarioDeValidacion)
        val itinerario70PorcBAJA = Itinerario(
            mutableListOf(
                diaDeActividadBAJA,
                diaDeActividadBAJA,
                diaDeActividadALTO,
                diaDeActividadALTO,
                diaDeActividadALTO
            ), destinoParaValidacion, creador = usuarioDeValidacion
        )


        it("Si se pide calcular el numero de dias del itinerario, este debe devolver el valor correcto") {
            itinerario.cantidadDeDias() shouldBe 4
        }

        it("Si se pide calcular las actividades de un itinerario, este debe devolver una lista con las actividades correctas") {
            //la cantidad de actividades debe ser 6 (ver declaracion de dias de actividad)
            itinerario.actividadesEnElItinerario().size shouldBe 6

            itinerario.actividadesEnElItinerario() shouldBe listOf(
                actividadSenderismo,
                actividadNatacion,
                actividadRafting,
                actividadNatacion,
                actividadEscalar1,
                actividadPaintBall
            )
            //como es una lista, es importante el orden de las actividades.
            itinerario.actividadesEnElItinerario() shouldNotBe listOf(
                actividadPaintBall,
                actividadNatacion,
                actividadSenderismo,
                actividadNatacion,
                actividadEscalar1,
                actividadPaintBall
            )
        }

        it("Si se pide calcular la cantidad de minutos promedio de actividades por dia, entonces deberia dar el valor adecuado") {
            //el promedio de minutos por dia de actividades del itinerario deberia ser
            // (60 (act1) + 120 (act2) + 60 (act3) + 120 (act4) + 210 (act5) + 60 (act6))/4 = 157.7

            itinerario.duracionPromedioPorDia() shouldBe 157.5
        }

        it("Si se pide calcular el costo de todos los dias entonces debe devolver el valor correcto") {
            //el costo seria 100 + 500 + 2000 + 500 + 1000 + 1500

            itinerario.costoDelItinerario() shouldBe 5600
        }

        it("Si se pide calcular la dificultad del itinerario, el metodo debe devolver el valor correcto") {
            //el itinerario posee 4 actividades de dificultad baja, por lo tanto deberia ser de dificultad baja
            itinerario.dificultad() shouldBe Dificultad.BAJA
            //el itinerario2 posee una actividad media y una baja por lo tanto debe ser de difultad media.
            itinerario2.dificultad() shouldBe Dificultad.MEDIA
        }

        it("Si se pide agregar una actividad a unos de los dias del itinerario, este cambio se debe hacer correctamente") {

            itinerario.agregarActividadAItinerario(0, actividadEscalar2)
            itinerario.agregarActividadAItinerario(0, actividadEscalar3)
            itinerario.agregarActividadAItinerario(0, actividadEscalar4)
            //debido a que se agrego la actividad al dia 0 la lista de actividades deberia ser
            itinerario.actividadesEnElItinerario() shouldBe listOf(
                actividadEscalar2,
                actividadEscalar3,
                actividadEscalar4,
                actividadSenderismo,
                actividadNatacion,
                actividadRafting,
                actividadNatacion,
                actividadEscalar1,
                actividadPaintBall
            )
            //tambien se debe cambiar la dificultad del itinerario si se cambian las actividades
            itinerario.dificultad() shouldBe Dificultad.ALTA
        }
        it("dado un itinerario sin puntaciones repetidas el metodo debe devolver el valor correcto") {
            itinerario.tienePuntuacionesRepetidas() shouldBe false
            //solo se testea el caso falso ya que en caso de que el itinerario no cumpla con esto, se generaria una excepcion.
        }
        it("dado un itinerario sin puntuaciones no validas (menor que 1, mayor que 10), el metodo debe devolver el valor correcto") {
            itinerario.tienePuntuacionesNoValidas() shouldBe false
            //solo se testea el caso falso ya que en caso de que el itinerario no cumpla con esto, se generaria una excepcion.
        }
        it("dado un itinerario con actividades de distintas dificultades, el itinerario debe devolver el % de la dificultad pedida") {

            itinerario70PorcBAJA.porcentajeDificultadDeActividad(Dificultad.BAJA) shouldBe 70.0
            itinerario70PorcBAJA.porcentajeDificultadDeActividad(Dificultad.MEDIA) shouldBe 0.0
            itinerario70PorcBAJA.porcentajeDificultadDeActividad(Dificultad.ALTA) shouldBe 30.0

        }
        it("dado un usuario creador del itinerario, este lo puede modificar"){
            itinerario.puedeModificarItinerario(usuarioDeValidacion) shouldBe true
        }
        it("si el usuario tiene de amigo al creador del itinerario entonces este lo puede modificar"){
            itinerario.puedeModificarItinerario(viajanteRelajado) shouldBe false
            viajanteRelajado.agregarAmigos(usuarioDeValidacion)
            itinerario.puedeModificarItinerario(viajanteRelajado) shouldBe true
        }

        describe("test relacionados con el funcionamiento de la busqueda del elemento"){

            it("Busqueda por su destino"){
                itinerario.busquedaPorDestino("fran") shouldBe true      //el itinerario tiene de destino francia paris
                itinerario.busquedaPorDestino("par") shouldBe true
            }

            it("Busqueda por sus actividades"){
                itinerario.busquedaPorDescripcionDeActividades("escalar") shouldBe true
                itinerario.busquedaPorDescripcionDeActividades("nadar") shouldBe true
                itinerario.busquedaPorDescripcionDeActividades("Send") shouldBe true

            }

            it("Busqueda por texto no valido que devuelve false"){
                itinerario.busquedaPorDestino("buenos aires") shouldBe false
                itinerario.busquedaPorDestino("arg") shouldBe false
                itinerario.busquedaPorDescripcionDeActividades("Skiar") shouldBe false
            }
        }
    }
})