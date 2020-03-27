import { Component, NgModule, Input, EventEmitter, Output } from '@angular/core'; // var Component = require('@angular/core')
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



class Vokabel{
  englisch: string;
  deutsch: string;
  verstecken: boolean;

  constructor(englisch: string, deutsch: string){
    this.englisch = englisch;
    this.deutsch = deutsch;
    this.verstecken = true;
  }

  toggle(){
    this.verstecken = !this.verstecken;
  }
}

@Component({
  selector: 'vokabel',
  template: `
  <div class="card card-block">
    <h4 class="card-title">{{vokabel.englisch}}</h4>
    <p class="card-text"
      [hidden]="vokabel.verstecken">{{vokabel.deutsch}}</p>
    <a class="btn btn-primary"
       (click)="vokabel.toggle()">{{vokabel.verstecken ? 'anzeigen' : 'ausblenden'}}</a>
  </div>
  `
})
class vokabelComponent{
  @Input() vokabel: Vokabel;
}

@Component({
  selector: 'vokabel-liste',
  template: `
  <vokabel-formular (vokabelErstellt)="vokabelHinzufuegen($event)"></vokabel-formular>
  <vokabel *ngFor="let v of vokabelListe" [vokabel]="v"></vokabel>
  `
})
class vokabelListComponent{
  vokabelListe: Vokabel[];
  constructor(){
    this.vokabelListe = [
      new Vokabel("house","Haus"),
      new Vokabel("tree","Baum"),
      new Vokabel("flower","Blume")
    ]; 
  }
  vokabelHinzufuegen(v){
    this.vokabelListe.unshift(v);
  }
}

@Component({
  selector:'vokabel-formular',
  template: `
  <div class="card card-block">
    <h4 class="card-title">Vokabel erstellen</h4>
    <div class="form-group">
      <input type="text"
             class="form-control"
             placeholder="englisches Wort"
             #englischerText/>
    </div>
    <div class="form-group">
      <input type="text"
           class="form-control"
           placeholder="deutsches Wort"
           #deutscherText/>
    </div>
    <input type="button"
          class="btn btn-primary" value="erstellen"
          (click)="erstelleVokabel(englischerText.value,deutscherText.value)"/>
  </div>
  `
})
class vokabelFormComponent{
  @Output() vokabelErstellt = new EventEmitter<Vokabel>();
  

  erstelleVokabel(e:string, d: string){
    let v = new Vokabel(e,d);
    this.vokabelErstellt.emit(v);
  }
}

@Component({
  selector: 'app',
  template: `
  <vokabel-liste></vokabel-liste>
  `
})
class AppComponent{
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    vokabelComponent, 
    vokabelListComponent,
    vokabelFormComponent,
    AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule{
}

platformBrowserDynamic().bootstrapModule(AppModule);





// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
