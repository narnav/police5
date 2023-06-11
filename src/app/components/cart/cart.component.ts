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