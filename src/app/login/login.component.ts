import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SampService } from '../samp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  returnUrl: string;
  token:any 
  constructor(
    private auth: SampService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  ngOnInit() {
    // get the returnUrl query parameter
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login(username:string,password:string) {
    // console.log(username,password);
    
    this.auth.login(username,password).subscribe((restoken:any) => localStorage.setItem("token", restoken.access))
    this.router.navigateByUrl(this.returnUrl);
  }
  logout() {
    this.auth.logout();
  }
}


