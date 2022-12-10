package trabajoPracticoAlgoritmos2

abstract class Tarea(val mailSender: MailSender, val nombreDeLaTarea: String) {

    fun accion(usuario: Usuario) {
        this.accionEspecifica(usuario)

        mailSender.sendMail(
            Mail(
                "",
                "Se realizo la tarea: $nombreDeLaTarea",
                "Se realizo la tarea: $nombreDeLaTarea"
            )
        )
    }


    abstract fun accionEspecifica(usuario: Usuario)

}

class PuntuarItinerarios(val puntaje: Int, mailSender: MailSender, nombreDeLaTarea: String) :
    Tarea(mailSender, nombreDeLaTarea) {

    override fun accionEspecifica(usuario: Usuario) {

        val itinerarioAPuntuar = usuario.itinerarios.filter { usuario.puedePuntuarIitinerario(it) }     //Filtra los itinerarios que puede puntuar
        itinerarioAPuntuar.forEach { usuario.puntuarItinerario(it, puntaje) }                           //puntua todos los itinerarios filtrados
    }

}

class TransferirItinerarios(mailSender: MailSender, nombreDeLaTarea: String) : Tarea(mailSender, nombreDeLaTarea) {
    override fun accionEspecifica(usuario: Usuario) {
        var amigoConMenosDestinosVisitados: Usuario = usuario.amigos.first()

        usuario.amigos.forEach{
            if(amigoConMenosDestinosVisitados.destinosVisitados.size > it.destinosVisitados.size)
            amigoConMenosDestinosVisitados=it
        }
        usuario.itinerarios.forEach { itinerario-> amigoConMenosDestinosVisitados.agregarItinerario(itinerario) }        //por cada itinerario del usuario le agrega ese itinerario al amigo

    }

}

class HacerseAmigoPorDestino(val destinoEspecifico:Destino,val repositorioUsuarios: Repositorio<Usuario>,mailSender: MailSender, nombreDeLaTarea: String) : Tarea(mailSender, nombreDeLaTarea) {

    override fun accionEspecifica(usuario: Usuario) {
        val usuarios = repositorioUsuarios.coleccion.filter { it.conoceDestino(destinoEspecifico) }
        usuarios.forEach{ usuario.agregarAmigos(it) }
    }
}

class AgregarADestinosDeseados(mailSender: MailSender, nombreDeLaTarea: String) : Tarea(mailSender, nombreDeLaTarea) {
    override fun accionEspecifica(usuario: Usuario) {
        usuario.amigos.forEach{

            if(it.destinosDeseados.isNotEmpty()){
                var maximo: Double = it.destinosDeseados.maxOf { destino: Destino -> it.calcularCostoDeViaje(destino) }
                var destinodeseado: List<Destino> = it.destinosDeseados.filter { destino: Destino -> it.calcularCostoDeViaje(destino) == maximo}
                usuario.agregarDestinoDeseado(destinodeseado[0])
            }
        }
    }
}