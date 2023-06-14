import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: "cart.component.html",
})
export class CartComponent implements OnInit {
    cart: any[] = [];
    total: number = 0

    constructor(private cartService: CartService) {}
    addToCart(item:any,mnt:number){
        this.cartService.addToCart({id:item.id,amount:1,desc:item.desc,price:item.price},mnt)
        // this.myCart.push({id:item.id,amount:1,desc:item.desc,price:item.price})
        // // localStorage.setItem('cart',JSON.stringify( this.myCart))
    }

    sendCart(){
        this.cartService.sendCart(this.cart).subscribe(res => console.log( res   ))
    }

    ngOnInit() {

        this.cartService.getCart().subscribe((cart) => {
            this.total = 0
            this.cart = cart;
            this.cart.forEach(item => this.total += (item.price * item.amount))
        });
    }
}