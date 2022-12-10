package trabajoPracticoAlgoritmos2

interface Observers {

    fun evento(usuario: Usuario, viaje: Viaje)

}

class ObserverAvisarDestino(val mailSender: MailSender) : Observers {

    override fun evento(usuario: Usuario, viaje: Viaje) {

        val destino = viaje.itinerario.destino
        val usuariosInteresadosEnElDestino = usuario.amigos.filter { it.deseaDestino(destino) }

        usuariosInteresadosEnElDestino.forEach { amigo ->

            mailSender.sendMail(
                Mail(
                    "app@holamundo.com",
                    "Visitaron un destino que te puede interesar",
                    "Hola! ${amigo.username}, ${usuario.nombre} ${usuario.apellido} visito ${destino.pais} ${destino.ciudad}"
                )
            )
        }
    }
}

class ObserverLocalista(val mailSender: MailSender):Observers{

    override fun evento(usuario: Usuario, viaje: Viaje){

        if(!viaje.itinerario.destino.esLocal()){
            usuario.cambiarCriterio(Localista())
        }
    }
}

class ObserverAgregarItinerario(): Observers{
    override fun evento(usuario: Usuario, viaje: Viaje) {
        usuario.agregarItinerario(viaje.itinerario)
    }

}

class ObserverVehiculoConvenio(val marca: String): Observers{
    override fun evento(usuario: Usuario, viaje: Viaje) {
        if(!viaje.vehiculo.tieneConvenio){
            usuario.gustos = Selectivo(marca)
        }
    }

}