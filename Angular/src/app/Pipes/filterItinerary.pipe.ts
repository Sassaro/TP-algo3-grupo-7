import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterItinerary'
})
export class FilterItineraryPipe implements PipeTransform {

  transform(Itinerario: Itinerario[], palabra: string): Itinerario[] {
    return Itinerario.filter(Itinerario => Itinerario.contiene(palabra));
  }

}
