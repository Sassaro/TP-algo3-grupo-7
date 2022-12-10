package trabajoPracticoAlgoritmos2

import io.kotest.core.spec.IsolationMode
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import java.time.LocalDate
import java.time.LocalTime

class TestCriterosSpec : DescribeSpec({
    isolationMode = IsolationMode.InstancePerTest
    describe("Pruebo distintos criterios") {
    //    var activo1=Criterio.getActivo()
        var rosario = Destino("Argentina", "Rosario", 12000.0)
        var roma = Destino("Italia", "Roma", 20000.0)
        var paris = Destino("Francia", "Paris", 30000.0)
        var destinoParaValidacion = Destino("Destino de validacion", "Destino de validacio", 48.0)
        var neofilo = Neofilo()
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
        var viajanteLocalista = Usuario(
            "Fede",
            "Munioz",
            "Toto",
            LocalDate.parse("2000-02-12"),
            "Uruguay",
            30,
            destinosDeseados = mutableListOf(destinoParaValidacion),
            criterio = Localista(),
            gustos = neofilo
        )
        var viajanteSoniador = Usuario(
            "Esteban",
            "Suarez",
            "EstSua",
            LocalDate.parse("2015-10-10"),
            "Suecia",
            25,
            destinosDeseados = mutableListOf(destinoParaValidacion),
            criterio = Soniador(),
            gustos = neofilo
        )
        var viajanteActivo = Usuario(
            "Gloria",
            "Godoy",
            "GG2020",
            LocalDate.parse("1995-10-23"),
            "Mejico",
            4,
            destinosDeseados = mutableListOf(destinoParaValidacion),
            criterio = Activo(),
            gustos = neofilo
        )
        var viajanteExigente = Usuario(
            "Ernesto",
            "Hernandez",
            "cacho8",
            LocalDate.parse("1999-09-09"),
            "Peru",
            5,
            destinosDeseados = mutableListOf(destinoParaValidacion),
            criterio = Exigente(Dificultad.ALTA, 30.0),
            gustos = neofilo
        )
        val actividadSenderismo =
            Actividad(100.0, "Senderismo", LocalTime.of(9, 30, 0), LocalTime.of(10, 30, 0), Dificultad.BAJA)
        val actividadNatacion =
            Actividad(500.0, "Nadar", LocalTime.of(11, 30, 0), LocalTime.of(13, 30, 0), Dificultad.BAJA)
        val actividadRafting =
            Actividad(2000.0, "Rafting en el rio", LocalTime.of(17, 30, 0), LocalTime.of(18, 30, 0), Dificultad.MEDIA)
        val actividadEscalar =
            Actividad(1000.0, "Escalar", LocalTime.of(9, 0, 0), LocalTime.of(12, 30, 0), Dificultad.ALTA)
        val actividadPaintBall =
            Actividad(1500.0, "PaintBall", LocalTime.of(13, 30, 0), LocalTime.of(14, 30, 0), Dificultad.BAJA)

        val diaDeActividadVacio = DiaDeActividad(actividades = mutableListOf())
        val diaDeActividadBAJA = DiaDeActividad(actividades = mutableListOf(actividadSenderismo, actividadNatacion))
        val diaDeActividadMEDIO = DiaDeActividad(actividades = mutableListOf(actividadRafting, actividadNatacion))
        val diaDeActividadALTO = DiaDeActividad(actividades = mutableListOf(actividadEscalar, actividadPaintBall))

        val listaDeDiaDeActividades =
            mutableListOf(diaDeActividadVacio, diaDeActividadBAJA, diaDeActividadMEDIO, diaDeActividadALTO)
        val listaDeDiaDeActividades2 =
            mutableListOf(diaDeActividadALTO)
        val listaDeDiaDeActividades3 =
            mutableListOf(diaDeActividadBAJA, diaDeActividadBAJA, diaDeActividadBAJA, diaDeActividadALTO)

        val itinerario = Itinerario(diasDeActividad = listaDeDiaDeActividades, paris, creador = usuarioDeValidacion)
        val itinerario2 = Itinerario(diasDeActividad = listaDeDiaDeActividades, roma, creador = usuarioDeValidacion)
        val itinerarioLocal = Itinerario(diasDeActividad = listaDeDiaDeActividades2, rosario, creador = usuarioDeValidacion)
        val itinerarioConDiaVacio = Itinerario(diasDeActividad = mutableListOf(diaDeActividadVacio,diaDeActividadALTO), roma, creador = usuarioDeValidacion)
        val itinerarioMuyFacil = Itinerario(diasDeActividad = listaDeDiaDeActividades3, rosario, creador = usuarioDeValidacion)

        describe("El viajero tipo ...") {
            it("...Relajado todos los itinerarios le vienen bien") {
                viajanteRelajado.puedeRealizarItinerario(itinerario) shouldBe true
            }
            it("... precavido, acepta cuando amigo conoce el destino") {
                viajanteRelajado.agregarDestinoVisitado(paris)
                viajantePrecavido.agregarAmigos(viajanteRelajado)
                viajantePrecavido.puedeRealizarItinerario(itinerario) shouldBe true
            }
            it("... precavido, acepta si el mismo conoce el destino") {
                viajantePrecavido.agregarDestinoVisitado(roma)
                viajantePrecavido.puedeRealizarItinerario(itinerario2) shouldBe true
            }
            it("... Localista, acepta si es en Argentina") {
                viajanteLocalista.puedeRealizarItinerario(itinerarioLocal) shouldBe true
            }
            it("...Soniador acepta itinerario si esta en su lista de destinos Deseados") {
                viajanteSoniador.agregarDestinoDeseado(roma)
                viajanteSoniador.puedeRealizarItinerario(itinerario2) shouldBe true
            }
            it("...Soniador acepta itinerario si destino mas caro que el mas caro de sus deseados") {
                viajanteSoniador.agregarDestinoDeseado(rosario)
                viajanteSoniador.agregarDestinoDeseado(roma)
                viajanteSoniador.puedeRealizarItinerario(itinerario)
            }
            it("... Activo acepta itinerario si todos los dias estan acupados") {
                viajanteActivo.puedeRealizarItinerario(itinerarioLocal) shouldBe true
            }
            it("... Activo NO acepta itinerario si algun dia esta vacio") {
                viajanteActivo.puedeRealizarItinerario(itinerarioConDiaVacio) shouldBe false
            }
            it(" ... Exigente acepta itinerarios actividad ALTA") {
                itinerarioLocal.porcentajeDificultadDeActividad(Dificultad.ALTA) shouldBe 50
                viajanteExigente.puedeRealizarItinerario(itinerarioLocal) shouldBe true
            }
            it ("... Exigente NO acepta itinerarios actividad BAJA"){
                viajanteExigente.puedeRealizarItinerario(itinerarioMuyFacil) shouldBe false

            }
            it("viajero cambia de criterio"){
                viajanteRelajado.cambiarCriterio(Activo())
                viajanteRelajado.puedeRealizarItinerario(itinerario) shouldBe false

            }
        }
    }
})