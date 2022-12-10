import { Vehiculo } from 'src/Dominio/vehiculo/vehiculo';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVehicles'
})
export class FilterVehiclesPipe implements PipeTransform {

  transform(Vehiculo: Vehiculo[], palabra: string): Vehiculo[] {
    return Vehiculo.filter(Vehiculo => Vehiculo.contiene(palabra));
  }

}
