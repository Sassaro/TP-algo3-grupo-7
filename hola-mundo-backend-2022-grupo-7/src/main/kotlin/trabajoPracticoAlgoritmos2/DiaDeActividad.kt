package trabajoPracticoAlgoritmos2

import java.time.LocalTime

class DiaDeActividad(val actividades: MutableList<Actividad>) {

    fun tiempoDeActividadEnElDia(): Int {
        return actividades.sumOf { it.duracionActividad() }
    }

    fun agregarActividadAlDia(actividad: Actividad) {

        if (this.solapaEstaActividad(actividad, this.actividades)) {
            throw RuntimeException("No se pueden agregar actividades Solapadas")
        } else {
            actividades.add(actividad)
        }
    }

    fun estaVacio(): Boolean {
        return actividades.isEmpty()
    }

    fun tieneActividadesSolapadas(): Boolean {
        if (this.estaVacio()) {
            return false
        }
        return actividades.any { actividad ->
            val auxActividades = actividades.filter { it != actividad }
            this.solapaEstaActividad(actividad, auxActividades)
        }
    }

    private fun solapaEstaActividad(actividad: Actividad, listaDeActividades: List<Actividad>): Boolean {
        return listaDeActividades.any {
            this.comparacionDeActividades(actividad, it)
        }
    }

    private fun comparacionDeActividades(actividad1: Actividad, actividad2: Actividad):Boolean{
        return actividad1.inicio == actividad2.inicio ||            //compara si estan completamente solapadas
         actividad1.fin == actividad2.fin ||
        this.estanParcialmenteSolapadas(actividad1,actividad2) 
    }

    private fun estanParcialmenteSolapadas(actividad1: Actividad, actividad2: Actividad):Boolean{

        return this.estaEnMedio(actividad1.inicio,actividad1.fin,actividad2.inicio) || 
        this.estaEnMedio(actividad1.inicio,actividad1.fin,actividad2.fin)

    }

    private fun estaEnMedio(inicio:LocalTime,fin:LocalTime,valor:LocalTime):Boolean{
        
        return valor.isAfter(inicio) && valor.isBefore(fin)
    }

}
