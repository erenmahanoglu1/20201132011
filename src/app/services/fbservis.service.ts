import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Kayit } from '../models/kayit';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {

  private dbKayit = '/Kayitlar';

  kayitRef: AngularFireList<Kayit> = null;
  snapshot: any;
  
  constructor(
  
  public db: AngularFireDatabase,
  public afAuth: AngularFireAuth
  
  )
  
  {
  
  this.kayitRef = db.list(this.dbKayit);
  }

  OturumAc(mail:string,parola:string){
    return this.afAuth.signInWithEmailAndPassword(mail,parola);

  }
  OturumKapat(){
    return this.afAuth.signOut();
  }


  KayitListele(){
    return this.kayitRef;
  } 
  KayitEkle(kayit:Kayit){
    return this.kayitRef.push(kayit);
    }
  KayitDuzenle(kayit:Kayit){
    return this.kayitRef.update(kayit.key, kayit);
    }
  KayitSil(key:string){
    return this.kayitRef.remove(key);
    }

}
