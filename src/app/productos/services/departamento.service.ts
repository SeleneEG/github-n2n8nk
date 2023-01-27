import { Injectable } from '@angular/core';
import { Departamento } from '../domain/departamento';
import { Observable, of } from 'rxjs';
import { map, filter, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private departamentos: Departamento[] = [
    {
      id: 1,
      clave: 'HARDWARE',
      nombre: 'Hardware',
    },
    {
      id: 2,
      clave: 'ACCESORIOS',
      nombre: 'Accesorios',
    },
    {
      id: 3,
      clave: 'ELECTRONICA',
      nombre: 'Electrónica',
    },
  ];

  constructor() {}

  getDepartamento(): Observable<Departamento[]> {
    return of(this.departamentos).pipe(delay(2000));
  }

  getDepartamentoPorId(id: number): Observable<Departamento> {
    return of(this.departamentos.filter((d) => d.id === id)[0]).pipe(
      delay(2000)
    );
  }
}
