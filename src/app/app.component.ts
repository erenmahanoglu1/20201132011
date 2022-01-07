import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FbservisService } from './services/fbservis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  returnUrl="";
  title = 'deneme';
  constructor(
    public fbservis:FbservisService,
    public router:Router,
  ) { }
  ngOnInit(): void {
  }
  OturumKapat(){
    this.fbservis.OturumKapat().then(()=>{
      localStorage.removeItem("user");
      this.router.navigate(['/']);
    });
    

  }
  GirisYaptiMi(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  GirisYapti():boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return user == null;
  }


}
