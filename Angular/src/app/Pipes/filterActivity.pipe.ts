import { Pipe, PipeTransform } from '@angular/core';
import { Actividad } from 'src/Dominio/Actividades/Actividades';

@Pipe({
  name: 'filterActivity'
})
export class FilterActivityPipe implements PipeTransform {

  transform(actividad: Actividad[], palabra: string): Actividad[] {
    return actividad.filter(actividad => actividad.contiene(palabra));
  }


}
