import { Injectable } from '@angular/core';
import { Producto } from '../domain/producto';
import { Observable, of } from 'rxjs';
import { map, filter, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[] = [
    {
      id: 1,
      nombre:
        'Tarjeta de Video AMD Radeon RX 570 Asrock Gaming, 8GB GDDR5, 1xHDMI, 1xDVI, 3xDisplayPort, PCI Express x16 3.0.',
      marca: 'Asrock',
      modelo: 'PG D RADEON RX570 8G',
      precio: 8999,
      descuento: 0.1,
      categoriaId: 1,
    },
    {
      id: 2,
      nombre:
        'Tarjeta de Video NVIDIA GeForce GTX 1070 Ti ASUS ROG STRIX GAMING, 8GB GDDR5, 2xHDMI, 1xDVI, 2xDisplayPort, PCI Express x16 3.0.',
      marca: 'ASUS',
      modelo: 'ROG-STRIX-GTX1070TI-8G-GAMING RCD',
      precio: 15999,
      descuento: 0,
      categoriaId: 1,
    },
    {
      id: 3,
      nombre: 'Fuente de Poder Gigabyte P550B de 550W, ATX, 80 PLUS BRONZE.',
      marca: 'ASUS',
      modelo: 'GP-P550B',
      precio: 1999,
      descuento: 0.15,
      categoriaId: 5,
    },
    {
      id: 4,
      nombre:
        'Fuente de Poder AeroCool Cylon RGB de 700W, ATX, 80 PLUS Bronze.',
      marca: 'AeroCool',
      modelo: '4718009157255',
      precio: 2599,
      descuento: 0,
      categoriaId: 5,
    },
    {
      id: 5,
      nombre:
        'Procesador AMD Ryzen 5 5600X de Quinta Generación, 3.7GHz (hasta 4.6GHz), Socket AM4, Six-Core, 65W',
      marca: 'AMD',
      modelo: '100-100000065BOX',
      precio: 8999,
      descuento: 0.5,
      categoriaId: 4,
    },
    {
      id: 6,
      nombre:
        'Procesador Intel Core i5-9400F de Novena Generación, 2.9 GHz (hasta 4.1 GHz), Socket 1151, Caché 9 MB, Six-Core, 14nm. No incluye gráficos integrados',
      marca: 'Intel',
      modelo: 'BX80684I59400F',
      precio: 4999,
      descuento: 0.7,
      categoriaId: 4,
    },
    {
      id: 7,
      nombre:
        'Procesador AMD Ryzen 5 3400G, 3.7 GHz (hasta 4.2 GHz) con gráficos Radeon RX Vega 11, Socket AM4, Quad-Core, 65W.',
      marca: 'AMD',
      modelo: 'YD3400C5FHBOX',
      precio: 7999,
      descuento: 0,
      categoriaId: 4,
    },
    {
      id: 8,
      nombre:
        'Teclado mecánico Logitech LIGHTSPEED G915 920-009660, RGB, Bluetooth, USB. Color Blanco',
      marca: 'Logitech',
      modelo: '920-009660',
      precio: 3999,
      descuento: 0.1,
      categoriaId: 7,
    },
    {
      id: 9,
      nombre: 'Teclado Mecánico Gaming Logitec Pro, GX Blue, USB. Color Negro',
      marca: 'Logitech',
      modelo: '920-009388',
      precio: 2999,
      descuento: 0.1,
      categoriaId: 7,
    },
    {
      id: 10,
      nombre:
        "Mochila Dell Pro Backpack 17 soporta Laptops de hasta 17', Color Negro",
      marca: 'DELL',
      modelo: '460-BCMM',
      precio: 1999,
      descuento: 0,
      categoriaId: 9,
    },
    {
      id: 11,
      nombre:
        'Alcohol Isopropilico Silimex, para mantenimiento y limpieza. 1 Litro',
      marca: 'SILIMEX',
      modelo: 'ALCOHOL 1000',
      precio: 159,
      descuento: 0,
      categoriaId: 10,
    },
    {
      id: 13,
      nombre:
        "Bocina Vorago Karaoke KSP-300 de 8', con Reproductor de Audio, Bluetooth y Karaoke, 3.5mm, USB, FM",
      marca: 'Vorago',
      modelo: 'KSP-300-BK',
      precio: 829,
      categoriaId: 13,
      descuento: 0,
    },
    {
      id: 14,
      nombre:
        "Monitor LED Samsung LS24F350FHLXZX de 23.6', Resolución 1920 x 1080 (Full HD 1080p)",
      marca: 'Samsung',
      modelo: 'LS24F350FHLXZX',
      precio: 2999,
      descuento: 0.5,
      categoriaId: 14,
    },
    {
      id: 15,
      nombre:
        "Monitor LED HP N246V de 23.8', Resolución 1920 x 1080 (Full HD 1080p) Color Negro",
      marca: 'HP',
      modelo: '1RM28AA#ABA',
      precio: 3999,
      descuento: 0,
      categoriaId: 14,
    },
    {
      id: 16,
      nombre:
        "Monitor LED HP 24fw de 23.8', Resolución 1920 x 1080 (Full HD 1080p)",
      marca: 'HP',
      modelo: '3KS62AA#ABA',
      precio: 6999,
      descuento: 0.5,
      categoriaId: 14,
    },
    {
      id: 17,
      nombre:
        'Google Smart TV Kit de Tercera Generación (Incluye Google Chromecast y Google Home mini)',
      marca: 'Google',
      modelo: 'GA00545-US',
      precio: 1699,
      descuento: 0,
      categoriaId: 19,
    },
    {
      id: 18,
      nombre: 'Reproductor de Streaming multimedia Roku Premiere',
      marca: 'Roku',
      modelo: 'KU PREMIER',
      precio: 1999,
      descuento: 0.5,
      categoriaId: 19,
    },
    {
      id: 19,
      nombre: 'Back UPS PRO APC BR1100M2-LM 1100VA/600W, 10 contactos, 120V',
      marca: 'APC',
      modelo: 'BR1100M2-LM',
      precio: 5299,
      descuento: 0.5,
      categoriaId: 20,
    },
    {
      id: 20,
      nombre:
        'Batería de Respaldo Koblenz 5216 R, 520VA (240 Watts) con 6 contactos NEMA 5-15R, 120V',
      marca: 'Koblenz',
      modelo: '5216 R',
      precio: 1299,
      descuento: 0.1,
      categoriaId: 20,
    },
    {
      id: 21,
      nombre: "Televisión Samsung LED Smart TV de 32', Resolución 1366 x 768",
      marca: 'Samsung',
      modelo: 'LH32BETBLGKXZX',
      precio: 4699,
      descuento: 0.15,
      categoriaId: 15,
    },
    {
      id: 22,
      nombre:
        'Adaptador Microsoft Wireless Display (dispositivo de transmisión de contenido multimedia)',
      marca: 'Microsoft',
      modelo: 'P3Q-00018',
      precio: 999,
      descuento: 0,
      categoriaId: 21,
    },
  ];

  constructor() {}

  getProductos(): Observable<Producto[]> {
    return of(this.productos).pipe(delay(5000));
  }

  getProductoPorId(id: number): Observable<Producto> {
    return of(this.productos.filter((p) => p.id === id)[0]).pipe(delay(5000));
  }

  createProducto(producto: Producto): Observable<Producto> {
    this.productos.push(producto);
    return of(producto).pipe(delay(5000));
  }

  updateProducto(producto: Producto): Observable<Producto> {
    let updated = this.productos.map((p) =>
      p.id === producto.id ? { ...producto } : p
    );
    this.productos = updated;
    return of(producto).pipe(delay(5000));
  }

  deleteProducto(id: number): Observable<Producto> {
    let deleted: Producto = this.productos.filter((p) => p.id === id)[0];
    let updated = this.productos.filter((p) => p.id !== id);
    this.productos = updated;
    return of(deleted).pipe(delay(5000));
  }
}
