package trabajoPracticoAlgoritmos2

import io.kotest.core.spec.IsolationMode
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import io.mockk.verify
import servicesMockkeados.mockkedMailSender
import java.time.LocalDate
import java.time.LocalTime

class TestsTareasSpec:DescribeSpec({

    isolationMode = IsolationMode.InstancePerTest

    val mailService = mockkedMailSender()

    describe("Test relacionados con el funcionamiento de las tareas"){

        val neofilo= Neofilo()
        var destinoParaValidacion = Destino("Destino de validacion", "Destino de validacion", 100.0)
        var destino1 = Destino("Kirguistan ", "Biskek", 10000.0)
        var destino2 = Destino("Rusia", "Republica de Tuva", 10000.0)
        var destino3 = Destino("Argentina", "Mar del Plata", 10000.0)
        var destino4 = Destino("Brazil", "Rio de janeiro", 12000.0)

        val usuarioDeArgentina = Usuario(
            "Jose",
            "Perez",
            "josePerez22",
            LocalDate.parse("2018-10-09"),
            "Argentina",
            10,
            destinosDeseados = mutableListOf(destinoParaValidacion),
            destinosVisitados = mutableListOf(destino1,destino2),
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
            criterio = Relajado(),
            destinosDeseados = mutableListOf(destino1,destino3),
            destinosVisitados = mutableListOf(destino1),
            gustos = neofilo

        )

        val usuario2 = Usuario(
            "Jose",
            "Perez",
            "josePerez22",
            LocalDate.parse("2018-10-09"),
            "Argentina",
            10,
            destinosDeseados = mutableListOf(destino4,destino2),
            destinosVisitados = mutableListOf(),
            criterio = Relajado(),
            gustos = neofilo
        )

        val usuarioSinDestinos = Usuario(
            "Jose",
            "Perez",
            "josePerez22",
            LocalDate.parse("2018-10-09"),
            "Argentina",
            10,
            destinosDeseados = mutableListOf(),
            destinosVisitados = mutableListOf(),
            criterio = Relajado(),
            gustos = neofilo
        )

        val actividadSenderismo =
            Actividad(100.0, "Senderismo", LocalTime.of(9, 30, 0), LocalTime.of(10, 30, 0), Dificultad.BAJA)

        val diaDeActividad = DiaDeActividad(mutableListOf(actividadSenderismo))

        val itinerario = Itinerario(mutableListOf(diaDeActividad), destinoParaValidacion, creador = usuario)
        val itinerario2 = Itinerario(mutableListOf(), destinoParaValidacion, creador = usuarioDeArgentina)

        val repositorioDeUsuarios = Repositorio<Usuario>()
        repositorioDeUsuarios.create(usuario)
        repositorioDeUsuarios.create(usuarioSinDestinos)

        val tareaPuntuar = PuntuarItinerarios(10, mailService,"Puntuar Tareas")
        val tareaTransferirItinerarios = TransferirItinerarios(mailService,"Transferir Itinerarios")
        val tareaAgregarPorDestino = HacerseAmigoPorDestino(destino1,repositorioDeUsuarios,mailService,"Hacerse amigo por destino")
        val tareaAgregarADestinos = AgregarADestinosDeseados(mailService,"Agregar a destinos")

        it("Test del funcionamiento General de las tareas (Enviar un mail) y del funcionamiento de la tarea PuntuarItinerario"){

            usuarioDeArgentina.agregarTarea(tareaPuntuar)
            usuarioDeArgentina.agregarItinerario(itinerario)
            usuarioDeArgentina.ejecutarTareas()

            verify(exactly = 1) {
                mailService.sendMail(
                    Mail(
                        "",
                        "Se realizo la tarea: Puntuar Tareas",
                        "Se realizo la tarea: Puntuar Tareas"
                ))
            }

            itinerario.puntuaciones[0].creador shouldBe usuarioDeArgentina
            itinerario.puntuaciones[0].numero shouldBe 10

        }

        it("Si el usuario tiene itinerarios que no puede puntuar, no se debe realizar la puntuacion"){

            usuarioDeArgentina.agregarTarea(tareaPuntuar)
            usuarioDeArgentina.agregarItinerario(itinerario)
            usuarioDeArgentina.agregarItinerario(itinerario2)
            usuarioDeArgentina.ejecutarTareas()

            itinerario.puntuaciones[0].creador shouldBe usuarioDeArgentina
            itinerario2.puntuaciones.size shouldBe 0

        }

        it("Test de transferirItinerarios, los itinerarios del usuario se deben transferir a su amigo con menos destinos visitados"){

            usuarioDeArgentina.agregarItinerario(itinerario)
            usuarioDeArgentina.agregarItinerario(itinerario2)
            usuarioDeArgentina.agregarTarea(tareaTransferirItinerarios)
            usuarioDeArgentina.agregarAmigos(usuario)
            usuarioDeArgentina.agregarAmigos(usuarioSinDestinos)
            usuarioDeArgentina.ejecutarTareas()

            usuarioSinDestinos.itinerarios.size shouldBe 2
            usuarioSinDestinos.itinerarios.contains(itinerario) shouldBe true
            usuarioSinDestinos.itinerarios.contains(itinerario2) shouldBe true

        }

        it("Test de hacerse amigo por destino, el usuario debe de agregar a todos los usuarios que conocen un destino"){

            usuarioDeArgentina.agregarTarea(tareaAgregarPorDestino)
            usuarioDeArgentina.ejecutarTareas()

            usuarioDeArgentina.amigos.contains(usuario) shouldBe true
            usuarioDeArgentina.amigos.contains(usuarioSinDestinos) shouldBe false

        }

        it("Test de agregar el destino mas caro de cada uno de sus amigos"){

            usuarioDeArgentina.agregarAmigos(usuario)
            usuarioDeArgentina.agregarAmigos(usuario2)
            usuarioDeArgentina.agregarAmigos(usuarioSinDestinos)

            usuarioDeArgentina.agregarTarea(tareaAgregarADestinos)
            usuarioDeArgentina.ejecutarTareas()

            usuarioDeArgentina.destinosDeseados.contains(destino1) shouldBe true
            usuarioDeArgentina.destinosDeseados.contains(destino4) shouldBe true
            usuarioDeArgentina.destinosDeseados.contains(destino2) shouldBe false
            usuarioDeArgentina.destinosDeseados.contains(destino3) shouldBe false

        }
    }
})

