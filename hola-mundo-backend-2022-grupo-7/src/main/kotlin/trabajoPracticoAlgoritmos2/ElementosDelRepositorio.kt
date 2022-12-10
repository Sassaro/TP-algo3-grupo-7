package trabajoPracticoAlgoritmos2

interface ElementosDelRepositorio{

    var id:Int

    fun validacion():Boolean{
        return true
    }

    fun condicionDeBusqueda(string:String):Boolean

}