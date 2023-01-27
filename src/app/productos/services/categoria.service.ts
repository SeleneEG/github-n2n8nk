import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, filter, delay } from 'rxjs/operators';
import { Categoria } from '../domain/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private categorias: Categoria[] = [
    {
      id: 1,
      nombre: 'Tarjetas de video',
      departamentoId: 1,
    },
    {
      id: 2,
      nombre: 'Discos duros',
      departamentoId: 1,
    },
    {
      id: 3,
      nombre: 'Memorias',
      departamentoId: 1,
    },
    {
      id: 4,
      nombre: 'Procesadores',
      departamentoId: 1,
    },
    {
      id: 5,
      nombre: 'Fuentes de poder',
      departamentoId: 1,
    },
    {
      id: 6,
      nombre: 'Cables y Adaptadores',
      departamentoId: 2,
    },
    {
      id: 7,
      nombre: 'Teclados',
      departamentoId: 2,
    },
    {
      id: 8,
      nombre: 'Joysticks y Joypads',
      departamentoId: 2,
    },
    {
      id: 9,
      nombre: 'Maletas y Maletines',
      departamentoId: 2,
    },
    {
      id: 10,
      nombre: 'Limpieza',
      departamentoId: 2,
    },
    {
      id: 11,
      nombre: 'Sillas Gamer',
      departamentoId: 2,
    },
    {
      id: 12,
      nombre: 'Mouse/Ratones',
      departamentoId: 2,
    },
    {
      id: 13,
      nombre: 'Bocinas',
      departamentoId: 2,
    },
    {
      id: 14,
      nombre: 'Monitores',
      departamentoId: 3,
    },
    {
      id: 15,
      nombre: 'Televisores',
      departamentoId: 3,
    },
    {
      id: 16,
      nombre: 'Reguladores de Voltaje',
      departamentoId: 3,
    },
    {
      id: 17,
      nombre: 'Proyectores',
      departamentoId: 3,
    },
    {
      id: 18,
      nombre: 'Microcomponentes',
      departamentoId: 3,
    },
    {
      id: 19,
      nombre: 'Reproductores Streaming',
      departamentoId: 3,
    },
    {
      id: 20,
      nombre: 'No-Breaks y UPS',
      departamentoId: 3,
    },
    {
      id: 21,
      nombre: 'Captura de Video y Sintonizadores de TV',
      departamentoId: 3,
    },
  ];

  constructor() {}

  getCategorias(): Observable<Categoria[]> {
    return of(this.categorias).pipe(delay(5000));
  }

  getCategoriaPorId(id: number): Observable<Categoria> {
    return of(this.categorias.filter((c) => c.id === id)[0]).pipe(delay(5000));
  }
}
