import { Component } from '@angular/core';
import { SampService } from './samp.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private srv:SampService,private cartsrv:CartService){}
  title = 'app';

    ngOnInit(): void {
       this.cartsrv.initCart()
    }

  getData(){
    this.srv.getPrivateData().subscribe(res=> console.log(res))
  }


test(){
  this.srv.getItems().subscribe(res=> console.log(res))

}
login(){
//   this.srv.login().subscribe((res:any)=> localStorage.setItem("token", res.token))
}
}
