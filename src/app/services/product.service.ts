import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { Product } from "../interface/product.interface";
import { environment } from "@env/_file";
import {tap} from "rxjs/operators";


const PRODUCTS_URL = environment.url+'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private handleError: number | undefined;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

    createProduct(product: Product | undefined): Observable<Product> {
    return this.http.post<Product>(PRODUCTS_URL, product);
  }

  updateProduct(product: Product | undefined): Observable<Product> {
    // @ts-ignore
    const url = `${PRODUCTS_URL}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  /*deleteProduct(id: number): Observable<any> {
    const url = `${PRODUCTS_URL}/${id}`;
    return this.http.delete(url);
  }*/
  deleteProduct(id: number): Observable<any> {
    const url = `${PRODUCTS_URL}/${id}`;

    return this.http.delete(url).pipe(
      tap(() => console.log(`Producto eliminado con ID ${id}`)),
      // @ts-ignore
      catchError(this.handleError)
    );
  }

  getMyProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL+'/my-products');
  }
  getMyProductsPage(url:any): Observable<Product[]> {
    return this.http.get<Product[]>(url);
  }

  getProduct(id: number) {
    const url = `${PRODUCTS_URL}/${id}`;
    return this.http.get(url);
  }
}
