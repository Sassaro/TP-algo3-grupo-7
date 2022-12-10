package trabajoPracticoAlgoritmos2

import io.kotest.assertions.throwables.shouldThrow
import io.kotest.core.spec.IsolationMode
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.collections.shouldContain
import io.kotest.matchers.shouldBe
import io.mockk.verify
import servicesMockkeados.mockkedMailSender
import java.time.LocalDate
import java.time.LocalTime
import io.kotest.matchers.types.shouldBeInstanceOf

class TestViajesSpec : DescribeSpec({

    isolationMode = IsolationMode.InstancePerTest

    describe("Test relacionados con el funcionamiento de los viajes y sus observers") {

        val mailSender = mockkedMailSender()
        var destino = Destino("Argentina", "Buenos Aires", 10000.0)
        var destinoNoLocal = Destino("Brazil", "Rio de Janeiro", 20000.0)
        val observerAvisarDestino = ObserverAvisarDestino(mailSender)
        val observerLocalista = ObserverLocalista(mailSender)
        val observerAgregarItinerario = ObserverAgregarItinerario()
        val observerVehiculoConvenio = ObserverVehiculoConvenio("Fiat")

        val usuario = Usuario(
            "Pepe",
            "Barreras",
            "pepBarrera",
            LocalDate.parse("2001-10-09"),
            "Argentina",
            10,
            criterio = Relajado(),
            gustos = Supersticioso()
        )

        val amigo = Usuario(
            "Jose",
            "Martin",
            "JoseMartin",
            LocalDate.parse("2001-10-07"),
            "Argentina",
            0,
            criterio = Relajado(),
            gustos = Supersticioso()
        )

        val actividadSenderismo =
            Actividad(100.0, "Senderismo", LocalTime.of(9, 30, 0), LocalTime.of(10, 30, 0), Dificultad.BAJA)
        val diaDeActividad = DiaDeActividad(mutableListOf(actividadSenderismo))
        val itinerario = Itinerario(mutableListOf(diaDeActividad), destino, creador = usuario)
        val itinerarioNoLocal = Itinerario(mutableListOf(),destinoNoLocal, creador = usuario)
        var motoBajaCilindrada = Motos(250, "Bmw", "300", LocalDate.parse("2019-01-01"), 900.0)

        val viaje = Viaje(itinerario, motoBajaCilindrada,usuario,1)
        val viajeAmigo = Viaje(itinerario, motoBajaCilindrada,amigo)
        val viajeNoLocal = Viaje(itinerarioNoLocal,motoBajaCilindrada,usuario)

        it("Test de calculo de costo del viaje"){

            viaje.calcularCosto() shouldBe 9500         //10000.0 - 1500(15%,descuento por antiguedad)
                                                        //+ 900*1(costo base) + 0(es de baja cilindrada) - 0(no tiene convenio) + 100(actividad)
        }

        it("Si un usuario quiere realizar un viaje, el usuario debe poder hacer el itinerario del viaje") {

            viaje.realizarViaje()
            usuario.destinosVisitados.contains(itinerario.destino) shouldBe true

        }

        it("Si un usuario quiere realizar un viaje, pero no puede realizar el itinerario, debe tirar excepcion") {

            shouldThrow<RuntimeException> { viajeAmigo.realizarViaje() }

        }

        it("Si un usuario realiza un viaje, con un observer de avisar destino, el mail se debe enviar correctamente"){

            viaje.agregarObserver(observerAvisarDestino)
            usuario.agregarAmigos(amigo)
            amigo.agregarDestinoDeseado(destino)
            viaje.realizarViaje()

            verify(exactly = 1) {

                mailSender.sendMail(
                    Mail(
                        "app@holamundo.com",
                        "Visitaron un destino que te puede interesar",
                        "Hola! JoseMartin, Pepe Barreras visito Argentina Buenos Aires"
                    )
                )
            }
        }

        it("Si un usuario realiza un viaje, con un observer de Localista, y el detino es local el criterio del usuario debe cambiarse correctamente"){

            viaje.agregarObserver(observerLocalista)
            viaje.realizarViaje()

            usuario.criterio.shouldBeInstanceOf<Relajado>()

        }

        it("Si un usuario realiza un viaje, con un observer de Localista, y el detino no es local el criterio del usuario debe cambiarse correctamente"){

            viajeNoLocal.agregarObserver(observerLocalista)
            viajeNoLocal.realizarViaje()

            usuario.criterio.shouldBeInstanceOf<Localista>()

        }
        it("Usuario realiza viaje y tiene observer de itinerario"){
            viaje.agregarObserver(observerAgregarItinerario)
            viaje.realizarViaje()

            usuario.itinerarios shouldContain viaje.itinerario
        }
        it("Usuario realiza viaje y tiene ovserver de Convenio de Vehiculo"){
            viaje.agregarObserver(observerVehiculoConvenio)
            viaje.realizarViaje()

            usuario.gustos.shouldBeInstanceOf<Selectivo>()
        }
    }
})