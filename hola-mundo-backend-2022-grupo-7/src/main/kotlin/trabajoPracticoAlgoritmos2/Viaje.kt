package trabajoPracticoAlgoritmos2

class Viaje(val itinerario: Itinerario, val vehiculo: Vehiculo,val usuario: Usuario,val diasDeAlquiler:Int = 0){

    val observers = mutableListOf<Observers>()

    fun calcularCosto():Double{
        return  usuario.calcularCostoDeViaje(itinerario.destino) + vehiculo.costoDeAlquiler(diasDeAlquiler) + itinerario.costoDelItinerario()
    }

    fun realizarViaje(){

        if(usuario.puedeRealizarItinerario(itinerario)){
            usuario.agregarDestinoVisitado(this.itinerario.destino)

            observers.forEach { it.evento(usuario,this) }
        }else{
            throw RuntimeException("El usuario no puede realizar el viaje")
        }
    }

    fun agregarObserver(observer: Observers){
        observers.add(observer)
    }

    fun quitarObserver(observer: Observers){
        observers.add(observer)
    }

}