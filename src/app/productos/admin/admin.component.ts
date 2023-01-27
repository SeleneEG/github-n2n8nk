import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItemGroup } from 'primeng/api';
import { Categoria } from '../domain/categoria';
import { Departamento } from '../domain/departamento';
import { CategoriaService } from '../services/categoria.service';
import { DepartamentoService } from '../services/departamento.service';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Producto } from '../domain/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  categorias!: Categoria[];
  departamentos!: Departamento[];
  agrupacion!: SelectItemGroup[];
  items!: MenuItem[];
  home!: MenuItem;
  disabled: boolean = false;

  productoForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(250),
    ]),
    marca: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    modelo: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    precio: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(999999999),
    ]),
    categoria: new FormControl('', [Validators.required]),
  });

  constructor(
    public route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private departamentoService: DepartamentoService,
    private localtion: Location,
    private messageService: MessageService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      this.departamentoService.getDepartamento().subscribe((departamentos) => {
        this.departamentos = departamentos;
        this.agruparCategorias();
      });
    });
    this.items = [{ label: 'Agregar' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  agruparCategorias() {
    this.agrupacion = [];
    this.departamentos.forEach((departamento) => {
      this.agrupacion.push({
        label: departamento.nombre,
        value: departamento.id,
        items: this.categorias
          .filter((cat) => cat.departamentoId === departamento.id)
          .map((obj) => {
            return { label: obj.nombre, value: obj.id };
          }),
      });
    });
  }

  regresar() {
    this.localtion.back();
  }

  guardarProducto() {
    if (this.productoForm.valid) {
      this.disabled = true;
      let nuevoProducto: Producto;
      nuevoProducto = {
        nombre: this.productoForm.get('nombre').value,
        marca: this.productoForm.get('marca').value,
        modelo: this.productoForm.get('modelo').value,
        precio: this.productoForm.get('precio').value,
        categoriaId: this.productoForm.get('categoria').value['value'],
        descuento: 0,
      };

      this.productoService.createProducto(nuevoProducto).subscribe((resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Producto agregado',
        });
        this.localtion.back();
      });
    } else {
      this.productoForm.markAllAsTouched();
    }
  }
}
