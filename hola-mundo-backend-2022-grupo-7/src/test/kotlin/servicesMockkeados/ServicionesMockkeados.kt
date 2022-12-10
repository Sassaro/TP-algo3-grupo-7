package servicesMockkeados

import io.mockk.every
import io.mockk.mockk
import trabajoPracticoAlgoritmos2.MailSender
import trabajoPracticoAlgoritmos2.ServiceDestinos

fun mockServiceDestinos(): ServiceDestinos {

    val mockDeServiceDestinos = mockk<ServiceDestinos>(relaxUnitFun = true)
    every { mockDeServiceDestinos.getDestinos() } returns JSON          //siempre que se pida getDestinos, este va a devolver el json definido abajo

    return mockDeServiceDestinos
}

fun mockServiceDeUnDestino(): ServiceDestinos {

    val mockDeServiceDestinos = mockk<ServiceDestinos>(relaxUnitFun = true)
    every { mockDeServiceDestinos.getDestinos() } returns JSONDeUnDestino          //siempre que se pida getDestinos, este va a devolver el json definido abajo

    return mockDeServiceDestinos
}

fun mockkedMailSender(): MailSender {

    val mailSender = mockk<MailSender>(relaxUnitFun = true)
    return mailSender

}

val JSON = """[{"id":0,"pais":"Argentina","ciudad":"Mar del Plata","costo":10000.0},
         |{"id":1,"pais":"Brazil","ciudad":"Rio de Janeiro","costo":20000.0},
         |{"pais":"Indonesia","ciudad":"Bali","costo":30000.0}]""".trimMargin()

val JSONDeUnDestino = """[{"id":0,"pais":"Estado Unidos","ciudad":"Miami","costo":40000.0}]"""

