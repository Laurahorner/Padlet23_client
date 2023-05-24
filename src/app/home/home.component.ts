import { Component } from '@angular/core';
@Component({
  selector: 'bs-home',
  template: `
    <div class="ui container">
      <h1>HOME</h1>
      <hr class="orange">
      <h2>Hey du! - Willkommen im KWM Padlet</h2>
      <p>Diese Applikation ermöglicht es dir Padlets zu gewünschten Themen zu erstellen. Außerdem können Beiträge zu Padlets hinzugefügt werden. Diese Beiträge bestehen aus einem Text und können von anderen Usern in Form von Ratings und/oder Kommentaren bewertet werden.</p>
      <h3>Die Applikation basiert auf diesen 3 Säulen:</h3>
      <br>
      <div class="ui container stackable grid">
        <div class="five wide column" style="background-color: #ff8000; margin-right: 20px; text-align: center; margin-bottom: 10px; border-radius: 10px;">
          <div style="padding: 20px;">
            <i class="th icon" style="font-size: 4em; color: white; padding-top: 15px;"></i>
            <h2 style="color: white; margin-top: 5px;">Padlets</h2>
          </div>
        </div>
        <div class="five wide column" style="background-color: #ff8000; margin-right: 20px; text-align: center; margin-bottom: 10px; border-radius: 10px;">
          <div style="padding: 20px;">
            <i class="sticky note outline icon" style="font-size: 4em; color: white; padding-top: 15px;"></i>
            <h2 style="color: white; margin-top: 5px;">Einträge</h2>
          </div>
        </div>
        <div class="five wide column" style="background-color: #ff8000; text-align: center; margin-bottom: 10px; border-radius: 10px;">
          <div style="padding: 20px;">
            <i class="comment alternate outline icon" style="font-size: 4em; color: white; padding-top: 15px;"></i>
            <h2 style="color: white; margin-top: 5px;">Kommentare</h2>
          </div>
        </div>
      </div>
      <br><br>
      <h2>Let's get started!</h2>
      <button routerLink="../padlets" class="ui right labeled icon button" style="background-color: #ff8000; color: white;">
        <i class="right arrow icon"></i>
        Zur Padletübersicht
      </button>
    </div>
  `,
  styles: [`
    h1 {
     font-size: 45px;
      margin-bottom: 5px;
    }
    .orange {
      border-color: #ff8000;
      border-width: medium;
      margin-bottom: 50px;
    }
  `]
})
export class HomeComponent { }
