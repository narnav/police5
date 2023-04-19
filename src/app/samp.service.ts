import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SampService {
  isLoged = new BehaviorSubject<boolean>(false);

  public logged:boolean=false
  constructor(private http: HttpClient) {}
  getItems() {
    return this.http.get('http://localhost:3005');
  }

  login() {

    this.isLoged.next(true);

    return this.http.post('http://localhost:3005/api/login', {
      username: 'user',
      password: 'password',
    });
  }
  logout(): void {
    // Perform logout logic here
    // Set isLoggedIn to false
    this.isLoged.next(false);
  }

  getPrivateData(){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3005/api/data',{headers});

  }
}
