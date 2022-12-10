package trabajoPracticoAlgoritmos2

import io.kotest.assertions.throwables.shouldThrow
import io.kotest.core.spec.IsolationMode
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import java.time.LocalDate
import java.time.LocalTime

class TestDeUsuarioSpec : DescribeSpec({
    isolationMode = IsolationMode.InstancePerTest

    var destinoParaValidacion = Destino("Destino de validacion", "Destino de validacion", 100.0)
    val destinoNoLocal = Destino("Italia", "Roma", 30000.0)
    val destinoLocal = Destino("argentina", "Buenos Aires", 2000.0)
    val destinoNoConocido = Destino("Uruguay", "Montevideo", 20000.0)

    val neofilo = Neofilo()
    val supersticioso = Supersticioso()
    val usuarioDeArgentina = Usuario(
        "Jose",
        "Perez",
        "josePerez22",
        LocalDate.parse("2018-10-09"),
        "Argentina",
        10,
        destinosDeseados = mutableListOf(destinoParaValidacion, destinoNoConocido),
        criterio = Relajado(),
        gustos = neofilo
    )

    val usuario = Usuario(
        "Pepe",
        "Barreras",
        "pepBarrera",
        LocalDate.parse("2001-10-09"),
        "Argentina",
        10,
        destinosDeseados = mutableListOf(destinoParaValidacion),
        criterio = Relajado(),
        gustos = supersticioso

    )

    val actividadSenderismo =
        Actividad(100.0, "Senderismo", LocalTime.of(9, 30, 0), LocalTime.of(10, 30, 0), Dificultad.BAJA)
    val actividadNatacion =
        Actividad(500.0, "Nadar", LocalTime.of(11, 30, 0), LocalTime.of(13, 30, 0), Dificultad.BAJA)

    val diaDeActividad = DiaDeActividad(mutableListOf(actividadSenderismo))

    val itinerario = Itinerario(mutableListOf(diaDeActividad), destinoParaValidacion, creador = usuario)
    val itinerarioNoConocido =
        Itinerario(mutableListOf(diaDeActividad, diaDeActividad), destinoNoConocido, creador = usuarioDeArgentina)

    describe("Test relacionado con los metodos y variables de un Usuario") {

        it("Prueba de calculo de antiguedad deberia dar los años de antiguedad correctos") {
            usuarioDeArgentina.calcularAntiguedad() shouldBe 4
        }
        it("Prueba de calculo de costo de un destino no local") {
            usuario.calcularCostoDeViaje(destinoNoLocal) shouldBe 30000 + 6000      //30000 del costo base + 6000 del 20% por ser no local
        }
        it("Prueba de calculo de costo de un destino LOCAL") {
            usuario.calcularCostoDeViaje(destinoLocal) shouldBe 2000 - (2000 * 0.15) //2000 del costo base - 15% por la antiguedad ya que el usuario es del mismo pais que el destino
        }

        it("Si el usuario agrega un itinerario a su lista de itinerarios, este deberia agregarse") {
            usuario.agregarItinerario(itinerario)

            usuario.itinerarios shouldBe mutableListOf(itinerario)
            usuario.itinerarios.size shouldBe 1

        }
        it("si el usuario agrega un destino deseado a si lista de destinos deseados el cambio se deberia realizar") {
            usuario.agregarDestinoDeseado(destinoLocal)
            usuario.destinosDeseados shouldBe mutableListOf(destinoParaValidacion, destinoLocal)

        }
        it("si el usuario agrega un destino visitado a si lista de destinos visitados el cambio se deberia realizar") {
            usuario.agregarDestinoVisitado(destinoNoLocal)
            usuario.destinosVisitados shouldBe mutableListOf(destinoNoLocal)

        }
        it("si el usuario tiene el destino en la lista de destinos visitados o destinos deseados, el usuario conoce el destino") {
            usuario.agregarDestinoVisitado(destinoNoLocal)
            usuario.agregarDestinoDeseado(destinoLocal)

            usuario.conoceDestino(destinoLocal) shouldBe true
            usuario.conoceDestino(destinoNoLocal) shouldBe true
            usuario.conoceDestino(destinoNoConocido) shouldBe false
        }
        it("si el usuario agrega amigos a su lista de amigos, el cambio deberia de hacerse") {
            usuario.agregarAmigos(usuarioDeArgentina)

            usuario.tieneAmigos() shouldBe true
            usuario.amigos shouldBe mutableListOf(usuarioDeArgentina)

        }
        it("si el usuario tiene un amigo que conoce un destino, el metodo amigosConocenDestino deberia devolver el valor correspondiente") {
            usuario.agregarAmigos(usuarioDeArgentina)
            usuario.amigosConocenDestino(destinoNoConocido) shouldBe true
        }
        it("Dado un itinerario, si un usuario no es creador del mismo o no lo puntuo, este usuario puede puntuar el itinerario") {
            usuarioDeArgentina.puntuarItinerario(itinerario, 6)
        }
        it("Si el usuario ya puntuo el itinerario, no deberia de poder puntuarlo") {
            usuarioDeArgentina.puntuarItinerario(itinerario, 6)
            shouldThrow<RuntimeException> {
                usuarioDeArgentina.puntuarItinerario(itinerario, 8)
            }
        }
        it("si el usuario es creador de itinerario, no lo puede puntuar") {
            shouldThrow<RuntimeException> {
                usuario.puntuarItinerario(itinerario, 10)
            }
        }
        it("si el usuario no conoce el destino del itinerario, no lo puede puntuar") {
            shouldThrow<RuntimeException> {
                usuario.puntuarItinerario(itinerarioNoConocido, 4)
            }
        }
        it("si el usuario agrega una actividad al itinerario, este cambio se debe realizar") {
            usuario.agregarActividadAlItinerario(itinerario, 0, actividadNatacion)
            itinerario.actividadesEnElItinerario() shouldBe listOf(actividadSenderismo, actividadNatacion)
        }
        it("si el usuario agrega un dia de actividad al itinerario, esta cambio se debe realizar") {
            usuario.agregarDiaAlItinerario(itinerario, diaDeActividad)
            itinerario.diasDeActividad shouldBe mutableListOf(diaDeActividad, diaDeActividad)
            itinerario.actividadesEnElItinerario() shouldBe mutableListOf(actividadSenderismo, actividadSenderismo)
        }
        it("si el usuario agrega una actividad que solapa con otra, deberia tirar excepcion") {
            shouldThrow<RuntimeException> {
                usuario.agregarActividadAlItinerario(itinerario, 0, actividadSenderismo)
            }
        }
        it("si el usuario quita una actividad del itinerario, el cambio se debe realizar") {
            usuario.quitarActividadDelItinerario(itinerario, 0, actividadSenderismo)
            itinerario.actividadesEnElItinerario() shouldBe mutableListOf()
        }
        describe("test relacionados con el funcionamiento de la busqueda") {

            it("busqueda por nombre debe ser parecido a el texto mandado") {          //el nombre de usuario es pepe, el apellido barreras y el username pepBarreras
                usuario.busquedaPorNombre("pep") shouldBe true
                usuario.busquedaPorNombre("pe") shouldBe true
                usuario.busquedaPorNombre("barrera") shouldBe false
            }
            it("busqueda por apellido debe ser parecido a el texto mandado") {
                usuario.busquedaPorApellido("barr") shouldBe true
                usuario.busquedaPorApellido("ba") shouldBe true
                usuario.busquedaPorApellido("pepe") shouldBe false
            }
            it("busqueda por username el username debe ser exactamente igual al texto mandado") {
                usuario.busquedaPorUsername("pepBarrera") shouldBe true
                usuario.busquedaPorUsername("pepBarrer") shouldBe false
            }
        }
    }
})