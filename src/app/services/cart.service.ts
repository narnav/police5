import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  constructor(private myServer: HttpClient) { }
  // Returns an observable of the cart subject
  getCart() {
    return this.cartSubject.asObservable();
  }
  apiUrl="http://127.0.0.1:8000/carts/"

  sendCart(cart: any) {
    
    
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const cartJson = JSON.stringify(cart);
    return this.myServer.post(this.apiUrl, cartJson,{headers});
  }

  // Initializes the cart by retrieving stored cart data from local storage
  initCart() {
    let myCart = localStorage.getItem('cart');
    if (myCart) {
      console.log(myCart);
      let myCart1: [] = JSON.parse(myCart);
      this.cartSubject.next([...myCart1]);
    }
  }

  // Adds or remove a product to the cart with an optional quantity (default is 1)
  addToCart(product: any, mnt = 1) {
    const currentCart = this.cartSubject.getValue();
    const temp = currentCart.filter((x) => product.id == x.id)[0];
    let updatedCart: any[] = [];

    if (temp) {
      // If product already exists in the cart
      temp.amount += mnt;
      if (temp.amount == 0) {
        // If the quantity reaches 0, remove the product from the cart
        updatedCart = [...currentCart.filter((x) => product.id != x.id)];
      } else {
        updatedCart = [...currentCart];
      }
    } else {
      // If product doesn't exist in the cart, add it
      updatedCart = [...currentCart, product];
    }

    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
}
