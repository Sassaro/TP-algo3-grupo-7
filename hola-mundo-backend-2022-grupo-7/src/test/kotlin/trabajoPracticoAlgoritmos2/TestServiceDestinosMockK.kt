package trabajoPracticoAlgoritmos2

import servicesMockkeados.mockServiceDeUnDestino
import servicesMockkeados.mockServiceDestinos
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe

class ServiceDestinosMockKSpec:DescribeSpec({

    describe("Test de service destino con un Mock"){
        val repositorioDestinos = Repositorio<Destino>()
        val serviceDeActualizacion = ServiceDeActualizacion(mockServiceDestinos(),creadorObjectMapper(), repositorioDestinos)
        val serviceDeActualizacionDeUnSoloElemento = ServiceDeActualizacion(mockServiceDeUnDestino(),creadorObjectMapper(), repositorioDestinos)
        val destinoArgentina = Destino("Argentina","Buenos Aires",20000.0)
        val destinoItalia = Destino("Italia","Roma",30000.0)

        repositorioDestinos.create(destinoArgentina)           //el repositorio conoce estos dos destinos
        repositorioDestinos.create(destinoItalia)              // se deben cambiar a los nuevos destinos del JSON

        it("si se piden los destinos al servicio externo, el JSONParser debe convertirlos correctamente a su objeto"){

            val destinosObtenidos = serviceDeActualizacion.getDestinos()

            destinosObtenidos[0].id shouldBe 0
            destinosObtenidos[1].id shouldBe 1
            destinosObtenidos[2].id shouldBe -1
        }
        it("si se piden los destinos al servicio externo y se pide que se deleguen al repositorio, los cambios deben ser realizados correctamente"){
            serviceDeActualizacion.delegarARepositorioDeDestino()
            repositorioDestinos.coleccion.size shouldBe 3
            repositorioDestinos.getById(0)?.ciudad shouldBe "Mar del Plata"
            repositorioDestinos.getById(1)?.pais shouldBe "Brazil"
            repositorioDestinos.getById(2)?.pais shouldBe "Indonesia"
        }
        it("si se piden los destinos al servicio externo y este solo devuelve 1 los cambios se deben hacer correctamente"){
            serviceDeActualizacionDeUnSoloElemento.delegarARepositorioDeDestino()
            repositorioDestinos.coleccion.size shouldBe 3
            repositorioDestinos.getById(0)?.ciudad shouldBe "Miami"
        }
    }
})
