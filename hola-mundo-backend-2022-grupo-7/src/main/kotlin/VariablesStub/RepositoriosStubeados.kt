package VariablesStub

import trabajoPracticoAlgoritmos2.*
import trabajoPracticoAlgoritmos2.Actividad
import java.time.LocalDate
import java.time.LocalTime

val destinoAlemaniaMunich = Destino("Alemania", "Munich", 60000.0)
val destinoArgentinaCordoba = Destino("Argentina", "Cordoba", 50000.0)
val destinoBrazilPetropolis = Destino("Brazil", "Petropolis", 50000.0)
val destinoUruguayMontevideo = Destino("Uruguay", "Montevideo", 50000.0)
val destinoItaliaRoma = Destino("Italia", "Roma", 50000.0)
val destinoNicaraguaManagua = Destino("Nicaragua", "Managua", 50000.0)
val destinoArgentinaBariloche = Destino("Argentina", "Bariloche", 50000.0)


val usuarioJosePerez = Usuario(
    "Jose",
    "Perez",
    "JoPe1989",
    LocalDate.parse("2018-10-09"),
    "Argentina",
    10,
    destinosDeseados = mutableListOf(destinoAlemaniaMunich),
    destinosVisitados = mutableListOf(destinoArgentinaBariloche),
    criterio = Relajado(),
    gustos = Neofilo(),
    contrasenia = "1234567"
)

val usuarioPedroBarreras = Usuario(
    "Pedro",
    "Barreras",
    "PedBarr",
    LocalDate.parse("2019-10-09"),
    "Peru",
    5,
    destinosDeseados = mutableListOf(destinoAlemaniaMunich),
    criterio = Exigente(Dificultad.ALTA,40.0),
    gustos = Combinado(mutableListOf(Neofilo(),SinLimite())),
    amigos = mutableListOf(usuarioJosePerez),
    contrasenia = "HolaMundo"
)

val usuarioPepeArgento = Usuario(
    "Pepe",
    "Argentio",
    "Pepe",
    LocalDate.parse("2010-10-09"),
    "Argentina",
    20,
    destinosDeseados = mutableListOf(destinoAlemaniaMunich,destinoArgentinaBariloche),
    criterio = Exigente(Dificultad.ALTA,40.0),
    gustos = Combinado(mutableListOf(Neofilo(),SinLimite())),
    amigos = mutableListOf(),
    contrasenia = "1234567"
)

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
