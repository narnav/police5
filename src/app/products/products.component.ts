import { Component } from '@angular/core';
import { ProdsService } from '../prods/prods.service';
import { Product } from '../product';
import { CartItem } from '../cart-item';
import { SampService } from '../samp.service';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    myProducts:Product[]=[]
    myCart:CartItem[]=[]
    msg=""
    constructor(private prods: ProdsService,private auth:SampService,private cart:CartService) {
        prods.getItems().subscribe(res => this.myProducts =res)
    }
    
    addToCart(item:any,mnt:number){
        this.cart.addToCart({id:item.id,amount:1,desc:item.desc,price:item.price},mnt)
        this.myCart.push({id:item.id,amount:1,desc:item.desc,price:item.price})
        // localStorage.setItem('cart',JSON.stringify( this.myCart))
    }
    
    Checkout(){
        if(this.auth.isLoged){
            let myCart=localStorage.getItem('cart')?localStorage.getItem('cart'):"";
            let cart_items:CartItem[]=[]
            if(myCart)
            {
                cart_items=JSON.parse( myCart)
                console.log(cart_items);
                this.cart.addToCart(cart_items)
            }
            this.msg ="thank u 4 buying...."
        }else{
            this.msg ="u need 2 login!"
        }
    }
}
