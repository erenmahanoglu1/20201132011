import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Kayit } from 'src/app/models/kayit';
import { Sonuc } from 'src/app/models/sonuc';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-odevler',
  templateUrl: './odevler.component.html',
  styleUrls: ['./odevler.component.scss']
})
export class OdevlerComponent implements OnInit {
  kayitlar;
  secKayit: Kayit= new Kayit();
  sonuc: Sonuc= new Sonuc();

  constructor(
    public Fbservis: FbservisService
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.secKayit.key=null;
  }
  KayitListele(){
    this.Fbservis.KayitListele().snapshotChanges().pipe(
  
      map(changes =>
      
      changes.map(c =>
      
      ({ key: c.payload.key, ...c.payload.val() })
      
      )
      
      )
      
      ).subscribe(data => {
      
      this.kayitlar = data;
      
      });
  
  
  }
  KayitDuzenle(kayit:Kayit){
    Object.assign(this.secKayit,kayit);
  
  }
  KayitSil(kayit:Kayit){
    this.Fbservis.KayitSil(kayit.key).then(()=>{
      this.sonuc.islem=true;
      this.sonuc.mesaj="Kayıt Silindi...";
  
    });
  
  }
  Kaydet(){
    var tarih = new Date();
    if (this.secKayit.key==null){
      this.secKayit.verilisT=tarih.getTime().toString();
      this.Fbservis.KayitEkle(this.secKayit).then(()=>{
        this.sonuc.islem=true;
        this.sonuc.mesaj="Kayıt Eklendi...";
      });
    }
    else{
      this.Fbservis.KayitDuzenle(this.secKayit).then(()=>{
        this.sonuc.islem=true;
        this.sonuc.mesaj="Kayıt Düzenlendi...";
      });
    }
  
  }
  Vazgec(){
    this.secKayit=new Kayit();
    this.secKayit.key =null;
    
  }
  TamamlaIptal(k:Kayit,islem:boolean){
    k.islem=islem;
    this.Fbservis.KayitDuzenle(k).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Güncellendi..."
    });
  
  }
  }
  
