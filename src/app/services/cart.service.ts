import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../cart-item';

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
  apiUrl="http://127.0.0.1:8000/addcart/"

  getItems(): Observable<any> {
   
    return this.myServer.post<any>(this.apiUrl,{});
  }


  sendCart(cart: any):Observable<any> {
    

    console.log(JSON.stringify(cart));
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // headers.set('Content-Type', 'application/json'); // Update the headers correctly
    return this.myServer.post<any>(this.apiUrl,[{"amount":2,"desc":"m","price":"2.00"}], { headers });
    return this.myServer.post<any>(this.apiUrl,cart, { headers });
    // return this.myServer.post<any>(this.apiUrl, cartJson)//, { headers });
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
      // If product already exists in the cart,add/remove 1 from the amount
      temp.amount += mnt;
      if (temp.amount == 0) {
        // If the quantity reaches 0, remove the product from the cart
        updatedCart = [...currentCart.filter((x) => product.id != x.id)];
      } else {
        
        updatedCart = [...currentCart];
      }
    } else {
      // If product doesn't exist in the cart, add it
      if(mnt === 1)
      {
        console.log("add one");
      updatedCart = [...currentCart, product];
      }
    }

    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
}
