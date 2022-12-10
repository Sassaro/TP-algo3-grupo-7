package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator
import com.fasterxml.jackson.databind.jsontype.PolymorphicTypeValidator


val LIMITE_CILINDRADAS = 250
val MUCHOS_DIAS_ALQUILER = 7
val DESCUENTO_CONVENIO = 0.1
val PAIS_LOCAL = "ARGENTINA"
val BONUS_POR_NO_SER_DESTINO_LOCAL = 0.2
val DEFAULT_MAPPER = ObjectMapper().findAndRegisterModules()


