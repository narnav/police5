import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
    providedIn: 'root'
})
export class ProdsService {
    serverURL = "http://127.0.0.1:8000/product/"

    constructor(private myServer: HttpClient) { }

    getItems(): Observable<Product[]> {
        return this.myServer.get<Product[]>(this.serverURL);
      }
}
