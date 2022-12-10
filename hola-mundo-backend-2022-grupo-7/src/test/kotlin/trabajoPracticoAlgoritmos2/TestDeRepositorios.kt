package trabajoPracticoAlgoritmos2

import io.kotest.assertions.throwables.shouldThrow
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import java.time.LocalDate
import java.time.LocalTime

class TestDeRepositoriosSpec : DescribeSpec({

    describe("Test relacionados con el funcionamiento de los repositorios") {

        val repositorioDeDestinos = Repositorio<Destino>()
        val destinoLocal = Destino("Argentina", "Cordoba", 50000.0)
        val destinoExtranjero = Destino("Francia", "Paris", 80000.0)

        val neofilo = Neofilo()
        it("si el repositorio agrega un elemento a si mismo, este elemento debe ser agregado con su id correspondiente") {

            repositorioDeDestinos.create(destinoExtranjero)
            repositorioDeDestinos.create(destinoLocal)

            repositorioDeDestinos.coleccion shouldBe mutableListOf(destinoExtranjero, destinoLocal)
            repositorioDeDestinos.coleccion.size shouldBe 2
            repositorioDeDestinos.siguienteId shouldBe 2
            destinoExtranjero.id shouldBe 0
            destinoLocal.id shouldBe 1

        }

        it("si el repositorio elimina un elemento de su lista, este elemento debe ser eliminado") {
            repositorioDeDestinos.delete(destinoLocal)
            repositorioDeDestinos.coleccion shouldBe mutableListOf(destinoExtranjero)
            repositorioDeDestinos.coleccion.size shouldBe 1
        }

        it("si el repositorio busca un elemento por su ID el repositorio debe devolver el objeto buscado") {
            repositorioDeDestinos.create(destinoLocal)
            repositorioDeDestinos.getById(2) shouldBe destinoLocal    //destino local tiene id 2 por haber sido borrado y creado devuelta
            repositorioDeDestinos.getById(0) shouldBe destinoExtranjero
        }

        it("si el repositorio actualiza un elemento este elemento debe ser actualizado correctamente") {


            val destinoLocalModificado =
                Destino("argentina", "cordoba", 55000.0, destinoLocal.id)     //le paso el valor de id de destino local
            //para simular que es el mismo destino local pero modificado
            repositorioDeDestinos.update(destinoLocalModificado)
            repositorioDeDestinos.coleccion shouldBe listOf(destinoExtranjero, destinoLocalModificado)
            destinoLocalModificado.id shouldBe destinoLocal.id

        }

        it("si el repositorio no encuentra un elemento, debe devolver una excepcion") {
            val destinoModificado = Destino("argentina", "cordoba", 55000.0, 10)
            shouldThrow<RuntimeException> { repositorioDeDestinos.update(destinoModificado) }
        }

        describe("test relacionados con la busqueda por texto") {

            val repositorioDeDestinos2 = Repositorio<Destino>()
            val repositorioDeItinerario = Repositorio<Itinerario>()
            val repositorioDeUsuarios = Repositorio<Usuario>()
            val repositorioDeVehiculos = Repositorio<Vehiculo>()

            val destinoItaliaVeneto = Destino("Italia", "Veneto", 20000.0)
            val destinoItaliaVenecia = Destino("Italia", "Venecia", 80000.0)
            val destinoArgentinaCordoba = Destino("Argentina", "Cordoba", 50000.0)
            val destinoAlemaniaMunich = Destino("Alemania", "Munich", 60000.0)
            repositorioDeDestinos2.create(destinoItaliaVeneto)
            repositorioDeDestinos2.create(destinoItaliaVenecia)
            repositorioDeDestinos2.create(destinoArgentinaCordoba)
            repositorioDeDestinos2.create(destinoAlemaniaMunich)

            it("Busqueda de un repositorio de destinos") {
                repositorioDeDestinos2.search("ItalIa") shouldBe listOf(destinoItaliaVeneto, destinoItaliaVenecia)
                repositorioDeDestinos2.search("ItA") shouldBe listOf(destinoItaliaVeneto, destinoItaliaVenecia)
                repositorioDeDestinos2.search("It") shouldBe listOf(destinoItaliaVeneto, destinoItaliaVenecia)
                repositorioDeDestinos2.search("arge") shouldBe listOf(destinoArgentinaCordoba)
                repositorioDeDestinos2.search("a") shouldBe listOf(
                    destinoItaliaVeneto,
                    destinoItaliaVenecia,
                    destinoArgentinaCordoba,
                    destinoAlemaniaMunich
                )
            }

            val usuarioJosePerez = Usuario(
                "Jose",
                "Perez",
                "JoPe1989",
                LocalDate.parse("2018-10-09"),
                "Argentina",
                10,
                destinosDeseados = mutableListOf(destinoAlemaniaMunich),
                criterio = Relajado(),
                gustos = neofilo
            )

            val usuarioPepeBarreras = Usuario(
                "Pepe",
                "Barreras",
                "Martiniano",
                LocalDate.parse("2001-10-09"),
                "Argentina",
                10,
                destinosDeseados = mutableListOf(destinoArgentinaCordoba),
                criterio = Relajado(),
                gustos = neofilo
            )

            repositorioDeUsuarios.create(usuarioJosePerez)
            repositorioDeUsuarios.create(usuarioPepeBarreras)

            it("Busqueda de un repositorio de usuarios") {
                repositorioDeUsuarios.search("jo") shouldBe listOf(usuarioJosePerez)
                repositorioDeUsuarios.search("joPe1989") shouldBe listOf(usuarioJosePerez)
                repositorioDeUsuarios.search("martiniano") shouldBe listOf(usuarioPepeBarreras)
            }

            val actividadSenderismo =
                Actividad(100.0, "Senderismo", LocalTime.of(9, 30, 0), LocalTime.of(10, 30, 0), Dificultad.BAJA)
            val actividadNatacion =
                Actividad(500.0, "Nadar", LocalTime.of(11, 30, 0), LocalTime.of(13, 30, 0), Dificultad.BAJA)
            val actividadRafting =
                Actividad(
                    2000.0,
                    "Rafting en el rio",
                    LocalTime.of(17, 30, 0),
                    LocalTime.of(18, 30, 0),
                    Dificultad.MEDIA
                )
            val actividadEscalar1 =
                Actividad(1000.0, "Escalar", LocalTime.of(9, 0, 0), LocalTime.of(12, 30, 0), Dificultad.ALTA)
            val actividadPaintBall =
                Actividad(1500.0, "PaintBall", LocalTime.of(13, 30, 0), LocalTime.of(14, 30, 0), Dificultad.BAJA)

            val diaDeActividadVacio = DiaDeActividad(actividades = mutableListOf())
            val diaDeActividadBAJA = DiaDeActividad(actividades = mutableListOf(actividadSenderismo, actividadNatacion))
            val diaDeActividadMEDIO = DiaDeActividad(actividades = mutableListOf(actividadRafting, actividadNatacion))
            val diaDeActividadALTO = DiaDeActividad(actividades = mutableListOf(actividadEscalar1, actividadPaintBall))

            val listaDeDiaDeActividades =
                mutableListOf(diaDeActividadVacio, diaDeActividadBAJA, diaDeActividadMEDIO, diaDeActividadALTO)
            val listaDeDiaDeActividadesMEDIA = mutableListOf(diaDeActividadMEDIO)

            val itinerario =
                Itinerario(listaDeDiaDeActividades, destinoAlemaniaMunich, creador = usuarioJosePerez)
            val itinerario2 =
                Itinerario(listaDeDiaDeActividadesMEDIA, destinoArgentinaCordoba, creador = usuarioJosePerez)

            repositorioDeItinerario.create(itinerario)
            repositorioDeItinerario.create(itinerario2)

            it("Busqueda de un repositorio de Itinerarios") {
                repositorioDeItinerario.search("Raft") shouldBe listOf(itinerario, itinerario2)
                repositorioDeItinerario.search("nadar") shouldBe listOf(itinerario, itinerario2)
                repositorioDeItinerario.search("escal") shouldBe listOf(itinerario)
                repositorioDeItinerario.search("Skiar") shouldBe listOf()
            }

            var moto1 = Motos(100, "Bmw", "300", LocalDate.parse("2019-01-01"), 900.0, 5)
            var moto2 = Motos(500, "Honda", "Honda", LocalDate.parse("2019-01-01"), 1000.0, 10)
            var auto = Autos(true, "Fiat", "Tipo", LocalDate.parse("2005-01-01"), 3000.0, 15)

            repositorioDeVehiculos.create(moto1)
            repositorioDeVehiculos.create(moto2)
            repositorioDeVehiculos.create(auto)

            it("Busqueda de un repositorio de vehiculos") {
                repositorioDeVehiculos.search("bmw") shouldBe listOf(moto1)
                repositorioDeVehiculos.search("hond") shouldBe listOf(moto2)
                repositorioDeVehiculos.search("nda") shouldBe listOf()
                repositorioDeVehiculos.search("fiAt") shouldBe listOf(auto)
            }
        }
    }
})
