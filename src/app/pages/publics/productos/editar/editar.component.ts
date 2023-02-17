import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "@services/product.service";
import {Product} from "@interfaces/product.interface";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit{
  product: Product | undefined;
  isEdit = false;
  editproduct : any = {
    name: '',
    description : '',
    active : false,
    price : '',
    category_id: '',
  }

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    const productId = +this.route.snapshot.paramMap.get('uuid');
    // @ts-ignore
    if (productId && productId !== 'new'){
      this.isEdit = true
      this.productService.getProduct(productId).subscribe((product: any) =>{
        if (!product.data) {
        } else {
          this.product = product.data;
          this.editproduct = this.product;
        }
      });
    }
    else {
      this.isEdit = false;
    }
  }

  onSubmit(): void {
    if (this.isEdit){
      this.productService.updateProduct(this.product).subscribe(() => {
        console.log('Producto actualizado');
        this.router.navigate(['/products']);
      });
    }
    else{
      console.log(this.editproduct);
      this.productService.createProduct(this.editproduct).subscribe( () => {
        console.log('Producto Creado');
        this.router.navigate(['/productos']);
      });
    }
  }
}
