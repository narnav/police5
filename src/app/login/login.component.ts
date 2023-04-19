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
  constructor(
    private auth: SampService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  ngOnInit() {
    // get the returnUrl query parameter
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.auth.login();
    this.router.navigateByUrl(this.returnUrl);
  }
  logout() {
    this.auth.logout();
  }
}


