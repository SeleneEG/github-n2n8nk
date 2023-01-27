import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../domain/producto';
import { ProductoService } from '../services/producto.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../domain/categoria';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  productos!: Producto[];
  items!: MenuItem[];
  home!: MenuItem;
  categorias!: Categoria[];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private currency_pipe_object: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((respCat) => {
      this.categorias = respCat;
      this.productoService.getProductos().subscribe((resp) => {
        console.log();
        this.productos = resp.map((p) => {
          return {
            ...p,
            categoriaNombre: this.categorias.filter(
              (c) => c.id === resp[0].categoriaId
            )[0].nombre,
          };
        });
      });
    });

    this.items = [{ label: 'Admin' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  botonesEditarEliminar(idProducto): any {
    return [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
          this.editar(idProducto);
        },
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          this.eliminar(idProducto);
        },
      },
    ];
  }

  agregar() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  editar(idProducto: number) {
    this.router.navigate(['../editar', idProducto], {
      relativeTo: this.route,
    });
  }

  eliminar(idProducto: number) {
    this.router.navigate(['../eliminar', idProducto], {
      relativeTo: this.route,
    });
  }

  detalles(idProducto: number) {
    this.router.navigate(['../detalles', idProducto], {
      relativeTo: this.route,
    });
  }

  exportarExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.productos.map((p) => {
          return {
            id: p.id,
            nombre: p.nombre,
            modelo: p.modelo,
            precio: this.currency_pipe_object.transform(
              p.precio,
              'USD',
              'symbol',
              '1.2-2'
            ),
            categoria: this.categorias.filter((c) => c.id === p.categoriaId)[0]
              .nombre,
          };
        })
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.crearArchivoExcel(excelBuffer, 'products');
    });
  }

  crearArchivoExcel(buffer: any, nombreArchivo: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      nombreArchivo + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
