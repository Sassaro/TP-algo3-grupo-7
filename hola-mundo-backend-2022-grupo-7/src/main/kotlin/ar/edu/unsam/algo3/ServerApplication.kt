package ar.edu.unsam.algo3

import VariablesStub.*
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import trabajoPracticoAlgoritmos2.*
import java.time.LocalDate

@SpringBootApplication
class ServerApplication {

    @Bean
    fun itineraryRepositoryInitializer():Repositorio<Itinerario>{

        val aux = Repositorio<Itinerario>()
        aux.create(itinerario)
        aux.create(itinerario2)
        return aux
    }

    @Bean
    fun vehicleRepositoryInitializer():Repositorio<Vehiculo>{

        val aux = Repositorio<Vehiculo>()

        val vehicle1 = Autos(false, "Honda", "Civic", LocalDate.of(2001, 1, 1), 1500.0, 1)
        vehicle1.kilometrajeLibre = false
        val vehicle2 = Autos(false, "Fiat", "Uno", LocalDate.of(2011, 1, 1), 2000.0, 2)
        vehicle2.hatchback = true
        val vehicle3 = Camionetas(false, "Renault", "Duster", LocalDate.of(2001, 1, 1), 2500.0, 3)
        vehicle3.kilometrajeLibre = false
        vehicle3.tieneConvenio = true
        val vehicle4 = Camionetas(false, "Fiat", "Suran", LocalDate.of(2011, 1, 1), 3000.0, 4)
        vehicle4.cuatroXCuatro = true
        val vehicle5 = Motos(500, "Honda", "H-250", LocalDate.of(2001, 1, 1), 400.0, 5)
        vehicle5.tieneConvenio = true
        val vehicle6 = Motos(600, "Kawasaki", "Ninja", LocalDate.of(2011, 1, 1), 600.0, 6)

        aux.create(vehicle1)
        aux.create(vehicle2)
        aux.create(vehicle3)
        aux.create(vehicle4)
        aux.create(vehicle5)
        aux.create(vehicle6)

        return aux
    }

    @Bean
    fun UserRepositoryInitializer():Repositorio<Usuario>{

        val aux = Repositorio<Usuario>()
        aux.create(usuarioJosePerez)
        usuarioJosePerez.agregarAmigos(usuarioPedroBarreras)        //para generar una dependencia doble
        aux.create(usuarioPedroBarreras)
        usuarioJosePerez.agregarItinerario(itinerario)
        aux.create(usuarioPepeArgento)
        return aux
    }

    @Bean
    fun destinationRepositoryInitializer():Repositorio<Destino>{

        val aux = Repositorio<Destino>()
        aux.create(destinoArgentinaCordoba)
        aux.create(destinoAlemaniaMunich)
        aux.create(destinoBrazilPetropolis)
        aux.create(destinoUruguayMontevideo)
        aux.create(destinoItaliaRoma)
        aux.create(destinoNicaraguaManagua)
        aux.create(destinoArgentinaBariloche)

        return aux
    }

    @Bean
    fun activityRepositoryInitializer():Repositorio<Actividad>{

        val aux = Repositorio<Actividad>()
        aux.create(actividadEscalar1)
        aux.create(actividadNatacion)
        aux.create(actividadRafting)
        aux.create(actividadPaintBall)
        aux.create(actividadSenderismo)
        return aux
    }

}

fun main(args: Array<String>) {
    runApplication<ServerApplication>(*args)
}