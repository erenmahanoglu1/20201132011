import { Sonuc } from 'src/app/models/sonuc';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sonuc: Sonuc= new Sonuc();

  constructor(
    public fbservis:FbservisService,
    public router:Router,
  ) { }

  ngOnInit() {
  }
  Girisyap(mail:string,parola:string){
    this.fbservis.OturumAc(mail,parola).then(d=>{
      if(d.user){
        localStorage.setItem("user",JSON.stringify(d.user));
        this.router.navigate(['/']);
      }

    },err=>{
      this.sonuc.islem=false;
        this.sonuc.mesaj="E-Posta Adresinizi veya Parolanızı Hatalı Girdiniz!";

    });

  }

}
