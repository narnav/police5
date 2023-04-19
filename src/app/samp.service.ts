import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SampService {
  public logged:boolean=false
  constructor(private http: HttpClient) {}
  getItems() {
    return this.http.get('http://localhost:3005');
  }

  login() {
    this.logged =true
    return this.http.post('http://localhost:3005/api/login', {
      username: 'user',
      password: 'password',
    });
  }

  getPrivateData(){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3005/api/data',{headers});

  }
}
