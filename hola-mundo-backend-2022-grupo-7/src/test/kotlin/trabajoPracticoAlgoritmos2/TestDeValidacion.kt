package trabajoPracticoAlgoritmos2

import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import java.time.LocalDate
import java.time.LocalTime

class TestDeValidacionSpec : DescribeSpec({
    //destinos usados en los test
    val destino = Destino("Francia", "Paris", 20000.0)
    var destinoParaValidacion = Destino("Destino de validacion", "Destino de validacio", 48.0)

    var neofilo = Neofilo()
    //usuarios usados en los test
    val usuario3 = Usuario(
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
    val usuario2 = usuario3
    var viajanteRelajado = usuario2

    //actividades usadas en la validacion

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

    //diasDeActividades usadas en los test
    val diaDeActividadVacio = DiaDeActividad(actividades = mutableListOf())
    val diaDeActividadBAJA = DiaDeActividad(actividades = mutableListOf(actividadSenderismo, actividadNatacion))
    val diaDeActividadMEDIO = DiaDeActividad(actividades = mutableListOf(actividadRafting, actividadNatacion))
    val diaDeActividadALTO = DiaDeActividad(actividades = mutableListOf(actividadEscalar, actividadPaintBall))
    val diaDeActividadSolapado = DiaDeActividad(
        actividades = mutableListOf(
            actividadRafting,
            actividadSenderismo,
            actividadPaintBall,
            actividadEscalar,
            actividadPaintBall
        )
    )

    val listaDeDiaDeActividades =
        mutableListOf(diaDeActividadVacio, diaDeActividadBAJA, diaDeActividadMEDIO, diaDeActividadALTO)
    val listaDeDiaDeActividadesSolapadas =
        mutableListOf(diaDeActividadSolapado, diaDeActividadBAJA, diaDeActividadMEDIO, diaDeActividadALTO)
    val listaDeDiaDeActividadesVacia = mutableListOf(diaDeActividadVacio, diaDeActividadVacio)

    //Puntuaciones usadas en los test
    val puntuacion = Puntuacion(10, viajanteRelajado)
    val puntuacion2 = Puntuacion(5, viajanteRelajado)
    val puntuacionFueraDeLimite = Puntuacion(12, viajanteRelajado)

    val usuario1 = Usuario(
        "Tomas",
        "Perez",
        "TomPerez",
        LocalDate.parse("2020-10-09"),
        "Argentina",
        10,
        destinosDeseados = mutableListOf(destino),
        criterio = Relajado(),
        gustos = neofilo
        )
    val usuario4 = Usuario(
        "Tomas",
        "Perez",
        "TomPerez",
        LocalDate.parse("2023-10-09"),
        "Argentina",
        10,
        destinosDeseados = mutableListOf(destino),
        criterio = Relajado(),
        gustos = neofilo
    )
    describe("Tests relacionados con la validacion de las clases") {

        describe("test de validacion de destino, con un destino valido") {
            val destinoArg = Destino("Argentina", "Cordoba", 20000.0)
            it("Se crea el parametro pais") {
                destinoArg.pais shouldBe "Argentina"
            }
            it("Se crea el parametro ciudad") {
                destinoArg.ciudad shouldBe "Cordoba"
            }
            it("Se crea el parametro Costo Base") {
                destinoArg.costo shouldBe 20000.0
            }
        }

        describe("test de validacion de destino, con un destino NO valido") {

            it("Se crea destino con Pais en blanco") {
                val destino1 = Destino("", "Lima", 30000.0)
                destino1.validacion() shouldBe false
            }
            it("Se crea destino con Ciudad en blanco") {
                val destino2 = Destino("Peru", "", 30000.0)
                destino2.validacion() shouldBe false
            }
            it("Se crea destino con Costo Base negativo") {
                val destino3 = Destino("Peru", "Lima", -5.0)
                destino3.validacion() shouldBe false
            }
        }

        describe("test de validacion de actividad") {
            it("Dada una actividad valida, el metodo validacion debe devolver true") {
                val actividad = Actividad(
                    1000.0,
                    "Senderismo",
                    LocalTime.of(9, 30),
                    LocalTime.of(10, 30),
                    Dificultad.BAJA
                )
                actividad.validacion() shouldBe true
            }

            it("No es valida debido a que el costo es menor o igual a 0") {
                val actividad = Actividad(
                    -10.0,
                    "Senderismo",
                    LocalTime.of(9, 30),
                    LocalTime.of(10, 30),
                    Dificultad.BAJA
                )
                actividad.validacion() shouldBe false
            }

            it("No es valida debido a que la descripcion es null o vacia") {
                val actividad = Actividad(
                    1000.0,
                    "",
                    LocalTime.of(9, 30),
                    LocalTime.of(10, 30),
                    Dificultad.BAJA
                )
                actividad.validacion() shouldBe false
            }

            it("No es valida debido a que la actividad termina antes de iniciar") {
                val actividad = Actividad(
                    1000.0,
                    "Senderismo",
                    LocalTime.of(10, 30),
                    LocalTime.of(9, 30),
                    Dificultad.BAJA
                )
                actividad.validacion() shouldBe false
            }
        }

        describe("test de validacion de usuarios") {

            it("Dado un usuario valido, el metodo de validacion debe retornar true  ") {
                val usuario = usuario1
                usuario.validacion() shouldBe true
            }

            it("No es valido debido a que la fecha de alta es mayor que la fecha de hoy ") {
               val usuario = usuario4
                usuario.validacion() shouldBe false
            }

            it("No es valido debido a que el nombre es null o vacio") {
                val usuario = Usuario(
                    "",
                    "Perez",
                    "TomPerez",
                    LocalDate.parse("2010-10-09"),
                    "Argentina",
                    10,
                    destinosDeseados = mutableListOf(destino),
                    criterio = Relajado(),
                    gustos = neofilo
                )
                usuario.validacion() shouldBe false
            }

            it("No es valido debido a que el apellido es null o vacio") {
                val usuario = Usuario(
                    "Tomas",
                    "",
                    "TomPerez",
                    LocalDate.parse("2010-10-09"),
                    "Argentina",
                    10,
                    destinosDeseados = mutableListOf(destino),
                    criterio = Relajado(),
                    gustos = neofilo
                )
                usuario.validacion() shouldBe false
            }

            it("No es valido debido a que el username es null o vacio") {
                val usuario = Usuario(
                    "Tomas",
                    "Perez",
                    "",
                    LocalDate.parse("2010-10-09"),
                    "Argentina",
                    10,
                    destinosDeseados = mutableListOf(destino),
                    criterio = Relajado(),
                    gustos = neofilo
                )
                usuario.validacion() shouldBe false
            }

            it("No es valido debido a que el pais de residencia es null o vacio") {
                val usuario = Usuario(
                    "Tomas",
                    "Perez",
                    "TomPerez",
                    LocalDate.parse("2010-10-09"),
                    "",
                    10,
                    destinosDeseados = mutableListOf(destino),
                    criterio = Relajado(),
                    gustos = neofilo
                )
                usuario.validacion() shouldBe false
            }

            it("No es valido debido a que los dias para viajar son 0 o menor que 0") {
                val usuario = Usuario(
                    "Tomas",
                    "Perez",
                    "TomPerez",
                    LocalDate.parse("2010-10-09"),
                    "Argentina",
                    0,
                    destinosDeseados = mutableListOf(destino),
                    criterio = Relajado(),
                    gustos = neofilo
                )
                usuario.validacion() shouldBe false
            }

            it("No es valido debido a que no tiene destinos deseados") {
                val usuario = Usuario(
                    "Tomas",
                    "Perez",
                    "TomPerez",
                    LocalDate.parse("2010-10-09"),
                    "Argentina",
                    10,
                    destinosDeseados = mutableListOf(),
                    criterio = Relajado(),
                    gustos = neofilo
                )
                usuario.validacion() shouldBe false
            }
        }

        describe("test de validacion de itinerarios") {
            it("Dado un itinerario valido, el metodo de validacion debe retornar true ") {

                val itinerario = Itinerario(
                    listaDeDiaDeActividades,
                    destino,
                    mutableListOf(puntuacion),
                    creador = viajanteRelajado
                )
                itinerario.validacion() shouldBe true
            }

            it("No es valido debido a las puntuaciones, tiene creadores repetidos ") {
                    //puntuacion1 y puntuacion2 tiene el mismo creador viajanteRelajado
                    val itinerario = Itinerario(
                        listaDeDiaDeActividades,
                        destino,
                        mutableListOf(puntuacion, puntuacion2),
                        creador = viajanteRelajado
                    )
                itinerario.validacion() shouldBe false
            }
            it("No es valido debido a las puntuaciones, tiene valores no aceptados (menores que 1, mayores que 10) ") {
                    //puntuacion fuera de limite tiene valor 12
                val itinerario = Itinerario(
                        listaDeDiaDeActividades,
                        destino,
                        mutableListOf(puntuacionFueraDeLimite),
                        creador = viajanteRelajado
                    )
                itinerario.validacion() shouldBe false
            }
            it("No es valido debido a que tiene actividades solapadas") {
                val itinerario = Itinerario(listaDeDiaDeActividadesSolapadas, destino, creador = viajanteRelajado)
                itinerario.validacion() shouldBe false
            }
            it("No es valido debido a que no tiene actividades") {
                val itinerario = Itinerario(listaDeDiaDeActividadesVacia, destino, creador = viajanteRelajado)
                itinerario.validacion() shouldBe false
            }
        }
        describe("tests de validacion de los puntajes") {

            it("dado un puntaje valido, el metodo validacion debe retornar true"){
                val puntuacion = Puntuacion(10,viajanteRelajado)
                puntuacion.validacion() shouldBe true
            }
            it("No es valido debido a que el puntaje esta fuera de los puntajes permitidos"){
                val puntuacion = Puntuacion(11,viajanteRelajado)
                val puntuacion2 = Puntuacion(0,viajanteRelajado)
                puntuacion.validacion() shouldBe false
                puntuacion2.validacion() shouldBe  false
            }
        }
    }
})