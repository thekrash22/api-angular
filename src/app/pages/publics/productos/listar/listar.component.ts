import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductService } from "@services/product.service";
import { Product } from "@interfaces/product.interface";
import {Router} from "@angular/router";
import {AuthService} from "@services/auth.service";


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  constructor(private http: HttpClient,
              private productService: ProductService,
              private router: Router,
              private authSrvice: AuthService) {}
  public products: any[] = [];
  public links: any[] = [];
  public loading: boolean = true;

  ngOnInit() : void {
    this.loadProducts();
  }

  nextPage(page: any){
    this.productService.getMyProductsPage(page).subscribe(
      (data: any) => {
        this.products = data.data.data;
        this.links = data.data.links;
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  editProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(updatedProduct => {
      console.log('Producto actualizado', updatedProduct);
    });
  }

  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        console.log('Producto eliminado');
        this.loadProducts();
      });
    }
    this.productService.deleteProduct(productId).subscribe(() => {
      console.log('Producto eliminado', productId);
      // Lógica para actualizar la lista de productos en la vista
    });
  }

  loadProducts() {
    this.productService.getMyProducts().subscribe(
      (data: any) => {
        this.products = data.data.data;
        this.links = data.data.links;
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }
  cerrarSesion() {
    if (confirm('¿Seguro que deseas cerrar tu sesion?')) {
      this.authSrvice.logout();
      this.router.navigate(['/login']);
    }
  }
}
